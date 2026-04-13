---
title: CardLinks 
---

## Overview

Many issuers need a card-on-file solution that drives high conversions with little to no integration cost. Strivve CardLinks is built for exactly this.  Traditional integrations require significant engineering investment. CardLinks eliminates that barrier by enabling issuers to tap into a largely untapped funding source — marketing budgets — rather than IT budgets. With near-zero integration overhead, issuers can move fast and measure results directly in campaign performance.

 ## How It Works
CardLinks provides multiple methods for issuers to provision cardholder and card data, generating a unique, personalized URL for each cardholder. Each URL serves as a secure entry point into a card-on-file placement flow tied to that individual.

These URLs are designed to slot directly into existing marketing campaigns as the primary call-to-action. Supported channels include:

 - Email: Embedded as a personalized link
 - SMS: Sent as a short, actionable URL
 - QR Code:  Printed or displayed in physical or digital materials

## Cardholder Experience
When a cardholder clicks their link, they land on a personalized page and are prompted to verify their identity before selecting merchant sites for card placement. Issuers can choose from several challenge types to align with their security requirements:

 - CVV only
 - CVV + ZIP Code
 - ZIP Code only
 - PAN Last 4
 - PAN First 2 + Last 2

The result is a frictionless, personalized activation experience that issuers can launch through channels they already own — with no new integration required.

 ## Use Case Example
1. The Issuer builds a campaign in their Customer Data Platform (CDP) with a Cardholder Targets Dataset.
3. Issuer specifies and provisions card-on-file datasets into the secure Strivve PCI-DSS compliant platform via the CardSavr API.  After the information is securely stored, the API will return a unique Cardholder target URL for each Cardholder data record. 
3. The resulting URLs are imported into the CDP solution by the Issuer where the URL is embedded into the Issuer’s Card-on-File marketing campaign as a primary call-to-action.
4. Each link would represent the entry point for a personal card-on-file flow provided by CardUpdatr.
5. Campaign is launched using the CDP solution.
6. Cardholder clicks through the call-to-action.  Upon the launch of the CardUpdatr, the Cardholder will need to respond to a challenge (whether specifying the CVV, Zip code, One-Time-Password, or other) before continuing to place cards.
7. Upon successful authorization, the Cardholder places the card on file with Strivve.
8. The URLs (and corresponding datasets in the Strivve Platform), will expire either at the end of the Campaign, by a specified expiration date, or other configuration in the Campaign Tool.

### Cardholder Journey
![Card Links Journey](/images/cardlinks_issuer_journey.png)

### Call To Action 
![Card Links Flow](/images/cardlinks_flow.png)

## Card and Cardholder Data
The Card and Cardholder Data for Card Links Engage will be published to the CardSavr platform using the Strivve CardSavr API.  This card and cardholder details.  This information is in turn stored in the PCI-DSS compliant CardSavr platform and is securely retrieved once the URL is consumed by the Cardholder.

The base information needed to create a CardLink includes:
- Card Data 
- Cardholder Billing Address
- Unique Cardholder reference ID (managed by the issuer)

## OnDemand CardLink API

The OnDemand Card Link endpoint may be called to create a single card link. The request body consists of several separate objects. The `auth` object contains the credentials required to authenticate with CardSavr. The `expiration` object, which is optional, specifies the expiration date for the card link — if not provided, it defaults to 2 months from the current date. The `cardholder`, `card`, and `address` objects contain the necessary information to create those entities on behalf of a cardholder.

In response to a properly formed POST request to the OnDemand endpoint containing this information, the user will receive a card link containing a fully formed URL that can be accessed immediately.

### Request Body

```json
{
  "auth": {
    "cardsavr_server": "https://api.example.com",
    "app_name": "MyIntegrator",
    "app_key": "app_key_value",
    "username": "config_username",
    "password": "config_password"
  },
  "cardholder": {
    "cuid": "customerid123",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com"
  },
  "expiration": {
    "month": "05",
    "day": "15",
    "year": "2026"
  },
  "address": {
    "address1": "123 Main St",
    "address2": "Apt 4",
    "city": "Seattle",
    "subnational": "WA",
    "postal_code": "98101",
    "country": "US",
    "phone_number": "2065551234"
  },
  "card": {
    "pan": "4111111111111111",
    "expiration_month": "05",
    "expiration_year": "26",
    "name_on_card": "Jane Doe",
    "nickname": "My Visa",
    "cvv": "123"
  }
}
```

### Properties

| Property | Subproperty | Type | Required | Default | Description |
|---|---|---|---|---|---|
| auth | | object | yes | | Authentication credentials. |
| | cardsavr_server | string | yes | | HTTPS url of the cardsavr API endpoint. |
| | app_name | string | yes | | Integrator name. |
| | app_key | string | yes | | Integrator key. |
| | username | string | yes | | Username for cardsavr authentication. |
| | password | string | yes | | Password for cardsavr authentication. |
| cardholder | | object | yes | | Cardholder information. |
| | cuid | string | no | generated | External Cardholder ID. If not provided, a random number will be generated. |
| | first_name | string | yes | | Cardholder's first name. |
| | last_name | string | yes | | Cardholder's last name. |
| | email | string | no | | Used to send card placement notifications. |
| expiration | | object | no | 2 months from current date | Expiration date for the request. Defaults to 2 months from the current date. |
| | month | string | no | | Two-digit month (01-12). |
| | day | string | no | | Day of the month (1-31). |
| | year | string | no | | Four-digit year. |
| address | | object | yes | | Cardholder's billing address. |
| | address1 | string | yes | | Street address. |
| | address2 | string | no | | Additional address info (apt, suite, etc.). |
| | city | string | yes | | City name. |
| | subnational | string | yes | | State or province. |
| | postal_code | string | yes | | Zip or postal code. |
| | country | string | yes | | Accepted values: "usa", "USA", "us", "US", "canada", "Canada", "ca", "CA". |
| | phone_number | string | yes | | Phone number. |
| card | | object | yes | | Card details. |
| | reference | object | yes | | Reference object. If NULL, all other fields are required. |
| | pan | string | conditional | | Primary account number. Required if reference is NULL. |
| | expiration_month | string | conditional | | Two-digit expiration month. Required if reference is NULL. |
| | expiration_year | string | conditional | | Two-digit expiration year. Required if reference is NULL. |
| | name_on_card | string | conditional | | Name as it appears on the card. Required if reference is NULL. |
| | nickname | string | conditional | | Display name for the card. Required if reference is NULL. |
| | cvv | string | no | | Card verification value. |