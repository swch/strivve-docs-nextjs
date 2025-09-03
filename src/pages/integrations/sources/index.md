---
title: Journey Sources
---

## Overview

Strivve provides the capability for an integrated application to pass in cardholder card-on-file placement journey information (journey *Sources*) that delivers a fixed framework to answer the questions of How, Why, and Where the cardholder has begun their card placement journey.

The information is passed in the [User Object](/integrations/cardupdatr#user-object) with CardUpdatr or alternatively via the [CardSavr API](https://swch.github.io/slate/#create-cardholder) using the following example format:

```javascript

  source: {
    type: "email",
    category: "campaign",
    sub_category: "AMCE FI Amazon Prime Day Campaign for card on file",s
    device: "mobile_app"
  }

```
### Source Type
The **How**.  Identifies the channel or method through which the cardholder interacted.  

| Type Property Values           | Description                                                                                                                                   |
| ------------------------------ | ---------------------------------------
| email                          | Delivered via email confirmation.
| navigation                     | Accessed through the online banking app through app-specific menu options or other navigations. 
| push_notification              | Sent directly to the carholder's device through an app.
| promo                          | In-app banners or popups.
| qr_code                        | Accessed by scanning a QR code in physical or digital media.
| sms                            | Delivered via text message to mobile device.
| test                           | Originated from internal testing framework or tool.

One of the pre-defined Type property values must be selected.  If a value provided does not match, an error will be logged to the web console, and the reporting output will state “unknown” in the specified field.

### Source Category
The **Why**.  Defines the purpose or intent behind the interaction. 

| Category Property Values                | Description                                                                                                                                   |
| ------------------------------ | ---------------------------------------
| activation                     | Encourage cardholders to activate new, reissued, or replaced cards.
| card_controls                  | Promote features like locking/unlocking cards or managing spending limits.
| campaign                       | Broader marketing campaigns for card usage, spend growth, or education.
| other                          | Other method (can be defined in the source_subcategory field).  For example, a category that is being used that is not listed as a current pre-defined value.  Context can then be added to the **source_sub_category** (see below).

One of the pre-defined Category property values must be selected.  If a value provided does not match, an error will be logged to the web console, and the reporting output will state “unknown” in the specified field.

### Source Sub_Category
Additional Details of **The Why**.  Custom text to provide any additional context if applicable.

| Sub_Category Property Values:  | Description                                                                                                                                  |
| ------------------------------ | ---------------------------------------
| free-form text                 | Custom text used to provided any additional context for selected category.

The maximum limit for the Sub_Category property value is 32 characters.  If a value exceeds the limit, it will be truncated in the reporting output.

### Source Device
The **Where**.  Specifies the platform or device through which the cardholder engaged.  

| Device Property Values:        | Description                                                                                                                                   |
| ------------------------------ | ---------------------------------------
| desktop                        | Interaction occured via a desktop browser.
| mobile_app                     | Interaction occurred within a native mobile app.
| mobile_web                     | Interaction occured via a mobile browser.

One of the pre-defined Device property values must be selected.  If the parameter passed does not match the below, an error will be logged to the web console and internal server logs, while Strivve will detect the platform where the reporting output will be assigned as ‘desktop’ or ‘mobile_web’.

### Reporting
This information will be sent through the Strivve platform and made available as part of the [Strivve Partner Portal and Webhook Reporting](/ops-admin/reporting) with following new columns:

| Field Name                  | Description                                         
|-----------------------------| ----------------------------------------------------
| source_type                 | Identifies the channel or method through which the cardholder interacted.
| soure_category              | Defines the purpose or intent behind the interaction. 
| source_subcategory          | Custom text to provide any additional category context if applicable. 
| source_device               | Specifies the platform or device through which the cardholder engaged. 


If you have any questions regarding this content, please [Contact Us](mailto:developers@strivve.com).
