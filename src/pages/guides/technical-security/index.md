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

### In-transit protection

-   TLS 1.2 minimum
-   FIPS 140-2 Suite B ciphers
-   Amazon CA certificates with RSA 2048-bit keys
-   Preferred ECDHE 256-bit cipher suite
-   AES-256-GCM encryption
-   SHA-256 hashing
-   Perfect forward secrecy

### Infiltration defense

-   AWS Application Load Balancer
-   Security Group Policies
-   Network Access Control Lists (NACLs)

### Exfiltration defense

-   VPC subnet NACL controls
-   Recurring PCI-authorized penetration testing
-   Ongoing network scans

### Merchant-site connections

Autonomous browsers:

-   Enforce TLS 1.2 or 1.3
-   Accept trusted CA certificates only
-   Reject self-signed certificates

------------------------------------------------------------------------

# API Security

## Dual Identity Authentication

Every API interaction requires two-factor identity verification ---
application and user authenticate independently.

-   HMAC signing with 256-bit shared secret keys
-   Unique integrator keys issued via Partner Portal
-   Configurable key rotation
-   ECDHE key exchange creates ephemeral session keys

## Zero-Knowledge Authentication

-   Modeled on Kerberos 5
-   PBKDF2-derived signing keys
-   Passwords never transmitted
-   Intercepted traffic reveals only usernames

------------------------------------------------------------------------

## Data Integrity and Confidentiality

-   HMAC signatures on every request and response
-   AES-256-GCM encryption
-   Ephemeral session keys
-   Perfect forward secrecy

------------------------------------------------------------------------

## Write-Only Exfiltration Protection

-   PAN and CVV are write-only (POST only)
-   No read-back capability --- including Strivve systems
-   Referenced via Payment Account Reference (PAR)
-   Merchant credentials follow same write-only restriction

------------------------------------------------------------------------

# Persistent Data Security

## Database-Level Protection

-   AWS Aurora Postgres RDS
-   Full-database AES-256 encryption
-   AWS KMS-managed key hierarchy
-   One key hierarchy per CDE VPC

------------------------------------------------------------------------

## The Strivve Safe

Each cardholder's data is encrypted individually using AES-256-GCM.

Dual-key derivation via PBKDF2 from:

1.  Internal environment key (AWS KMS protected)
2.  Partner-managed cardholder key

Both keys required for decryption.

------------------------------------------------------------------------

## Ephemeral Job Safe

-   Unique Job Safe per card placement
-   One-time encryption key
-   Self-destructs on completion

------------------------------------------------------------------------

# Cryptography

## TLS Requirements

-   Minimum TLS 1.2
-   Safe cipher suites only
-   Perfect forward secrecy
-   Trusted CA validation

## API Encryption Layer

-   HMAC-SHA256 signing
-   AES-256-GCM encryption
-   ECDHE/P256 session key exchange
-   One-time session key per login

------------------------------------------------------------------------

# Glossary

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

------------------------------------------------------------------------

**STRICTLY CONFIDENTIAL --- © 2026 Strivve, Inc. All rights reserved.**
