---
title: Card Links Engage
---

## Overview

Strivve has experienced pre-sales scenarios with large customers who have asked for a pilot and/or production deployment which yields high conversions and material success for card on file placements at a little/no integration cost to them.

Many forms of these integrations come from an opportunity to pursue a new form of revenue: Marketing budgets.  The need to provide a solution that has extremely low integration costs (or zero costs) is critical to penetrate this new form of revenue.

The current low-cost integration method Strivve provides today is a web linked solution that requires high user data input bringing a high level of cardholder undesired friction and low adoption rates.  Strivve needs a solution from which this option no longer needs to be supported.

A key response to this need is Strivve Card Links.

To begin, the Issuer provisions card-on-file datasets into the Strivve PCI-Compliant Platform securely via the Strivve Partner Portal:

- Strivve safely stores individual cardholder and card data and returns a unique URL for each target cardholder
 - Cardholder's URL is embedded into the issuer's card-on-file marketing campaign as a primary call-to-action link, in QR code for other use cases that include a new card order, or other Cardholder use cases that can be executed outside of Digital Banking.
- Each unique link represents the entry point for a personal card-on-file flow  
- Cardholders are authorized by providing a response to a challenge before being allowed to select online sites for card placement.  Challenges can include CVV, CVV + Zip Code, Zip Code, PAN Last 4, PAN First 2 + Last 2).
 

 ## Use Case Example
1. The Issuer builds a campaign in their Customer Data Platform (CDP) and builds a Cardholder Targets Dataset
3. Using the Strivve Partner Portal, the Issuer specifies and provisions card-on-file datasets into the secure Strivve PCI-DSS compliant platform.  After the information is securely stored, the tool will return a unique Cardholder target URL for each Cardholder data record. 
3. The resulting URLs are imported into the CDP solution by the Issuer where the URL is embedded into the Issuer’s Card-on-File marketing campaign as a primary call-to-action.
4. Each link would represent the entry point for a personal card-on-file flow provided by CardUpdatr.
5. Campaign is launched using the CDP solution.
6. Cardholder clicks through the call-to-action.  Upon the launch of the CardUpdatr, the Cardholder will need to respond to a challenge (whether specifying the CVV, Zip code, One-Time-Password, or other) before continuing to place cards.
7. Upon successful authorization, the Cardholder places the card on file with Strivve.
8. The URLs (and corresponding datasets in the Strivve Platform), will expire either at the end of the Campaign, by a specified expiration date, or other configuration in the Campaign Tool.

## Typical Call To Action path
![Card Links Flow](/images/cardlinks_flow.png)

## Card and Cardholder Data
The Card and Cardholder Data for Card Links Engage will be published to the CardSavr platform using the Strivve Partner Portal.  The data will be provided as a .CSV file which contains all the card and cardholder details.  This information is in turn stored in the PCI-DSS compliant CardSavr platform and is securely retrieved once the URL is consumed by the Cardholder.

The makeup of the .CSV can contain the following
- Campaign Unique Indentifer
- Campaign Name
- Issuer Name
- Issuer ID
- Strivve Enviornment
- Target Campaign Start Date
- Target Campaign End Date
- UX Styling and Options
- Authorization Challenge Config 

## Availablity
Strive is working to complete the development and design of Card Links and hopes to have demonstrations ready to present soon.