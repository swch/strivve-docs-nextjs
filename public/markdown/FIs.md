## Financial Institution
The Financial Institution tab shows all FIs within the CardSavr instance (if logged in as an admin), as well as all notifications for that FI. Admin users may add, edit or delete financial institutions, as well as add, edit, and delete notifications for FIs.

##### Add/Edit Financial Institution

To edit an FI, click the pencil icon beside the FI you wish to edit.

###### Name
The name of the financial institution (e.g. "Acme Bank").

###### Lookup Key
Unique key used to identify financial institution within the CardSavr API, such as in request headers (e.g. "acme_bank").

###### Alternate Lookup Key
Alternate lookup key; can be used in case of FI name change that does not match original lookup_key, in order to maintain backwards compatibility.

###### Branding
The branding field allows for customization of branding properties in CardUpdatr. This field takes a valid JSON branding object, which must have both config and style_template properties:
{"config": {},"style_template": {}}. Note: when editing a branding object, click the Format JSON button to format object spacing. This button also verifies if JSON is valid.  You will also notice that any properties passed dyanmicallyy via embed/launch CardUpdatr will override properties set in the Partner Portal.

The following properties are allowed within each of the two primary properties (nested properties are defined in separate tables):
#### config:

| Property                    | Type                          |  Description                                            
| :-------------------------- | :---------------------------- | :-----------------------------------------------  
| disable_brand               | boolean                       | If true, disables CardUpdatr for this FI.                                                    
| top_sites                   | array of strings              | Hostnames of sites to appear at the top of the site tiles selection page.                    
| exclude_sites               | array of strings              | Hostnames of sites to be excluded from CardUpdatr site selection.                            
| frame_ancestors             | object                        | Defines the frame ancestors for embeddable CardUpdatr. Takes a "host" and "value" property, with the host being the CardUpdatr URL and the value being the URL of the page embedding CardUpdatr.
| merchant_site_tags          | array of strings              | Defines the type of sites that appear in CardUpdatr. Options are: **prod** (these sites are reliable for a production environment), **usa** (for American sites), **canada** (for Canadian sites), **synthetic** (fake sites used for testing purposes; they simulate real merchant sites)               
| close_url                   | string                        | Required if running as an embedded SSO user. Will default to "close" if running as a non-embedded SSO user. Otherwise, defaults to "/select-merchants". This option determines the on-click action of the "Close" button that appears on the final page after all jobs have finished. If set to a custom URL, clicking the Close button will navigate to the URL. If set to "/select-merchants", the user will be logged out and taken back to the site selection page with a new session. If set to "none", the Close button will not appear on the page. If set to "close", the window will be closed.                                                              

##### nested config properties: 
###### config.email:
The following properties customize the status update email sent to CardUpdatr users (if this notification has been created):

| Property              | Type                        | Description                                                                                                   
| :-------------------- | :-------------------------- | :--------------------------------------------------------------------------------------------------------------- 
| footer_link_1         | object                      | Object with "text" (i.e. display text) and "url" properties. This defines a link that will appear on the left of the email footer.
| footer_link_2         | object                      | Object with "text" (i.e. display text) and "url" properties. This defines a link that will appear on the right of the email footer.
| sender_email_address  | string                      | Sender email address for status update notification email.
| footer_address        | string                      | Mailing address to appear at the bottom of the email.
| card_description      | string                      | Description of card that will appear in the email text.

#### style_template:

| Property                        | Type                        | Description                                                                                                      
| :------------------------------ | :-------------------------- | :---------------------------------------------------------------------------------------------------------------- 
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
***  

##### Delete Financial Institution
To delete an FI, click the trash can next to the FI you would like to delete.

##### Add/Edit Notifications
Notifications are triggered by certain key events, such as the completion of a session in CardUpdatr. 

###### Name
Name of the notification (e.g. "CardUpdatr Session End Email").

###### Type

- email : Sends an email notification to the provided recipient when the specified event occurs. </li>
- webhook : Posts to the provided webhook when the specified event occurs. </li>

###### Event

- session_complete : sends notification when the CardUpdatr session has completed. </li>
- webhook_error_summary (email type only) : sends summary of 400 and 500 errors returned when posting any existing webhook notifications. A new summary is sent once per specified interval. </li>
- merchant_site_updates_top (email type only) : sends summary of changes in status to merchant sites that have the "top_notify" tag. Status changes include a site going live or being taken down.</li>
- merchant_site_updates_all (email type only) : sends summary of changes in status to merchant sites. Status changes include a site going live or being taken down.</li>

###### URL (webhook notifications)
URL of the webhook where you wish to receive the event notification.

###### Recipient (email notifications)
Specify the email address where you wish to send the notification. For session_complete email notifications, the recipient can also be the cardholder on the session.

###### HTML and Text Templates (email notifications)
You can override the default HTML and text email templates by pasting your custom templates here. The text email is sent 

###### Interval Type and Interval Length (webhook_error_summary notifications only)
Defines the interval at which the notification is sent (e.g. 1 hour would send an hourly notification).

##### Delete Notification
To delete a notification, click the trash can next to the notification you would like to delete.

## BINs
To view, create, edit, and delete the BINs associated with an FI, click the blue BINs button next to that FI.

##### Add/Edit BIN

To edit a BIN, click the pencil icon beside the BIN you wish to edit.

###### Bank Identification Number
Bank identification number.

###### Custom Data
Custom data (e.g. brand, type) that can be added according to FI need.

###### Delete Bin
To delete a BIN, click the trash can next to the BIN you would like to delete.

