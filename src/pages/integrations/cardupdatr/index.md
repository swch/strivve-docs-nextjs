---
title: CardUpdatr
---

## Overview

CardUpdatr is a web drop-in component that handles the end to end experience of updating any card where cardholders shop and make payments online - keeping your card Top of Wallet®. CardUpdatr has a responsive design from which it can be leveraged in both Mobile Web and Desktop Web applications. There are several methods from which CardUpdatr can be integrated into your application which is covered in this section.

{% video url="https://www.youtube.com/embed/AZAmT9hq-XE?autoplay=1&enablejsapi=1&wmode=opaque" /%}

## CardUpdatr Integration Techniques

CardUpdatr supports mutliple techniques from which you can easily integrate it into your application. 

Below is an example of the CardUpdatr journey to place cards to your top sites:

![CardUpdatr ACME 1](/images/CardUpdatr_ACME_1.png)
![CardUpdatr ACME 2](/images/CardUpdatr_ACME_2.png)

### Overlay Embedded

CardUpdatr can be implemented as an overlay modal that appears on top of an existing page.  In this case, CardUpdatr is inserted into the modal as an embedded iframe.

![CardUpdatr Overlay](/images/cardupdatr_overlay.png)

In order to implement the CardUpdatr overlay, use the embedCardUpdatr function and include “overlay”: “true”, in the [Config Object](#config-object).

By default, the overlay can be closed using the X button in the top right corner. To hide the X button, add  “show: false”, to the config.

The color and opacity of the overlay background can be adjusted by using the “overlay_background” property in the [Style Object](#style-object).

The retrieval of the grant and card_id in the example below is provided by the [SSO Microservice](/integrations/sso-microservice).

```javascript
  window.embedCardUpdatr {
      config : {
        "show_close_overlay_button" : false,
        "overlay" : "true",
        "app_container_id" : "container",
        "hostname" : "test.cardupdatr.app",
        "financial_institution" : "testif"
      },
      user : {
        "grant": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9ey",
        "card_id" : 12
      }, 
      style : {
        "overlay_background_color" : "rbga(0,0,0,0.2)"
      }
  }
 ```

### Inline Embedding 

CardUpdatr can also be embedded inline in a webpage or webview, allowing it to fit seamlessly into your application or browser experience.  

Inline embedded CardUpdatr is inserted as an iframe, and the boostrap library makes the insertion seamless.  Use the code below in your page to host the CardUpdatr within an iframe.  You must create a div that has the correct height, and then pass the id of the div into the embedCardUpdatr function. 


```javascript
    <div class="container" style="background-color: deepskyblue; width: 100%; text-align: center; min-height: 100vh;">
    <!-- This script loads in from a .cardupdatr.app domain. -->
    <script src="https://CARDUPDATR_HOSTNAME.cardupdatr.app/cardupdatr-client-v2.js"></script>
    <!-- Empty div to initialize the iFrame which loads CardUpdatr. -->
    <div class="cardupdatr-frame" id="cardupdatr-frame"></div>
    </div>
    <script>
      window.embedCardUpdatr(settings = { 
        config: { 
          app_container_id: "cardupdatr-frame", 
          hostname: "https://CARDUPDATR_HOSTNAME.cardupdatr.app/" 
        } 
      });
</script>
```

### Launch CardUpdatr

The launch option is used to navigate a new or existing window to the provided CardUpdatr URL. The launchCardUpdatr function is a wrapper around the [window.open function](https://www.w3schools.com/jsref/met_win_open.asp). 

launchCardUpdatr takes the following parameters:
* **settings**:  Object containing the config, user, and style objects
* **name**:  [See w3 definition](https://www.w3schools.com/jsref/met_win_open.asp)
* **specs**: [See w3 definition](https://www.w3schools.com/jsref/met_win_open.asp)

```javascript
window.launchCardUpdatr = function (settings, name = "_blank", specs = undefined) {
  window.open(
    get_app_source(settings.config.hostname, settings.config.financial_institution) + "#settings=" + encodeURIComponent(JSON.stringify(settings)), 
    name, 
    specs
  );
}
```

### Launch CardUpdatr via URL

There are cases to be considered when native applications do not have access to a DOM.  There are simple mechanisms for launching webviews within applications, and this can include using native parameters to control the containing child window.  This is not difficult, but it does require the application to assemble the url itself.  Note that the setting must be url encoded (no ?'s, &'s, +'s or newlines). This can be accomplished in JavaScript using the encodeURIComponent function.

```javascript
https://CARDUPDATR_HOSTNAME.cardupdatr.app/#settings=ENDCODED_SETTINGS_JSON
```

"ENCODED\_SETTINGS\_JSON" is simply the same json object passed in as the first parameter to launchCardUpdatr and embedCardUpdatr, only it must be url encoded.

## CardUpdatr Single-Sign On

{% video url="/videos/cardupdatr-sso-animation.mp4" /%}

CardUpdatr is a simple way for cardholders to select the merchants they'd like to update, and then monitor the jobs as they progress. The challenge with CardUpdatr is there is a significant barrier where the cardholder must enter their entire credit card, address, and contact info.  Many financial institutions would prefer a CardSavr integration that streamlines this process, but may not want to invest the initial effort to build a user interface.

In this case, the integrator will want to implment the [SSO Microservice](/integrations/sso-microservice) from which the cardholder credentials (grant and card id) can be retrieved and passed into the CardUpdatr component.

### Handing off Credentials to CardUpdatr

Once your application has the necessary information from the SSO microservice, the application can hand off the credentials to CardUpdatr.  There are two ways to accomplish this: redirection or via the CardUpdatr configuration objects.

## CardUpdatr Configuration

There are three configuration objects can be used to customize your CardUpdatr experience. The "user" object is for customer-specific data required to authenticate SSO users and also to provide customer-specific logging. The "config" object (some settings required) configures the FI for which CardUpdatr should run, how sites should be sorted, and which countries should be supported. "style_template" is used to dynamically configure messages, colors and background images.

Please see the [CardUpdatr Integration Techniques](/integrations/cardupdatr#card-updatr-integration-techniques) for reference.

CardUpdatr may also be configured statically in the [Partner Portal](/ops-admin/partner-portal/). For more details, please contact [E-mail Strivve](mailto:support@strivve.com).

### Config Object

```javascript
{
  config : {
    app_container_id: "APP_CONTAINER_ID",
    hostname: "CARDUPDATR_HOSTNAME",
    financial_institution: "acmecu",
    top_sites: ["amazon.com", "apple.com", "audible.com", "hulu.com", "netflix.com", "spotify.com", "target.com", "uber.com", "venmo.com", "walgreens.com", "walmart.com"],
    merchant_site_tags: ["usa,canada", "prod"],
    countries_supported: ["Canada", "USA"],
  },
```

| Property              | Required | Default                             | Description                                                                                                                         |
| ------------------------- | -------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| app_container_id          | yes      |                                     | HTML element id that CardUpdatr is attached to                                                                                      |
| hostname                  | yes      |                                     | hostname of CardUpdatr (e.g. acmebank.customer-dev.cardupdatr.app)                                                                  |
| financial_institution     | no       | first element of host, or "default" | Override the value in the hostname (recommended for embedded)                                                                       |
| top_sites                 | no       | []                                  | These sites are listed first on the "select-merchants" page                                                                         |
| merchant_site_tags        | no       | ["usa", "prod"]                     | usa AND prod -- to provide "OR" functionality, tags must be listed differently. "prod", "canada,usa" means prod AND (usa OR canada) |
| countries_supported       | no       | ["USA"]                             | Populated in the country field of the address - if only one country, the country is assumed                                         |
| overlay                   | no       | "false"                             | Set to "true" to turn on overlay
| show_close_overlay_button | no       | "true"                              | Set to "false" to remove the close button on the overlay in the top right corner
| more_sites_url            | no       | "/select-merchants"                 | Required if using site selection outside of CardUpdatr; otherwise, defaults to "/select-merchants".  This option determines the on-click action of the "More Sites" button that appears on the final page after all jobs have linked the account.  If set to a custom URL, clicking the More Sites button will navigate to the URL.  If set to "/select-merchants", the user will be taken back to the site selection page.  If set to "/#none", the More Sites button will not appear on the page.  If set to "close", the window will be closed. |
| close_url                 | no       | See Description                     | Required if running as an embedded SSO user. Will default to "/#close" if running as a non-embedded SSO user.  Otherwise, defaults to "/select-merchants".  This option determines the on-click action of the "Close" button (or "Done" in certain cases) that appears on the final page after all jobs have linked the account.  If set to a custom URL, clicking the Close button will navigate to the URL.  If set to "/select-merchants", the user will be logged out and taken back to the site selection page with a new session.  If set to "none", the Close button will not appear on the page. If set to "/#close", the window will be closed. |

### User Object

The user properties are unique to this partiular cardholder, and generally provide login and other customer specific properties necessary to assume a session.

```javascript
  },
  user : {
    grant: "redacted",
    card_id: "redacted",
    selected_sites: "12,14,15",
    custom_data: {
      SCOPE: { //customer defined SCOPE is optional, but recommended to avoid collisions
        CUSTOMER_KEY: "000000000000"
      }
    }
  },
```

| Property       | Required | Default           | Description                                                                                             |
| -------------- | -------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| username       | no       |                   | When using SSO, this value is generated by CardSavr and required to continue the session                |
| grant          | no       |                   | Also returned by CardSavr and required for SSO                                                          |
| card_id        | no       | user's first card | When using SSO, this is the card_id to be used for this session                                         |
| selected_sites | no       |                   | Pre-selected site ids collected from the user using a non-CardUpdatr component                          |
| custom_data    | no       |                   | Data that identifies this cardholder/session. It is posted via webhooks when the session is terminated. |

### Style Object

Style attributes can be dynamically configured with CardUpdatr's cardupdatr-client-v2.js. They can optionally be configured in the Partner Portal, but dynamic flexibilty is sometimes preferred if running multiple brands under the same Financial Institution.

```javascript
  },
  style : {
    name: "ACME Bank",
    page_title: "Update your card!",
    card_description: "ACME Bank Debit Card"
    //By default, a message that will be appended and link to the select-merchants page: "Add your $card_description to more sites"
    final_message: "Thank you for updating your card, no further action is needed. Sites may notify you that your payment ",
    invalid_session_url: "URL",
    link_color: "#5e35b1",
    button_color: "#5e35b1",
    button_border_radius: "0.25rem",
    button_padding: "0.375rem 0.75rem",
    border_color: "#5e35b1",
    drop_shadow: false,
    dynamic_height: true
  },
```

| Property            | Required | Default                   | Description                                                                                                               |
| ------------------- | -------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| name                | no       | The FI name               | The name of the issuer                                                                                                    |
| page_title          | no       | The FI name               | The title of the page                                                                                                     |
| card_description    | no       | Set in the Partner Portal | included in the copy                                                                                                      |
| final_message       | no       | Set in the Partner Portal | A thank you message that appears after all accounts are linked                                                            |
| invalid_session_url | no       | select-merchants          | Once a session ends, the user can be directed to a new page to re-authenticate                                            |
| link_color          | no       | #000000                   | color of links (can also be configured in Partner Portal)                                                                 |
| button_color        | no       | #000000                   | color of buttons (can also be configured in Partner Portal)                                                               |
| button_border_radius        | no       | 0.25rem                   | radius of button corners (can also be configured in Partner Portal)                                                               |
| button_padding        | no       | 0.375 0.75rem,                  | controls space inside buttons (can also be configured in Partner Portal)                                                               |
| border_color        | no       | #000000                   | color of merchant tile border when selected (can also be configured in Partner Portal)                                                           |
| drop_shadow         | no       | true                      | draws a dropshadow around the visible area                                                                                |
| dynamic_height      | no       | false                     | creates a fixed height on the credit card form and the merchant credential page - this breaks the sticky notification box |
| overlay_background_color | no  | rgba(0,0,0,.5)       | The color and opacity of the background.  Defaults to black with 0.5 opacity. 

## Redirection 

By supplying the parameters in the hash value of the url, CardUpdatr will automatically log in as the cardholder, and the cardholder can then select their merchants and corresponding credentials.  This should only be done when the bootstrap configuration options are not available.

```
https://CARDUPDATR_HOSTNAME.cardupdatr.app/#settings=ENDCODED_SETTINGS_JSON
```

"ENCODED\_SETTINGS\_JSON" is simply the same json object passed in as the first parameter to launchCardUpdatr and embedCardUpdatr, only it must be url encoded.  The settings, which should not contain any spaces or escape characters before encoding, needs to at least include the user object from which the grant and card_id are specified:  

```javascript
{
  "user": {
    "grant": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuY3VzdG9tZXItZGV2LmNh.......\",
    "card_id": 11033
  }
}
```


If you have any questions regarding this content, please [Contact Us](mailto:support@strivve.com).
