---
title: CardLinks 
---

## Overview

Many issuers need a card-on-file solution that drives high conversions with little to no integration cost. Strivve CardLinks is built for exactly this.Traditional integrations require significant engineering investment. CardLinks eliminates that barrier by enabling issuers to tap into a largely untapped funding source — marketing budgets — rather than IT budgets. With near-zero integration overhead, issuers can move fast and measure results directly in campaign performance.

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
1. The Issuer builds a campaign in their Customer Data Platform (CDP) and builds a Cardholder Targets Dataset.
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

## API Documentation
Strive is working to complete the development and design of Card Links and hopes to have documentation ready very soon.