---
title: Best Practices
description: Best practices for CardSavr integration.
---
At Strivve, one of the main objectives is to create an inviting, usable experiences for both our partners and their 
cardholders.  These best practices guides are intended to provide background information and inform decisions that 
product and engineering teams will make during any CardSavr integration.

# Credentials

Developers and Technical Product Managers must understand the data required by CardSavr and 
the considerations regarding the safe
handling of this data from the CardSavr perspective. This does not address the
developer’s or integrator’s own security policy, compliance, or other regulatory
considerations.

## Background
Like many current account aggregators, the CardSavr platform requires credential
data for its operation.  However, CardSavr never uses this data to access
financial institution accounts.  Instead, the credential information allows
CardSavr’s autonomous browser technology to update the card on file at merchant
sites. This document will review the credential data types, where and when this
data is required by CardSavr, data retention, and data security considerations.
It is expected that developers and integrators of CardSavr will adhere to their
own security policies when handling this data. CardSavr requires three distinct
types of credential data: card payment credential data, merchant site credential
data, and safe key credentials. For readability, this document will refer to
merchant credential data as merchant authentication data.

## Customer Site Profile Access Considerations
There are choices an integrator must make as it pertains to the handling and
potential storage of merchant authentication data. Site credentials can be
changed at any time and customer involvement is necessary to maintain up-to-date
credentials if they are retained or they must be provided each and every time if
they are not retained.

# Data Types

## Merchant Authentication Data
Merchant authentication data provides cardholders access to their account at
that merchant.  CardSavr stores this data in database encrypted fields which requires the
integrator’s safe key portion to decrypt at the time of a card on file update.

### Acquiring Options

Merchant authentication data is acquired from the cardholder during the initial
push provisioning workflow, either one-time initially or every time depending on
the data retention policy.

Integrated applications can choose to either directly acquire merchant
authentication data from cardholders or use CardSavr components in the SDK to
acquire merchant authentication data directly and store this data in the
CardSavr platform.  The benefit of using CardSavr for acquisition is that
merchant authentication data never transverses the integrator’s infrastructure.

Be aware that this data stored in CardSavr for future use may require real-time
cardholder interaction in the event of invalid authentication data
(bad password) or authentication challenge (MFA code).

## Data Retention Options

The merchant authentication data is sensitive information and should be handled
as such.  Integrators have a number of options available to them when using the
CardSavr platform. The integrator’s data retention policy should be balanced
against the cardholder experience. Removing merchant authentication data too
quickly or not storing it for use again later increases the need for real-time
cardholder authentication data when updating cards on file.

Using a simple Username and Password credential example, integrators have the
following options:

**Never Save and Always Ask Users for Authentication Data** - Merchant
authentication data can be acquired from users and provided to CardSavr on
demand, use it for a single push provisioning transaction, and then remove it
immediately after completion of the push provisioning transaction.

**Save Authentication Data in CardSavr** - Merchant authentication data can be
safely stored in the CardSavr platform according to the integrator’s data
retention policy. This allows for future card on file updates without asking
for and acquiring merchant site authentication data.

**Save Authentication Data outside CardSavr** - Merchant authentication data can be
acquired and stored outside of the CardSavr platform. The Merchant authentication data is then provided to CardSavr for a one-time use, or stored persistently for future use, depending on integrator’s data retention policies.

## Card Payment Credentials

Online card payment credentials represent the card on file at merchants.
CardSavr can store the card information for merchant site updates in database encrypted fields which requires the integrator’s safe key portion to decrypt at the
time of a card on file update.

### Card Payment Credential Acquiring Options

Online card payment credentials can be sourced directly from the financial
institution’s existing infrastructure. This data can be stored by CardSavr
before or during a card on file action.

### Card Payment Credential Data Retention

The card payment credenials can be stored according to the integrator’s data
retention policy.

## Safe Key

### Acquiring Options

CardSavr holds sensitive data in encrypted objects both in memory and at rest,
which is encrypted by using two separate keys. CardSavr stores one of the
required keys while the integrator or issuer holds the second key. Any card
update action requires the integrator to provide their safe key so that, when
combined with the second key held by CardSavr, the platform can decrypt the
sensitive information that will be placed on the cardholder’s merchant or
biller payment account. The integrator is required to generate and provide
this safe key when creating user or card objects within the CardSavr API and
the key must be provided when accessing or updating those objects in the future.

### Data Retention

The CardSavr platform requires the safe key when acting upon objects
within the platform. The integrator must retain the safe key until all
objects that utilize that key are deleted or that key is rotated and retired by
the integrator.

![image info](/images/cred_mgmt-data_storage.png)

# Cardholder Experience

## Security Considerations

Issuing cards does not stop at activation; in today’s competitive landscape,
you must provide a frictionless cardholder experience that inspires card loyalty
and increases transaction volume and card revenue by getting cards into
circulation faster and on more sites. With CardSavr, you gain insight into where
cardholders store your card online while making it easier for them to manage
card issue or reissue events.

The account aggregator market has shown that account holders are willing to share
their most sensitive credentials by the millions. When integrating CardSavr into
your digital banking experience, you must consider the trade-off between the
cardholder experience and security considerations. In the end, the best
cardholder experience (design) must be balanced with the integrator’s security
practices appropriate for the business.

## Authentication 

Updating the payment method at a merchant with a new card is a multi-step process. Generally, these steps can be 
separated into two phases.  Authentication and updating.  In the authentication phase, the CardSavr platform attempts 
to authenticates against the merchant site.  Once authenticated, the CardSavr platform moves to the updating phase 
where it places the new card as the default payment on the merchant site. While the updating phases is completely 
automatic, the authentication phase may require user interaction in cases where incorrect credentials have been 
supplied or the merchant provides a challenge response to the user. 

In general, a more detailed look at the authentication phase involves:

1.	Acquiring the merchants to update from the user, your backend system, or those stored in CardSavr.
2.	Acquiring the credentials for each merchant if they are not already stored in CardSavr.
3.	Allowing CardSavr to authentication against each merchant site and either succeed or responded with a challenge 
request (invalid credentials, MFA)
4.	Informing the user of any merchant specific notifications that may occur (merchants may provide a separate 
notification directly to their user letting them know that their payment method has been updated)
5.	Once authenticated, informing the user that the account has been linked and there is no further action on their 
part for that merchant
6.	When the updating phase is complete, the CardSavr platform will provide an update via webhook that can be used to 
notify the user of the final status.

CardSavr handles of the complexity associated with authentication and provides a process indicator but the user 
experience should account for the various scenarios that can happen.  

Additionally, notification of the final status can be done out of band using existing notification patterns.

***

### More Credential Resources :
[Resources - Credentials](/resources/credentials)
