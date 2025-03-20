---
title: Merchant Site Testing 
---

## Overview
At Strivve, we have developed an experience that allows cardholders to add their credit cards to numerous online merchant sites effortlessly. With our Remote Process Automation (RPA) technology, we take care of all the intricate navigation required to find and set the credit card as the default payment method in the background without the cardholder needing to provide anything other than their merchant site credentials. Whether you choose to use our pre-built CardUpdatr technology or integrate our CardSavr APIs into your own cardholder experience, there are important considerations to keep in mind as you prepare, test, and deploy this feature to your cardholders. Additionally, it is crucial to prioritize the security of merchant sites while incorporating our technology, as they constantly watch out for hacking attempts and automated requests. Testing and selecting merchant sites carefully can help avoid issues such as blocking or throttling of requests, which could cause Card Placement to fail during the testing process.

Merchant site testing considerations for the CardSavr platform include the following topics:

1.	**Merchant Site Test Complexities**: Merchant sites frequently update their behavior regarding account login and card placement. Understanding how different merchant sites respond to various patterns is crucial. Adjusting your testing approach according to these variations is essential.

2.	**Strivve's Merchant Site Testing and Validation**: At Strivve, we perform a variety of tests to ensure a seamless experience for your cardholders. We continuously monitor merchant sites for any changes and promptly adjust our site testing and interaction with our service accordingly.

3.	**User Experience Testing**: Synthetic sites can simulate different scenarios, such as two-factor authentication (2FA) or multi-factor authentication (MFA), to test account linking. This type of testing helps identify potential user experience issues and ensures a smooth experience for your cardholders.

4.	**Suggested GoLive! Testing**: Strivve recommends thorough testing of your CardUpdatr or CardSavr experiences before going live. This testing helps identify any potential issues and ensures your experience is ready for prime time.

## Merchant Site Test Complexities
Testing merchant sites can be complex due to their ever-changing behavior concerning account login and card placement. Merchant sites make updates and decisions based on data and metrics gathered from their site traffic and fraud departments. Here are a few examples of different responses we have observed from merchant sites:

1.	Starbucks: Allows placement of only three cards on an account within a short time; attempting to add a fourth will lock the account.

2.	Venmo: Does not lock the account if more cards are added, but blocks additional card additions for a certain period.

3.	Spotify: Blocks login if more than three cards are placed.

These examples illustrate how merchant sites can respond differently to account login and card placement patterns. Being aware of these variations helps you adjust your testing approach accordingly. While we recommend leaving Merchant Site testing to Strivve, here are some tips if you choose to test them:

* Test a variety of merchant sites.
* Explore different account login and card placement patterns.
* Monitor merchant sites for any changes.
* Adjust your testing strategy as needed.

By following these tips, you can ensure comprehensive testing and stay updated with the latest changes to merchant sites.

## Strivve's Merchant Site Testing
Before discussing recommendations for testing and preparing for your GoLive! Date, it is essential to understand how Strivve tests and manages our merchant sites.

For our top-tier merchant sites, we have a rigorous testing process in place for CardUpdatr & CardSavr functionality. We conduct these tests bi-weekly to ensure successful placement of cardholders' credit cards on these critical merchant sites. Continuous testing and monitoring are our top priorities as they form the core of our business.

In the event of failures at any merchant site, we immediately place them on a "watchlist" and closely monitor them on a daily basis for a week. Based on the results of our daily tests for these watchlist merchant sites, we make informed decisions on whether to temporarily remove the sites from the production rotation while we address the issues or to keep the site active and continue accepting production traffic

We also pay close attention to the impact of our testing activities to avoid triggering account or card fatigue, which could negatively affect the cardholders' experience and GoLive testing.

While we maintain continuous monitoring of these sites, we understand that issues can still occur during your own testing or pre-release beta testing. In such cases, we strongly encourage you to reach out to us immediately at developers@strivve.com or through your dedicated account manager to report any issues encountered with merchant sites. We are here to assist you and address any concerns promptly.

## User Experience Testing - Synthetic Sites
To ensure a seamless and user-friendly experience for your cardholders, we offer user experience testing through our synthetic sites. These synthetic sites accurately replicate the behavior of real merchant sites, allowing you to preview the CardUpdatr experience or test CardSavr API calls within your custom application before launching it to your cardholders. In this section, we will provide detailed information about two of the synthetic sites available and explain how you can leverage them to gain a comprehensive understanding of the flow and functionality.

*	**Standard Login:** This scenario simulates the typical UserID and Password combination, which is the most common method for logging into merchant sites. However, it also includes variations in outcomes such as two-factor authentication (2FA), security questions and answers, and other security measures that may be employed by different merchant sites.

* **OTP Login:** In this scenario, you will only need to provide the UserID to initiate a One Time Passcode login. The subsequent flow and prompts will depend on your response to the passcode prompt.

* These synthetic sites have been meticulously developed as standalone entities external to the Strivve platform. To access these sites and start testing them follow the guidelines provided below to make them available:

## Enabling Synthetic Sites
To enable synthetic sites, follow one of these options (option one is recommended):
1.	If you have access to the Strivve Portal:
* Sign in to the Strivve Portal and navigate to the relevant Financial Institution (FI).
* In the FI settings, locate the "merchant_site_tags" section and add the "synthetic" tag:  ***"merchant_site_tags": [ "prod,synthetic", "usa" ]***

2.	If your integration is an embedded version of CardUpdatr:
* Add the following JSON to the config property:
***"merchant_site_tags": [ "prod,synthetic", "usa" ]***

3.	Within your Online Banking implementation with CardUpdatr integrated:
*	Access your testing environment within the Online Banking implementation.
*	Press "CTL-J" to enable the debug mode.
*	Select “show disabled” and then search for “Synthetic”

## Synthetic Site - Standard Logon

CardUpdatr Tile:
![CardUpdatr Tile](/images/synthetic-site-tile.png) 

The SS Standard Login synthetic site is designed to simulate the most common use cases for merchant site verification cardholder journeys. When accessing this synthetic site, you will encounter various outcomes based on the UserID and Password you enter. Here are the options and their corresponding outcomes:

### Option 1: GOOD_EMAIL & GOOD_PASSWORD
If you enter "good_email" for the UserID and "good_password" for the Password, you will experience the following screens and a successful scenario:

![Stardard Logon](/images/SS-Standard-Logon.png) 

A sample video of good_email & good_password: [good_email](https://1drv.ms/v/s!ArSB8eMcy-NPjLspzhShRN6XNR9IrQ?e=zD8vqq)

### Option 2: GOOD_EMAIL & "TFA"

To simulate a Two-Factor Authentication (TFA) experience, you can follow these steps:
1.	Enter "good_email" for the UserID on the SS Standard Login synthetic site.
2.	Enter "tfa" for the Password field.

By entering these credentials, you will trigger the TFA flow within the experience. The next screen will prompt you for a Two-Factor Authorization (TFA) code. To proceed with the simulated TFA scenario, enter "1234" as the TFA code.

If you enter "1234" as the TFA code, you will see a success screen, indicating that the TFA authentication process was successful.  Here are the screens:

![TFA](/images/SS-Standard-Logon-TFA-1.png) 
![TFA](/images/SS-Standard-Logon-TFA-2.png) 

A sample video of good_email & tfa:  [good_email + tfa](https://1drv.ms/v/s!ArSB8eMcy-NPjLsnr26TBILRngf8zw?e=K5tmyb)

### Option 3: GOOD_EMAIL & SECURITY

To simulate a cardholder seeing their security question and answers, please follow these steps:
1.	Enter "good_email" for the UserID on the SS Standard Login synthetic site.

2.	Enter "security" for the Password field.

By entering these credentials, you will trigger the scenario where the security question and answers are displayed on the next screen. Please note that for the purposes of this test, the answers are CASE SENSITIVE.

To proceed with the simulated scenario, enter "Max" for your dog's name and "Smith" for your last name as the answers to the security question.

If you enter "Max" as the answer for your dog's name and "Smith" for your last name, the result will be a successful card placement, indicating that the security question and answers were correctly provided.

![Security](/images/SS-Standard-Logon-Security-1.png) 
![Security](/images/SS-Standard-Logon-Security-2.png) 

A sample video of good_email & security:  [good_email + security](https://1drv.ms/v/s!ArSB8eMcy-NPjLsqAmEdZqegs43Lcw?e=9Bbckp)

## Synthetic Site - OTP
CardUpdatr Tile:
![CardUpdatr Tile](/images/synthetic-site-tile.png) 

The Synthetic Site SS OTP is specifically designed to simulate a One-Time Passcode (OTP) cardholder journey. Within this synthetic site, there are a few positive outcome scenarios that you can test.

**Scenario 1:** “good_email” for UserID, and then when prompted for TFA, enter a TFA Passcode of 1234. If you enter the TFA Passcode as "1234," the process will proceed smoothly, and the card will be successfully placed. This scenario represents a standard flow that is commonly observed on sites like Walmart.
Here are the screens:

![OTP](/images/SS-OTP-1.png) 
![OTP](/images/SS-OTP-2.png) 

A sample video of good_email & 1234 (for tfa): [good_email + 1234](https://1drv.ms/v/s!ArSB8eMcy-NPjLso7LwOAPjX7NfUKQ?e=JlRzt1)

**Scenario 2:** “good_email” for UserID, and then when prompted for TFA, enter a TFA Passcode of 5678. If you enter the TFA Passcode as "5678," the site will prompt you to provide the account password. This scenario reflects a flow similar to what we have observed during our interactions with Uber's site.
Here are the screens:

![OTP](/images/SS-OTP-Password-1.png) 
![OTP](/images/SS-OTP-Password-2.png) 

A sample video of good_email & 5678 (for tfa): [good_email + 5678](https://1drv.ms/v/s!ArSB8eMcy-NPjLsmtE22gQNbwJykQA?e=CJoHVK)

## How To Use with the CardSavr API
You can post jobs to the synthetic site just like you would to a live merchant site.

First, ensure that you have all the objects need to post a job to the CardSavr API:

* User (must be created before the card or account object)
```json
{
  "username": "john_doe_123",
  "cardholder_safe_key": "sample_key",
  "first_name": "John",
  "last_name": "Smith",
  "email": "jsmith@email.com",
  "role": "dev"
}
```
* Card
```json
{
"cardholder_id": 3,
"address_id": 2,
"pan": 4111111111111111,
"par": "Q1J4AwSWD4Dx6q1DTo0MB21XDAV76",
"cvv": "123",
"expiration_month": "05",
"expiration_year": "24"
}
```  
* Account (site_hostname=synthetic.site)
```json
{
"cardholder_id": 11,
"site_hostname": "synthetic.site",
"username": "john_smith123",
"password": "sample_password"
}
```

Once these three objects exist in the CardSavr platform, you can 
post a job with the user_id, card_id, and account_id, and 
a site_hostname=synthetic.site
```json
{
"user_id": 1,
"card_id": 1,
"account_id": 1,
"site_hostname": "Synthetic-Basic Login",
"requesting_brand": "abc"
}
``` 

Using the synthetic sites, you can test the user interactions 
within your application 

