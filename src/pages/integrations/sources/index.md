---
title: Journey Paths
---

## Overview

Strivve provides the capability for an integrated application to pass in Cardholder Journey information (or journey *Sources*) that delivers a fixed framework to answer the questions of How, Why, and Where the cardholder has begun their card placement journey.

The information can be passed in via the [User Object](/integrations/cardupdatr#user-object) in CardUpdatr or directly via the [CardSavr API](https://swch.github.io/slate/#create-cardholder) with the following format:

```javascript

  source: {
    type: "email",
    category: "campaign",
    sub_category: "AMCE FI Amazon Prime Day Campaign for card on file",s
    device: "mobile"
  }

```
This information will be sent through the Strivve platform and made available as part of the [Strivve Partner Portal and Webook Reporting](/ops-admin/reporting) with new columns of source.type, source.category, source.subcategy, and source.device for each row.  

### Source Type
The **How**.  Identifies the channel or method through which the cardholder interacted.

| Property Values: type          | Description                                                                                                                                   |
| ------------------------------ | ---------------------------------------
| email                          | Delivered via email confirmation.
| navigation                     | Accessed through the online banking app through app-specific menu options or other navigations. 
| push_notification              | Sent directly to the carholder's device through an app.
| promo                          | In-app banners or popups.
| qr_code                        | Accessed by scanning a QR code in physical or digital media.
| sms                            | Delivered via text message.
| test                           | Originated from internal testing framework or tool.
| unknown {default}              | Used when the engagement method is not identifiable.

### Source Category
The **Why**.  Defines the purpose or intent behind the interaction.

| Property Values: category      | Description                                                                                                                                   |
| ------------------------------ | ---------------------------------------
| activation                     | Encourage cardholders to activate new, reissued, or replaced cards.
| card_controls                  | Promote features like locking/unlocking cards or managing spending limits.
| card_conversion                | Support portfolio flips, product migrations, or bulk transitions.
| operational                    | Address administrative needs (e.g., updates for reissued cards).
| other                          | Other method (can be clarified in the source sub_category field)
| unknown {default}              | Used when the business intent is not identifiable.

### Source Sub_Category
Additional Details of **The Why**.  Custom text to provide any additional context if applicable.
| Property Values: sub_category  | Description                                                                                                                                   |
| ------------------------------ | ---------------------------------------
| <free-form text>               | Custom text used to provided any additional context for selected category.

### Source Device
The **Where**.  Specifies the platform or device through which the cardholder engaged.

| Property Values: device        | Description                                                                                                                                   |
| ------------------------------ | ---------------------------------------
| desktop                        | Interaction occured via a desktop browser.
| mobile                         | Interaction occurred within a native mobile app.
| mobile web                     | Interaction occured via a mobile browser.
| unknown {default}              | Used when the device type is not identifiable.


If you have any questions regarding this content, please [Contact Us](mailto:developers@strivve.com).
