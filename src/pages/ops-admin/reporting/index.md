---
title: Reporting
---

Strivve provides both API card placement result notifications and out of the box reporting solutions to support your card placement reporting needs.  

## CardSavr Webhook Notifications
For the best integrated reporting solution, Strivve recommends leveraging [Webhooks](https://developers.strivve.com/resources/notifications) available via the [CardSavr API](https://swch.github.io/slate/#introduction).  Webhooks provide your application the ability to receive asynchronous events for all card placement results.  By registering for these events, your integration can streamline real-time results into your targeted data ingestion processes for back office applications.

When [creating a cardholder](https://swch.github.io/slate/#create-cardholder), integrators can also include their own custom_data that can tie additional application-specific cardholder details back to the back office processing when receiving notifications for a given cardholder placement transaction.  This provides a tight integration from which a cardholder along with any specific attributes can be specified and fully tracked upon receiving these notifications.

## Strivve Partner Portal

Each dedicated CardSavr instance includes a [Partner Portal](https://developers.strivve.com/ops-admin/partner-portal) used in the administration of your environment configuration.  Belsow are the out of the box reporting options that your organization may generate at any time.


### Transaction Reporting
Transaction Reports allow you to generate a report of all card placement activity between any specified dates. Transaction reports can be downloaded from the [Partner Portal](https://developers.strivve.com/ops-admin/partner-portal) and includes the following information:

| Field Name                  | Description                                         
|-----------------------------| ----------------------------------------------------
| job_id                      | Job id of the transaction                           
| bank_identification_number  | Bank id of the card associated with the placement transaction                                 
| merchant_site_hostname      | Hostname of the merchant site the card is being place to                      
| status                      | Resulting [status](https://swch.github.io/slate/#post-place_card_on_single_site_job-1) of the card placement transaction  
| fi_name                     | Name of the associated financial instituion (configured in the [Partner Portal](https://developers.strivve.com/ops-admin/partner-portal))         
| fi_lookup_key               | Key used to identify financial institution used by API (configured in the [Partner Portal](https://developers.strivve.com/ops-admin/partner-portal))
| completed_on                | Timestamp of when card placement transaction completed
| meta_key                    | Comprised of the first and last initials of the [cardholder](https://swch.github.io/slate/#create-cardholder), the postal code, and the last two digits of the PAN.
| cuid          | Unique ID for the [cardholder](https://swch.github.io/slate/#create-cardholder) provided by your application to the CardSavr API.  A random number will be generated if not provided.
| custom_data   | Additional data that can be added to the [cardholder](https://swch.github.io/slate/#create-cardholder) by your application to the CardSavr API.  If provided, the merchant report will include this information in additional fields.
| source_type                 | Identifies the channel or method through which the cardholder interacted (see [Journey Paths](/integrations/sources)).
| soure_category              | Defines the purpose or intent behind the interaction. (see [Journey Paths](/integrations/sources)).
| source_subcategory          | Custom text to provide any additional category context if applicable. (see [Journey Paths](/integrations/sources)).
| source_device               | Specifies the platform or device through which the cardholder engaged. (see [Journey Paths](/integrations/sources)).


### Session Reporting
The Session Report provides a historical log of all sessions completed within a given timeframe to paint a picture of what the Cardholder actions and results were during the card-on-file workflow.

Session reports can be downloaded from the [Partner Portal](https://developers.strivve.com/ops-admin/partner-portal) and includes the following information:

| Field Name                  | Description                                         
|-----------------------------| ----------------------------------------------------
| cuid                        | Unique ID for the cardholder provided by FI via the CardSavr API.                             
| fi_lookup_key               | Unique key used to identify financial institution.                     
| select_merchants            | Timestamp of when the CardUpdatr Merchant Site List View was last visited.
| credential_entry            | Timestamp of when the CardUpdatr Merchant Credential Entry view was last visited.     
| missing_fields              | Timestamp where the Cardholder was prompted for missing Card or Cardholder Billing information.
| account_credentials_submitted | Timestamp where the  Cardholder moved forward to enter credentials to start card placement.
| successful_jobs             | Total successful card placement jobs within the session.
| total_jobs                  | Total attempted card placement jobs within the session.
| custom_data                 | Custom_data that can be added by FI via the CardSavr API.
| clickstream                 | Clickstream data of all views visited by cardholder within CardUpdatr.
| closed_on                   | Timestamp of when the session was closed
| created_on                  | Timestamp of when the session was created
| agent_session_id            | Session identifer for the session
| source_type                 | Identifies the channel or method through which the cardholder interacted (see [Journey Paths](/integrations/sources)).
| soure_category              | Defines the purpose or intent behind the interaction. (see [Journey Paths](/integrations/sources)).
| source_subcategory          | Custom text to provide any additional category context if applicable. (see [Journey Paths](/integrations/sources)).
| source_device               | Specifies the platform or device through which the cardholder engaged. (see [Journey Paths](/integrations/sources)).



### Merchant Site Reports
The Merchant Sites can be downloaded from the [Partner Portal](https://developers.strivve.com/ops-admin/partner-portal) and lists all Strivve supported merchant sites and their current status, as well as other relevant information:

| Field Name                  | Description                                         
|-----------------------------| ----------------------------------------------------
| Site Name                   | Merchant site name  (Amazon)                          
| Site URL                    | Merchant site URL (amazon.com)                     
| Current State               | The current [availability status](/resources/site-tagging) of the given site.
| Account Link                | Required information to authenticate to given site (username + password, username + one-time-code, other)
| Required Form Fields        | Required data to place a card at the given site (card and billing address data, email address)