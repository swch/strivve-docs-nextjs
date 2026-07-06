## Financial Institution
The Financial Institution tab shows all FIs within the CardSavr instance (if logged in as an admin), as well as all notifications for that FI. Admin users may add, edit or delete financial institutions, as well as add, edit, and delete notifications for FIs.

### Add/Edit Financial Institution

To edit an FI, click the pencil icon beside the FI you wish to edit.

### Name
The name of the financial institution (e.g. "Acme Bank").

### Lookup Key
Unique key used to identify financial institution within the CardSavr API, such as in request headers (e.g. "acme_bank").

### Alternate Lookup Key
Alternate lookup key; can be used in case of FI name change that does not match original lookup_key, in order to maintain backwards compatibility.

### Branding
The branding field allows for customization of branding properties in CardUpdatr. This field takes a valid JSON branding object, which must have both config and style_template properties:

```javascript
{
  config : {},
  style: {}
}
```

Note: when editing a branding object, click the Format JSON button to format object spacing. This button also verifies if JSON is valid.  You will also notice that any properties passed dyanmicallyy via embed/launch CardUpdatr will override properties set in the Partner Portal.

The following properties are allowed within each of the two primary properties (nested properties are defined in separate tables):

#### config :
| Property        | Type              | Description 
| ----------------| ----------------- | -----------------
| disable_brand   | boolean           | If true, disables CardUpdatr for this FI.                                                    
| top_sites       | array of strings  | Hostnames of sites to appear at the top of the site tiles selection page.                    
| exclude_sites   | array of strings  | Hostnames of sites to be excluded from CardUpdatr site selection.                            
| frame_ancestors | object            | Defines the frame ancestors for embeddable CardUpdatr. Takes a "host" and "value" property, with the host being the CardUpdatr URL and the value being the URL of the page embedding CardUpdatr.
| merchant_site_tags | array of strings  | Defines the type of sites that appear in CardUpdatr. Options are: **prod** (these sites are reliable for a production environment), **usa** (for American sites), **canada** (for Canadian sites), **synthetic** (fake sites used for testing purposes; they simulate real merchant sites)               
| close_url       | string            | Required if running as an embedded SSO user. Will default to "close" if running as a non-embedded SSO user. Otherwise, defaults to "/select-merchants". This option determines the on-click action of the "Close" button that appears on the final page after all jobs have finished. If set to a custom URL, clicking the Close button will navigate to the URL. If set to "/select-merchants", the user will be logged out and taken back to the site selection page with a new session. If set to "none", the Close button will not appear on the page. If set to "close", the window will be closed.     

The following properties customize the status update email sent to CardUpdatr users (if this notification has been created):
#### config.email:

| Property              | Type    | Description         
| --------------------- | --------| ---------------------
| footer_link_1         | object  | Object with "text" (i.e. display text) and "url" properties. This defines a link that will appear on the left of the email footer.
| footer_link_2         | object  | Object with "text" (i.e. display text) and "url" properties. This defines a link that will appear on the right of the email footer.
| sender_email_address  | string  | Sender email address for status update notification email.
| footer_address        | string  | Mailing address to appear at the bottom of the email.
| card_description      | string  | Description of card that will appear in the email text. 

The following properties customize the behavior of CardLinks and CSV uploads for CardLinks:
#### config.cardlinks :

| Property              | Type    | Description         
| --------------------- | --------| ---------------------
| encryption            | string  | Possible values are "none" and "pgp". This defines the encryption type that the CSV uploads for CardLinks will use. Defaults to "none".
| validation_options    | array of strings  | Defines what Card values will be used to validate a CardLink. Possible values are "cvv", "postal_code", "last_5", "expiration_date". If this property is used, atleast one value is needed.


#### style :
| Property            | Type      | Description
| ------------------- | --------- | --------------------
| card_description                | string                   | Description of card to be used in CardUpdatr text, e.g. "ACME credit or debit card".
| merchant_selection_message      | string                   | Message telling users to select sites to update their cards (default is: "Select the sites below to make your {{card_description}} the primary payment method.")
| final_message                   | string                   | Final message displayed when card placement succeeds. Default is: "Your current card placements require no further interaction.  Click 'More sites' to place your card at additional sites."
| landing_page_image_url          | string                   | The URL of the image that appears at in the center of the header.
| favicon_url                     | string                   | Defines favicon url.
| header_background_color         | string                   | Header background color.
| link_color                      | string                   | Defines the color for all text links.
| button_color                    | string                   | Defines the color for all buttons.
| button_border_radius            | string                   | Defines the border radius property for all buttons.
| button_padding                  | string                   | Defines the padding for all buttons.  


### Delete Financial Institution
To delete an FI, click the trash can next to the FI you would like to delete.  Note that an active FI with past activity must be *Deactived* (see below) before it can be deleted.

### Add/Edit Notifications
Notifications are triggered by certain key events, such as the completion of a session in CardUpdatr. 

#### Name  
Name of the notification (e.g. "CardUpdatr Session End Email").

#### Type
- email : Sends an email notification to the provided recipient when the specified event occurs. 
- webhook : Posts to the provided webhook when the specified event occurs. 

#### Event
- session_complete : sends notification when the CardUpdatr session has completed. 
- webhook_error_summary (email type only) : sends summary of 400 and 500 errors returned when posting any existing webhook notifications. A new summary is sent once per specified interval. 
- merchant_site_updates_top (email type only) : sends summary of changes in status to merchant sites that have the "top_notify" tag. Status changes include a site going live or being taken down.
- merchant_site_updates_all (email type only) : sends summary of changes in status to merchant sites. Status changes include a site going live or being taken down.

#### URL (webhook notifications)
URL of the webhook where you wish to receive the event notification.

#### Recipient (email notifications)
Specify the email address where you wish to send the notification. For session_complete email notifications, the recipient can also be the cardholder on the session.

#### HTML and Text Templates (email notifications)
You can override the default HTML and text email templates by pasting your custom templates here. The text email is sent 

#### Interval Type and Interval Length (webhook_error_summary notifications only)
Defines the interval at which the notification is sent (e.g. 1 hour would send an hourly notification).

#### Delete Notification
To delete a notification, click the trash can next to the notification you would like to delete.
  


## BINs
To view, create, edit, and delete the BINs associated with an FI, click the blue BINs button next to that FI.

#### Add/Edit BIN
To edit a BIN, click the pencil icon beside the BIN you wish to edit.

#### Bank Identification Number
Bank identification number.

#### Custom Data  
Custom data (e.g. brand, type) that can be added according to FI need.

#### Delete Bin  
To delete a BIN, click the trash can next to the BIN you would like to delete.

#### Active versus Inactive
A Financial Institution can be set to an *Inactive* thus disabling it for any use by Cardsavr applications.  Among other use cases, if you are a customer who is billed per FI, deactivating an FI ensures you are not billed for it.  When creating an FI, the default is *Active*.

To set an FI as *Inactive*, click on the "not allowed" icon next to the FI name.  To set the FI back to *Active*, click on the "refresh" icon next to the FI name.  This can also be done within the FI configuration via the "Active" combo box (set to true or false).

In the FI list, you can view the FIs by Active, Inactive, or All.

Upon downloading the FI report, there is an Active/Inactive column included with each FI row.



## Reporting

### Transaction Reporting

Transaction Reporting displays all card placement attempts and relevant data (final status, date completed, etc.)

You can also generate a CSV report of all card placement activity between the specified dates. If your user settings include access to all FIs ("All FIs" checkbox), this will show activity for all FIs in the instance. Otherwise, it will only show singularly assigned FI.

To generate the report, simply select the beginning and ending dates you would like and click Download Report. If your reporting also leverages custom_data fields, check the Expand Custom Data checkbox so the data is included in the generated report.  

### Session Reporting

Session Reporting lists all active and closed cardholder sessions. A session remains open until the cardholder has been inactive for 15 minutes or clicks the Done button. 
The clickstream object shows the overall journey of the cardholder by logging important momemnts in the CardUpdatr workflow. The clickstream object can be viewed in its entirety by clicking the View button. Additionally, the four different locations tracked in the clickstream are broken out into four separate columns in the display/report; these columns display the first time that the cardholder visited the location. The columns are defined as follows: 

| Column Name          | Definition 
|--------------------- |------------
| Select Merchant      | Upon loading of the site selection page. 
| Missing Fields       | Upon appearance of the missing fields modal (if additional information was required by the selected sites). 
| User Data Collection | Upon loading of the user data collection page. 
| Credential Entry     | Upon loading of the credential entry page. 

The number of succcessful jobs versus total jobs is also tracked. The detailed information for each job can be accessed with the View button.

To generate a CSV report showing cardholder session data for a certain date range, select your beginning and ending dates and click Generate Report. The report will download to your device.

## Merchant Sites 
The Merchant Sites tab lists all merchant sites, their current active status, and the user data information that each site requires.

To generate a CSV report of this data, click Generate Report. The report will download to your device.

## Users
The users tab shows all existing portal users with associated roles and assigned financial institutions.  Here users can be added, edited, and deleted.  When editing, the user can be assigned to a specific FI, or, all FIs by selecting the "All FIs" checkbox.  

### Add/Edit a User
To edit a user, click the pencil icon beside the user you wish to edit. 

#### Role
A user's role determines their permissions within the CardSavr API. A user may have the following roles:

#### admin : 
- admins are Partner Portal-specific users that can create, edit, and delete any cardholder within the specified Financial Institution. 

#### cardholder_sso_agent :
- create cardholders
- create cards/addresses for those cardholders
- create accounts for those cardholders
- post jobs for those cardholders
- poll jobs for messages and respond to them on behalf of cardholders they created.

#### cardholder_agent :
- create cardholders
- create cards/addresses for those cardholders
- create accounts for those cardholders
- post jobs for those cardholders
- poll jobs for messages and respond to them on behalf of cardholders they created.

#### customer_agent :
- customer_agents have the same capabilities as cardholder_agents, but they can act on any cardholder within their FI (unless they are assigned to all FIs via the "All FIs" checkbox, in which case they can act on any cardholder).

### Editing Your Info and Resetting Your Password
To edit your user information, including your role and FI, click on your username in the top right corner and select Edit My User Info.
You can change your password here, as well. Passwords must conform to the password requirements.

### Delete User
To delete a user, click the trash can next to the user you would like to delete.



## Integrators
The Integrators tab shows all integrators within the CardSavr instance (if logged in as an admin). Admin users may add, edit or delete integrators.

### Add/Edit Integrator

When you create an integrator, the intgrator key will automatically be generated. The full key can be accessed by clicking on the edit button of the integrator once it has been created.

To edit an integrator, click the pencil icon beside the integrator you wish to edit.

### Name
The name of the integrator (e.g. "acme_integrator").

### Type

application : For use with Strivve applications.

### Delete Integrator
To delete an integrator, click the trash can next to the integrator you would like to delete.


## Card Links
The **Card Links** interface allows users to upload CSV files containing cardholder, card, and address information. This process generates card entities in the system and provides unique card links for each cardholder. These links direct the cardholder to the Card Links journey.

---

### How It Works

1. **Select Financial Institution** (if admin):
   If you are logged in under the admin FI, you must select the financial institution for which you will be creating card links.

2. **Get Template**:
   A template CSV file containing the required header row properties can be downloaded by clicking the "Download CSV Template" button.

3. **Create a CSV file**:
   Using the CSV template as a guide, fill the CSV with cardholder, card, and address information. 

4. **Encrypting the CSV file**:
   Partner portal supports PGP encryption. If a button to generate a PGP key is shown, use that to generate a PGP key pair. 
   The generate public key will appear that could be copied to encrypt the CSV file to be uploaded. 
   If a public key is already being shown, then simply copy it and encrypt the CSV file to be uploaded.
   If encryption is not enabled for the financial institution, then the PGP key or the button to generate will not be shown.

5. **Upload CSV File**:
   Click "Browse files to upload" and select your CSV file. Press the "Upload" button to start the upload.

6. **Download**:
   Your file will be processed and a new CSV will be generated, with each row containing the newly created `card_id`, card link URL, and the expiration date of the card link. 
   A dialog box with a link for downloading will appear when the CSV is ready.

7. **Download Previously Generated Card Link CSVs**:
   A list of previously generated card link CSVs appears under "Available Downloads." Click the green download icon next to the file name to download it again.

---

### CSV Format

#### Notes

* The header row must match exactly.
* CVVs must be hashed and Base64 encoded before uploading.

Each CSV must contain the following headers:

| Field Name                          | Required | Description                                                                                                                                                                                          |
| ------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cardholder.cuid`                   | No       | Unique identifier for the cardholder (CUID)                                                                                                                                                          |
| `cardsavr_card.pan`                 | Yes      | Primary Account Number (the card number)                                                                                                                                                             |
| `cardsavr_card.expiration_year`     | Yes      | Card expiration year (last two digits, e.g., 29 = 2029)                                                                                                                                              |
| `cardsavr_card.expiration_month`    | Yes      | Card expiration month (1–12)                                                                                                                                                                         |
| `cardsavr_card.name_on_card`        | No       | Full name as it appears on the card                                                                                                                                                                  |
| `cardsavr_card.cvv_hash`            | No       | A hashed CVV may be provided in place of the raw CVV. This must be a SHA-256 hash with Base64 encoding of the CVV. A sample JavaScript function for generating the hash is provided below this table |
| `cardsavr_card.cvv`                 | No       | Plain text CVV. Passing a CVV is optional if the Issuer does not have access to this information.                                                                                                    |
| `cardsavr_card.customer_key`        | No       | Optional external reference for identifying the card. If not provided, one will be generated                                                                                                         |
| `cardsavr_card.nickname`            | No       | Nickname for the card (e.g., "Primary Card")                                                                                                                                                         |
| `cardsavr_card.address.address1`    | Yes      | Street address line 1                                                                                                                                                                                |
| `cardsavr_card.address.address2`    | No       | Street address line 2 (optional)                                                                                                                                                                     |
| `cardsavr_card.address.city`        | Yes      | City                                                                                                                                                                                                 |
| `cardsavr_card.address.subnational` | Yes      | State, province, or region                                                                                                                                                                           |
| `cardsavr_card.address.country`     | Yes      | Country ("usa", "USA", "us", "US", "canada", "Canada", "ca", "CA")                                                                                                                                   |
| `cardsavr_card.address.postal_code` | Yes      | Postal or ZIP code                                                                                                                                                                                   |
| `cardsavr_card.address.email`       | No       | Email address of the cardholder                                                                                                                                                                      |
| `cardsavr_card.address.phone_number` | No       | Phone number                                                                                                                                                                                        |
| `cardsavr_card.address.first_name`  | Yes      | Cardholder's first name                                                                                                                                                                              |
| `cardsavr_card.address.last_name`   | Yes      | Cardholder's last name                                                                                                                                                                               |
| `cardsavr_card.address.is_primary`  | Yes      | Whether this address is the primary address for the cardholder (`TRUE` or `FALSE`)                                                                                                                   |

---

### CVV hash generation function (javascript)

```javascript
const generate_b64_hash_from_string = function (string) {
    const hash = crypto.createHash("sha256");
    hash.update(string);
    const binary_hash = hash.digest();

    return binary_hash.toString("base64");
};
```

---

### Example CSV Content

Here is an example of what a single row might look like in the required CSV format:

| cardholder.cuid | cardsavr\_card.pan | cardsavr\_card.expiration\_year | cardsavr\_card.expiration\_month | cardsavr\_card.name\_on\_card | cardsavr\_card.cvv\_hash                     | cardsavr\_card.cvv | cardsavr\_card.customer\_key | cardsavr\_card.nickname | cardsavr\_card.address.address1 | cardsavr\_card.address.address2 | cardsavr\_card.address.city | cardsavr\_card.address.subnational | cardsavr\_card.address.country | cardsavr\_card.address.postal\_code | cardsavr\_card.address.email                        | cardsavr\_card.address.phone\_number | cardsavr\_card.address.first\_name | cardsavr\_card.address.last\_name | cardsavr\_card.address.is\_primary |
| --------------- | ------------------ | ------------------------------- | -------------------------------- | ----------------------------- | -------------------------------------------- | ------------------ | ---------------------------- | ----------------------- | ------------------------------- | ------------------------------- | --------------------------- | ---------------------------------- | ------------------------------ | ----------------------------------- | --------------------------------------------------- | ------------------------------------ | ---------------------------------- | --------------------------------- | ---------------------------------- |
| Gigi6cf4dbkaax  | 1234123412341234   | 29                              | 11                               | Lewis Carroll                 | K+z7nM1/1sQbCkmn6D2AcrSu3cTHkP9r+ImhQ1ob6EM= |                    | KEY\_nl05pta                 | Primary Card            | 978 Tweedledum Street           |                                 | Wonderland                  | WA                                 | USA                            | 98177                               | [alice@wonderland.com](mailto:alice@wonderland.com) | 555-555-5555                         | Lewis                              | Carroll                           | TRUE                               |
