# CAPTURE MORE COMMERCE™

# CardSavr® Technical Security Overview

**Prepared by Strivve, Inc. - Technical Security Briefing**

------------------------------------------------------------------------

# The Bottom Line

CardSavr® protects cardholder data with defense-in-depth security:
PCI-DSS certified cryptography, isolated AWS infrastructure, dual-key
encryption, and zero-knowledge authentication.

Sensitive data - PAN, CVV, and merchant credentials - never persist in readable form. Every card placement job creates its own ephemeral encryption environment that self-destructs on completion.

## Security at a Glance

  Layer                      | Protection
  -------------------------- | --------------------------------------------
  Network                    | TLS 1.2+ with FIPS 140-2 Suite B ciphers,  perfect forward secrecy    |
  API                        | HMAC-SHA256 signing + AES-256-GCM encryption on every request/response
  Authentication             | Zero-knowledge proof (Kerberos 5 model) - passwords never transmit
  Storage                    | Dual-key AES-256 encryption - keys split between Strivve and partner infrastructure
  Card placement             | Ephemeral Job Safe - one-time encryption key exists only for that job's duration
  


# System Security

## Network Security: Three Layers of Isolation

CardSavr® operates within isolated AWS infrastructure - separate
accounts, VPCs, Security Groups, IAM policies, and Network Access
Control Lists protect each Cardholder Data Environment (CDE).

**In-transit protection**. All traffic uses TLS 1.2 minimum with FIPS 140-2 Suite B ciphers. Amazon CA certificates with RSA 2048-bit keys establish secure sessions. The preferred ECDHE 256-bit cipher suite delivers perfect forward secrecy with AES-256-GCM encryption and SHA-256 hashing for integrity.

**Infiltration defense**. AWS Application Load Balancer with Security Group Policies and NACLs blocks unauthorized inbound traffic.

**Exfiltration defense**. VPC subnet NACLs control outbound data movement. PCI-authorized vendors perform recurring penetration tests and network scans to verify ongoing protection.  

**Merchant-site connections**. Autonomous browsers communicating with merchant sites enforce TLS 1.2 or 1.3 with strong cipher suites, accept only trusted Certificate Authority certificates, and reject self-signed certificates   


------------------------------------------------------------------------

## API Security: Authentication, Integrity, and Confidentialality

### Dual Identity Authentication

Every API interaction requires two-factor identity verification ---
application and user authenticate independently.

Applications sign all requests and responses using HMAC with 256-bit shared secret keys. Each approved application receives a unique key from the CardSavr® Partner Portal, rotated per partner-configured schedules. At login, an ECDHE key exchange creates an ephemeral session key for all subsequent signing and encryption.

**Zero-knowledge authentication**. Passwords never transmit over the network. CardSavr® employs a zero-knowledge proof method modeled on Kerberos 5 — user passwords generate PBKDF2 keys that sign server-provided salts for verification. An attacker intercepting traffic discovers only application and user names.


------------------------------------------------------------------------

### Data Integrity and Confidentiality

**Integrity**. HMAC signatures authenticate every request and response.

**Confidentiality**. AES-256-GCM encryption using ephemeral session keys protects all payload data. Perfect forward secrecy ensures that compromising one session key reveals nothing about past or future sessions.


------------------------------------------------------------------------

### Write-Only Exfiltration Protection

Payment card PAN and CVV are write-only properties — POST requests only. No application, including Strivve's own systems, reads these values back. Cards are referenced via the industry-standard Payment Account Reference (PAR) mechanism. Merchant credentials follow the same write-only restriction, preventing accidental or malicious disclosure.

------------------------------------------------------------------------

### Role-Based Access Control
Authenticated application names and usernames map to specific roles. Each API endpoint and property enforces role-restricted access — no single credential grants unrestricted platform access.


## Persistent Data Security

### Database-Level Protection

AWS Security Group Policies and NACLs restrict RDS database access to the CardSavr® API server and authorized Strivve tooling. NACLs at subnet boundaries provide additional packet-level control.

The AWS Aurora Postgres RDS service applies full-database AES-256 encryption with keys managed by AWS Key Management Service (KMS), one key hierarchy per CDE VPC.

------------------------------------------------------------------------

### The Strivve Safe: Record-Level Encryption

Beyond database-level encryption, the Strivve Safe encrypts each cardholder's data individually using AES-256-GCM. Each encrypted blob contains credentials for every merchant site where the cardholder placed their card.

**Dual-key derivation**. Each cardholder's encryption key derives from two sources mixed via PBKDF2:

1.  **Internal key** — generated and managed by CardSavr®, protected by AWS KMS
2.  **Partner key** — generated and maintained by the partner institution

Keys reside in separate environments. Compromising CardSavr® alone does not expose cardholder data. Compromising partner infrastructure alone does not expose cardholder data. Both keys are required for decryption.

------------------------------------------------------------------------

### Ephemeral Job Safe

Each card placement job creates a unique Job Safe containing card authentication data and merchant credentials. A one-time encryption key protects this data and exists only for the job's duration — the key and decrypted data self-destruct on completion.

------------------------------------------------------------------------

# Cryptography

## Data In Flight

### TLS Protection
All network traffic with external systems uses TLS per RFC-8447 with these requirements:

-   **Minimum version**: TLS 1.2 
-   **Cipher suites**: Safe cipher suites only; preferred suites enforce perfect forward secrecy 
-   **Certificate validation**: Only trusted Certificate Authority certificates accepted (client mode)


### REST API Encryption Layer

Beyond TLS, CardSavr® applies a second encryption layer to all API traffic. Every request and response is signed, verified, and encrypted using HMAC-SHA256 and AES-256-GCM keys.
At login, an ECDHE/P256 key exchange generates a one-time API session key. This ephemeral key protects all subsequent traffic with perfect forward secrecy — a compromised session key reveals nothing about other sessions.

![CardSavr Protected Data Flow](/images/CardSavrDataFlow.jpg "CardSavr Protected Data Flow") 


### API Secret Key
All encryption and signing operations use a symmetric shared 256-bit key: the API Session Secret Key.

### Decryption
Response decription follows five steps:
1. Parse the API response.body.encryptedBody contains Base64-Encrypted-JSON$Base64-IV${Encryption-Method}.  At this time only AES-256-GCM is supported as an encryption method.
1. Decode Base64-Encrypted-JSON-Body to binary
1. Decode Base64-IV to binary
1. Create an AES-256-GCM cipher using the API Session Secret Key and decoded IV
1. Decrypt the binary body


### Encryption
Applications encrypt request bodies using AES-256-GCM with a 16-byte cryptographically strong initialization vector and the API Session Secret Key:
```javascript
request.body.encryptedBody = Base64EncryptedJSON$Base64-IV$aes-256-gcm
```

### Signing

#### Authorization
Identifies the integrator:
```javascript
"Authorization": "SWCH-HMAC-SHA256 Credentials=" + integrator_name
```
#### Nonce
Current UTC time in milliseconds (replay attack protection):
```javascript
"Nonce": UTC_milliseconds
```

#### Signature
HMAC-SHA256 of the string-to-sign, base64-encoded:
```javascript
StringToSign = relative_URL_path + Authorization + Nonce + request_body
Signature = Base64(HMAC-SHA256(API_Session_Secret_Key, StringToSign))
```

### Verification
Response verification mirrors the signing process. Calculate the expected signature and compare against the Signature response header. A mismatch indicates tampering.

### CardSavr® SDK
The CardSavr® SDK handles encryption, decryption, signing, and verification automatically. Direct REST API implementations require manual cryptographic operations per the CardSavr® API reference documentation.

## Data At Rest
### Database Protection
All persistent data resides in AWS Aurora Postgres with full-database AES-256 encryption — integrity and confidentiality enforced at rest by AWS KMS-managed keys.

### Credential Protection: The Strivve Safe
PCI-DSS Secure Authentication Data (SAD) and merchant credentials are stored as encrypted blobs using AES-256-GCM. Encryption keys derive from mixing an internal CardSavr® environment key with the partner-provided cardholder key via PBKDF2. Keys reside in separate environments — neither Strivve nor the partner holds sufficient information to decrypt alone.

Each card placement job generates an ephemeral Job Safe with its own one-time AES-256-GCM key. The key exists only during the job's execution.


## Cryptographic Keys
All CardSavr®-generated keys use key-stretching derivation algorithms to ensure acceptable entropy. Persistently stored keys are encrypted by key hierarchies protected by a secure root key. All keys (except TLS certificate validation keys) are symmetric 256-bit.

### API Session Keys
Applications and users authenticate independently. Application authentication serves two purposes:

1. Authorization — Verifies the application is approved
1. Integrity and confidentiality — Enables request/response signing and encryption via shared session keys

**Integrator Keys**. Each application receives a unique name and 256-bit integrator key. The integrator key signs requests to /session/login. Upon successful login, the server returns its public elliptic curve 256-bit key. The client computes a new shared secret key for all subsequent API calls during that session.

Partners generate integrator keys via the Partner Portal or programmatically via POST /integrators.

**Key rotation**. PCI-DSS compliance requires regular integrator key rotation. Partners rotate keys on their own schedule — programmatically via PUT /integrators or manually through the Partner Portal.

**Ephemeral session keys**. CardSavr® uses ECDHE key exchange to generate ephemeral shared secrets known only to the server and the client. Both parties derive identical keys through Diffie-Hellman exchange — the shared secret never transmits over the network.
Clients generate their own public/private elliptic curve keys using the NIST P256 curve, submit the public key to /session/login, and receive CardSavr®'s public key in the response. The shared secret key computed from this exchange protects all subsequent requests.

![Eliptic Curve Diffie Hellman](/images/Diffie-Hellman_Key_Exchange.png "Key Exchange")

### Cardholder Safe Keys
The per-cardholder Strivve Safe uses a pair of 256-bit keys:

* **Environment key** — Generated and managed internally by CardSavr®
* **Cardholder Safe Key** — Generated per cardholder by the partner

Key derivation functions combine both keys into a single 256-bit encryption/decryption key.

**Persistent keys**. Partners generate and manage persistent cardholder safe keys, passed as headers on POST /cardsavr_users with cardholder role. Best practice: unique keys per cardholder. Partners send safe keys via header for any request involving protected data (cardsavr_users, cardsavr_accounts, cardsavr_cards, and place_card_on_single_site).

**Ephemeral keys**. Strivve generates and manages ephemeral safe keys for cardholders created without safe headers. These users exist only for the duration of a single card placement session.

**Key storage**. Partners maintain PCI-compliant secure storage of persistent cardholder safe keys in their own infrastructure. This separation strengthens Strivve Safe security — CardSavr® never stores persistent partner-managed keys.
Strivve stores short-lived ephemeral keys in PCI-compliant manner, encrypted using AES-256-GCM with a secure key-encrypting key.

**Key rotation**. PCI-DSS compliance requires regular rotation — a shared responsibility:
* Strivve rotates environment keys
* Partners rotate cardholder safe keys (recommended annually)
* Ephemeral keys require no rotation due to their brief existence

### Password Keys
CardSavr® authenticates non-cardholder users using zero-knowledge proof — passwords convert to signing keys using shared information that remains unknown during authentication.
The PBKDF2 algorithm generates signing keys:
```javascript
SigningKey = PBKDF2(SHA256, UserPassword, SHA256(UserName), 5000 rounds, 256 bits)
passwordProof = Base64(HMAC-SHA256(SigningKey, IntegratorKey))
```
CardSavr® servers store only the derived password keys for verification — plaintext passwords never persist.

The CardSavr® SDK automates signing key and password proof generation. Direct REST API implementations must perform these operations per the API reference documentation.

**Password rotation**. PCI-DSS mandates non-cardholder user password changes every 90 days. Partners manage agent user password changes through their own mechanisms. CardSavr® enforces password changes for person users after 90 days.


------------------------------------------------------------------------
# Glossary
## Acronyms

  Acronym   |   Definition
  --------- |----------------------------------------------
  AES	      | Advanced Encryption Standard — symmetric block cipher used for data encryption
  AES-GCM   |	AES in Galois/Counter Mode — authenticated encryption providing confidentiality and integrity
  ALB       |	Application Load Balancer — AWS service distributing incoming traffic across targets
  API	      | Application Programming Interface — programmatic interface for system-to-system communication
  AWS	      | Amazon Web Services — cloud infrastructure platform hosting CardSavr® environments
  CA	      | Certificate Authority — trusted entity issuing digital certificates for TLS
  CBC	      | Cipher Block Chaining — block cipher encryption mode
  CDE       |	Cardholder Data Environment — systems that store, process, or transmit cardholder data
  CHD	      | Cardholder Data — PAN, cardholder name, expiration, service code
  CVV	      | Card Verification Value — three- or four-digit card security code
  ECDHE     |	Elliptic Curve Diffie-Hellman Ephemeral — key exchange for perfect forward secrecy
  FIPS 140-2|	Federal Information Processing Standard — U.S. cryptographic module security standard
  HMAC	    | Hash-based Message Authentication Code — verifies data integrity and authenticity
  IAM	      | Identity and Access Management — AWS service controlling resource access
  IV	      | Initialization Vector — random value ensuring identical plaintext produces different ciphertext
  KMS	      | Key Management Service — AWS service for managing cryptographic keys
  MiTM	    | Man-in-the-Middle — attack intercepting communication between two parties
  NACL	    | Network Access Control List — AWS VPC-level firewall at subnet boundaries
  NIST	    | National Institute of Standards and Technology — U.S. cryptographic standards agency
  P256	    | NIST P-256 elliptic curve — standardized curve for ECDHE key exchange
  PAN	      | Primary Account Number — the card number on a payment card
  PAR	      | Payment Account Reference — token referencing a card account without exposing PAN
  PBKDF2	  | Password-Based Key Derivation Function 2 — converts passwords into cryptographic keys
  PCI-DSS	  | Payment Card Industry Data Security Standard — security standard for cardholder data
  PII	      | Personally Identifiable Information — data identifying a specific individual
  RDS	      | Relational Database Service — AWS managed database service
  REST	    | Representational State Transfer — architectural style for web APIs
  RSA	      | Rivest-Shamir-Adleman — asymmetric algorithm for key exchange and digital signatures
  SAD	      | Secure Authentication Data — CVV, PIN, magnetic stripe data (must not persist after auth)
  SDK	      | Software Development Kit — library simplifying CardSavr® API integration
  SHA-256	  | Secure Hash Algorithm 256-bit — cryptographic hash function
  TLS	      | Transport Layer Security — cryptographic protocol securing network communications
  UTC	      | Coordinated Universal Time — global time standard for timestamp synchronization
  VPC	      | Virtual Private Cloud — isolated virtual network within AWS


## Key Terms  
  Acronym                |   Definition
  ------------------     |-------------------------------------------
Autonomous Browser     | 	Strivve's secure headless browser that places card-on-file credentials at merchant sites
Card Placement Job	     | A single operation placing a cardholder's credentials at a specific merchant site
CardSavr® Partner Portal | 	Web admin interface for managing integrator keys and CardSavr® configuration
Cardholder Safe Key	     | 256-bit partner-managed key combined with environment key to encrypt the Strivve Safe
Defense-in-Depth	       | Multiple independent security layers — failure of one layer does not compromise the system
Dual-Key Encryption	     | Two independently managed keys must combine to decrypt cardholder data
Ephemeral Key	           | One-time key existing only for a single session or job, then self-destructs
Environment Key	         | 256-bit internal key (AWS KMS-protected) — one half of the Strivve Safe dual-key
Integrator	             | An approved application authorized to access CardSavr® APIs
Integrator Key           | 	256-bit shared secret for initial API authentication before session key exchange
Job Safe	               | Ephemeral encrypted container for a single card placement job's SAD and credentials
Key Hierarchy	           | Chain of encryption keys anchored by a root key protected by AWS KMS
Key Stretching	         | Technique increasing computational cost of key derivation from passwords
Perfect Forward Secrecy  | 	Compromising a long-term key does not compromise past session keys
Strivve Safe	           | Per-cardholder encrypted store — dual-key AES-256-GCM encryption
Write-Only Property      | 	Data field accepting values (POST) but never returning them in API responses
Zero-Knowledge Proof     | 	Authentication confirming identity without revealing the actual secret
























------------------------------------------------------------------------

**STRICTLY CONFIDENTIAL - © 2026 Strivve, Inc. All rights reserved.**
