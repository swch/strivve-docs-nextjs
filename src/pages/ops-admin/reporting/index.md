---
title: Reporting
---

Strivve provides both API data feeds and out of the box reporting to support your card placement reporting needs.  

## CardSavr Webhook Notifications
For the best integrated reporting solution, Strivve recommends leveraging [Webhooks](https://developers.strivve.com/resources/notifications)  available via the [CardSavr API](https://swch.github.io/slate/#introduction).  Webhooks provide your application the ability to receive asynchronous events for all card placement results.  By registering for these events, your application can streamline real-time results into your targeted data ingestion processes for reporting.

When [creating a cardholder](https://swch.github.io/slate/#create-cardholder), integrators can also include their own custom_data that can tie application specific data back to the application when receiving notifications for a given cardholder.  This provides a tight integration from which a cardholder along with any specific attributes can be specified and tracked upon receiving the notifications.

## Strivve Partner Portal

Each dedicated CardSavr instance includes a [Partner Portal](https://developers.strivve.com/ops-admin/partner-portal) used in the administration of your environment configuration.  Below are the out of the box reporting options that your organization may generate at any time.


### Merchant Reports
Merchant Reports allow you to generate a report of all card placement activity between any specified dates. 

To generate the report, simply select the start and end dates you would like and generate the report. The report will then be downloaded to your device.
![Reporting](/images/merchant_report_1.png ) 
![Reporting](/images/merchant_report_2.png ) 


| Field Name                  | Description                                         
|-----------------------------| ----------------------------------------------------
| Field Name                  | Job id of the transaction                           
| bank_identification_number  | Bank id of the card associated with the placement transaction                                 
| merchant_site_hostname      | Hostname of the merchant site the card is being place to                      
| status                      | Resulting [status](https://swch.github.io/slate/#post-place_card_on_single_site_job-1) of the card placement transaction  
| fi_name                     | Name of the associated financial instituion (configured in the [Partner Portal](https://developers.strivve.com/ops-admin/partner-portal))         
| fi_lookup_key               | Key used to identify financial institution used by API (configured in the [Partner Portal](https://developers.strivve.com/ops-admin/partner-portal))
| completed_on                | Timestamp of when card placement transaction completed
| meta_key (not pictured)     | Comprised of the first and last initials of the [cardholder](https://swch.github.io/slate/#create-cardholder), the postal code, and the last two digits of the PAN.
| cuid (not pictured)         | Unique ID for the [cardholder](https://swch.github.io/slate/#create-cardholder) provided by your application to the CardSavr API.  A random number will be generated if not provided.
| custom_data (not pictured)  | Additional data that can be added to the [cardholder](https://swch.github.io/slate/#create-cardholder) by your application to the CardSavr API.  If provided, the merchant report will include this information in additional fields.


### Cardholder Session Reports
Strivve is in process of developing a cardholder session report that integrates CardUpdatr and StrivveCX UX events into session report data that will track the full Strivve UX session journey while linking to the placement transaction detail provided in thh merchant reports.

### Merchant Site Reports
The Merchant Sites report lists all Strivve supported merchant sites and their current status, as well as other relevant information. 
![Reporting](/images/merchant_site_report_1.png ) 

*Strivve is currently working on additions to this list that includes additional information per site plus the ability to export to your device. 

