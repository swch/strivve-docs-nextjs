---
title: Minimizing User Wait Time with Strivve
---


## Overview

Strivve is committed to ensuring that all cardholders have an optimal user experience throughout their card placement journey.  

This is broken down into compelling experiences from multiple cardholder placement journeys (new card, card replacement, campaigns, etc), increasing overall percentages of successful card placement attempts, and the overall performance of the cardholder placement journey.

This document focuses on the overall time required by the cardholder to complete their card placement journey.  The amount of time a user is idle, waiting to interact during each card placement, is referred to as User Wait Time.   

Strivve measures user wait times, and many more performance related metrics on every card placement which is used to make regular improvements to Strivve operations. Regularly, there are production improvements which positively impact performance, and there are several more initiatives on our roadmap which improve the user wait time, as well as overall length of time it takes to fully place a card. 

Today, most customers and their cardholders benefit greatly by leveraging a user experience which completes as soon as the site account is linked.  In this way, the total User Wait Time for cardholders is significantly reduced by more than 50%, by only requiring the cardholder attention while their account linking input (aka sign in) is needed. 

This document is targeted towards integrators who are chosing to author their own UX using the [CardSavr API](/integrations/introduction#card-savr-api) versus a Strivve drop-in component.

## User Wait Time Solutions

### Card On File Processing Buckets

#### Account Linking
The account linking process of authenticating a cardholder to the merchant site requires entering initial credentials and at times responding to dynamic challenges such as MFA or a One-Time-Passcode.  This is the only group of actions which requires cardholders’ attention.

#### Card Placement
The account linking process of authenticating a cardholder to the merchant site requires entering initial credentials and at times responding to dynamic challenges such as MFA or a One-Time-Passcode.  This is the only group of actions which requires cardholders’ attention.

### User Wait Time - Waiting for Full Process to Complete
Early implementations of Strivve CoF workflows required cardholders to wait for the entire length of the card placement.  Data from those implementations showed that this created unnecessarily longer user wait times from which the cardholder needs to be present for the card placement to complete.

Strivve’s legacy solutions followed this workflow pattern until the concept of the cardholder U/X journey simply completing once the account is successfully linked.  If the cardholder waits less, improved cardholder engagement and increases the volume of card-on-file placements.

For example, the Strivve CardUpdatr component was orignally built to require the user to wait for the entire process to complete.  Strivve then introduced the concept of notifing the cardholder once that account linking process has completed that no further action is necessary, and they may exit or move forward to add more sites.  

**Account Link Completion** - Cardholder has option to wait for the entire process to complete or release to other tasks:
![CardUpdatr](/images/cu_account_link_complete.png) 

### User Wait Time - Releasing the Cardholder after Account Linking
The new StrivveCX component library has been designed to provide an enhanced cardholder experience from which the User Wait Time is minimized by releasing the cardholder’s after account linking ha been completed. 

Here is a brief overview of how StrivveCX releases the cardholder after account linking:

#### Site Selection
As with most solutions, the cardholder is presented with a site list from which, in this example, Apple Store is selected.

**Select Merchant:**![StriveCX-1](/images/cx_select_merchant.png) 

#### Account Linking
During the account linking process for Apple, the cardholder enters the correct initial credential information and satisfies the MFA code sent to their device when dynamically prompted.

Once the account linking process is complete, there is no additional interaction required and the cardholder may continue to select other sites while the card placement process completes in the background. 

**Enter initial credentials:**![StriveCX-2](/images/cx_account_link_initial_apple.png) 

**Account Linking Progress:**![StriveCX-3](/images/cx_account_link_progress_apple.png) 

**MFA Prompt:**![StriveCX-4](/images/cx_account_link_progress_mfa_apple.png) 

**Account Linking Complete** - Option to browse more sites:![StriveCX-5](/images/cx_account_link_complete_apple.png) 

#### Site Placement List
Once one or more cards have been placed, the cardholder has access to a recent site list from which the placement history is available for view by selecting See your recent site(s).
 
In the case of Apple, the card placement process is still in progress, while an Amazon card placement has been fully completed previously.

Once the background card placement is complete, the status is updated to completion.

**Updated Site List:**![StriveCX-6](/images/cx_recent_sites.png) 

**My Sites Page** - Apple placing card in background:
![StriveCX-7](/images/cx_my_sites_1.png) 

**My Sites Page** - After Apple completes placing card in background:
![StriveCX-8](/images/cx_my_sites_2.png) 

## Conclusion
The focus of minimizing the User Wait Time will result in a significantly improved cardholder experience which would maximize adoption and usage of the CardSavr platform.  By releasing the cardholder after account linsking, the amount of time the cardholder has to wait is reduced significantly by over 50%.  

Please [Contact Strivve](mailto:support@strivve.com) for any additional support regarding this guidance.










