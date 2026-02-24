# CAPTURE MORE COMMERCE™

# CardSavr® Technical Security Overview

**Prepared by Strivve, Inc. --- Technical Security Briefing**

------------------------------------------------------------------------

# The Bottom Line

CardSavr® protects cardholder data with defense-in-depth security:
PCI-DSS certified cryptography, isolated AWS infrastructure, dual-key
encryption, and zero-knowledge authentication.

Sensitive data --- PAN, CVV, and merchant credentials --- never persists
in readable form. Every card placement job creates its own ephemeral
encryption environment that self-destructs on completion.

## Security at a Glance

  Layer                      | Protection
  -------------------------- | --------------------------------------------
  Network                    | TLS 1.2+ with FIPS 140-2 Suite B ciphers,  perfect forward secrecy    |
  API                        | HMAC-SHA256 signing + AES-256-GCM encryption     on every request/response
  Authentication             | Zero-knowledge proof (Kerberos 5 model) ---     passwords never transmit
  Storage                    | Dual-key AES-256 encryption --- keys split between Strivve and partner infrastructure
  Card placement             | Ephemeral Job Safe --- one-time encryption key exists only for that job's duration
  


# System Security

## Network Security: Three Layers of Isolation

CardSavr® operates within isolated AWS infrastructure --- separate
accounts, VPCs, Security Groups, IAM policies, and Network Access
Control Lists protect each Cardholder Data Environment (CDE).

**In-transit protection**. All traffic uses TLS 1.2 minimum with FIPS 140-2 Suite B ciphers. Amazon CA certificates with RSA 2048-bit keys establish secure sessions. The preferred ECDHE 256-bit cipher suite delivers perfect forward secrecy with AES-256-GCM encryption and SHA-256 hashing for integrity.

**Infiltration defense**. AWS Application Load Balancer with Security Group Policies and NACLs blocks unauthorized inbound traffic.

**Exfiltration defense**. VPC subnet NACLs control outbound data movement. PCI-authorized vendors perform recurring penetration tests and network scans to verify ongoing protection.  

**Merchant-site connections**. Autonomous browsers communicating with merchant sites enforce TLS 1.2 or 1.3 with strong cipher suites, accept only trusted Certificate Authority certificates, and reject self-signed certificates   


------------------------------------------------------------------------

# API Security: Authentication, Integrity, and Confidentialality

## Dual Identity Authentication

Every API interaction requires two-factor identity verification ---
application and user authenticate independently.

Applications sign all requests and responses using HMAC with 256-bit shared secret keys. Each approved application receives a unique key from the CardSavr® Partner Portal, rotated per partner-configured schedules. At login, an ECDHE key exchange creates an ephemeral session key for all subsequent signing and encryption.

**Zero-knowledge authentication**. Passwords never transmit over the network. CardSavr® employs a zero-knowledge proof method modeled on Kerberos 5 — user passwords generate PBKDF2 keys that sign server-provided salts for verification. An attacker intercepting traffic discovers only application and user names.


------------------------------------------------------------------------

## Data Integrity and Confidentiality

**Integrity**. HMAC signatures authenticate every request and response.

**Confidentiality**. AES-256-GCM encryption using ephemeral session keys protects all payload data. Perfect forward secrecy ensures that compromising one session key reveals nothing about past or future sessions.


------------------------------------------------------------------------

## Write-Only Exfiltration Protection

Payment card PAN and CVV are write-only properties — POST requests only. No application, including Strivve's own systems, reads these values back. Cards are referenced via the industry-standard Payment Account Reference (PAR) mechanism. Merchant credentials follow the same write-only restriction, preventing accidental or malicious disclosure.

------------------------------------------------------------------------

## Role-Based Access Control
Authenticated application names and usernames map to specific roles. Each API endpoint and property enforces role-restricted access — no single credential grants unrestricted platform access.


# Persistent Data Security

## Database-Level Protection

AWS Security Group Policies and NACLs restrict RDS database access to the CardSavr® API server and authorized Strivve tooling. NACLs at subnet boundaries provide additional packet-level control.

The AWS Aurora Postgres RDS service applies full-database AES-256 encryption with keys managed by AWS Key Management Service (KMS), one key hierarchy per CDE VPC.

------------------------------------------------------------------------

## The Strivve Safe: Record-Level Encryption

Beyond database-level encryption, the Strivve Safe encrypts each cardholder's data individually using AES-256-GCM. Each encrypted blob contains credentials for every merchant site where the cardholder placed their card.

**Dual-key derivation**. Each cardholder's encryption key derives from two sources mixed via PBKDF2:

1.  **Internal key** — generated and managed by CardSavr®, protected by AWS KMS
2.  **Partner key** — generated and maintained by the partner institution

Keys reside in separate environments. Compromising CardSavr® alone does not expose cardholder data. Compromising partner infrastructure alone does not expose cardholder data. Both keys are required for decryption.

------------------------------------------------------------------------

## Ephemeral Job Safe

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

## Cryptographic Keys

------------------------------------------------------------------------
# Glossary
## Acronyms

  Acronym   |   Definition
  --------- |----------------------------------------------
  AES       |Advanced Encryption Standard 
  API       |Application Programming Interface
  AWS       |Amazon Web Services
  CDE       |Cardholder Data Environment
  CVV       |Card Verification Value
  ECDHE     |Elliptic Curve Diffie-Hellman Ephemeral
  HMAC      |Hash-based Message Authentication Code
  KMS       |Key Management Service
  PAN       |Primary Account Number
  PBKDF2    |Password-Based Key Derivation Function 2
  PCI-DSS   |Payment Card Industry Data Security Standard
  RDS       |Relational Database Service
  SDK       |Software Development Kit
  TLS       |Transport Layer Security
  VPC       |Virtual Private Cloud

## Key Terms  

------------------------------------------------------------------------

**STRICTLY CONFIDENTIAL --- © 2026 Strivve, Inc. All rights reserved.**
