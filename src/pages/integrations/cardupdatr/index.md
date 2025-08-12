---
title: CardUpdatr
---

## Overview

CardUpdatr is a web drop-in component that handles the end to end experience of updating any card where cardholders shop and make payments online - keeping your card Top of Wallet®. CardUpdatr has a responsive design from which it can be leveraged in both Mobile Web and Desktop Web applications. There are several methods from which CardUpdatr can be integrated into your application which is covered in this section.

{% video url="/videos/cardupdatr-sso-animation.mp4" /%}

CardUpdatr SSO (Single-sign On) is the recommended implementation to avoid collecting card data from the cardholder.  All implementations can leverage SSO by first running the cardholder through an [SSO Microservice](/integrations/sso-microservice), obtaining a grant and card_id, and paassing them into the CardUpdatr configuration.

## CardUpdatr Integration Techniques

CardUpdatr supports mutliple techniques from which you can easily integrate it into your application. Most integration techniques require the cardupdatr-client-v2.js boostrap library which make the integrations seamless.

### Overlay Embedding

CardUpdatr can be implemented as an overlay modal that appears on top of an existing page. The overlay is embedded into the body of the DOM, and this overlay can be closed at any time during the journey.  The primary advantage of this setup is a consistency between both mobile and desktop.

Below is an example of the mobile CardUpdatr journey using the overlay technique:

![CardUpdatr ACME 1](/images/CardUpdatr_ACME_1.png)
![CardUpdatr ACME 2](/images/CardUpdatr_ACME_2.png)

Here is an example of the desktop experience.

![CardUpdatr Overlay](/images/cardupdatr_overlay.png)

In order to implement the CardUpdatr overlay, use the embedCardUpdatr function and include “overlay”: true, in the [Config Object](#config-object).

The overlay can be closed using the X button in the top right corner, or using the "Close" button at the end of the journey.  Note that there is explicitly no app_container_id assigned on the config object.

The color and opacity of the overlay background can be adjusted by using the “overlay_background” property in the [Style Object](#style-object).

```javascript
  window.embedCardUpdatr {
      config : {
        "show_close_overlay_button" : false,
        "overlay" : true,
        "hostname" : "testfi.test.cardupdatr.app",
      },
      user : {
        "grant": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9ey...",
        "card_id" : 12
      }, 
      style : {
        "overlay_background_color" : "rgba(0,0,0,0.2)"
      }
  }
 ```

### Inline Embedding 

CardUpdatr can also be embedded inline in a webpage or webview.  The behavior is similar to the overlay, but the frame scrolls with the rest of the viewport as opposed to taking over the entire screen.  

Like the overlay, Embedded CardUpdatr is inserted as an iframe.  Simply create a containing div in your document, and the Strivve bootstrap library will attach CardUpdatr to it.  The containing div should not have a defined height, as CardUpdatr attempts to leverage almost the entire viewport. CardUpdatr has a handful of width breakpoints:

1. 540px is the maximum width for mobile view - also a reasonable width for desktop
1. 270px is the minimum width in order to maintain three columns of tiles

CardUpdatr will use 99.5% of the entire vertical viewport

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

The launch option is used to launch CardUpdatr in a new or existing window with the provided CardUpdatr URL. The launchCardUpdatr function is a wrapper around the [window.open function](https://www.w3schools.com/jsref/met_win_open.asp). 

launchCardUpdatr takes the following parameters:
* **settings**:  Object containing the config, user, and style objects
* **name**:  [See w3 definition](https://www.w3schools.com/jsref/met_win_open.asp)
* **specs**: [See w3 definition](https://www.w3schools.com/jsref/met_win_open.asp)

```
        <a onClick='javascript:window.launchCardUpdatr({config: { hostname: "acmebank.customer-dev.cardupdatr.app" }, style: { button_color: "red"}})'>
          Launch cardupdatr
        </a>
```
### Launch CardUpdatr via URL

There may be cases where native applications do not have the ability to use javascript.  This requires that the application append the configuration json to the hash value of the CardUpdatr url.  Note that the setting must be url encoded (no ?'s, &'s, +'s or newlines). This can be accomplished in JavaScript using the encodeURIComponent function.

```javascript
https://CARDUPDATR_HOSTNAME.cardupdatr.app/#settings=ENDCODED_SETTINGS_JSON
```

"ENCODED\_SETTINGS\_JSON" is simply the same json object passed in as the first parameter to launchCardUpdatr and embedCardUpdatr, only it must be url encoded.

## CardUpdatr Single-Sign On

{% video url="/videos/cardupdatr-sso-animation.mp4" /%}

As mentioned above, leveraging an [SSO Microservice](/integrations/sso-microservice) to collect card and billing address data creates a much better experience for your cardholders.

When running SSO, the cardholder credentials (grant and card id) can be generated and passed into the CardUpdatr component using any of the above techniques.

## CardUpdatr Configuration

There are three configuration objects that can be used to customize your CardUpdatr experience. The "user" object is for customer-specific data required to authenticate SSO users and also to provide customer-specific logging. The "config" object (some settings required) configures the FI for which CardUpdatr should run and how sites should be included and sorted. "style" is used to dynamically configure messages, colors and background images.

Please see the [CardUpdatr Integration Techniques](/integrations/cardupdatr#card-updatr-integration-techniques) for reference.

CardUpdatr may also be configured statically in the [Partner Portal](/ops-admin/partner-portal/), but these settings would be overridden by dynamic properties provided while embedding or launching. For more details, please contact [E-mail Strivve](mailto:support@strivve.com).

### Config Object

```javascript
{
  config : {
    app_container_id: "APP_CONTAINER_ID",
    hostname: "CARDUPDATR_HOSTNAME",
    top_sites: ["amazon.com", "apple.com", "audible.com", "hulu.com", "netflix.com", "spotify.com", "target.com", "uber.com", "venmo.com", "walgreens.com", "walmart.com"],
    merchant_site_tags: ["usa,canada", "prod"]
  },
```

| Property              | Required | Default                             | Description                                                                                                                         |
| ------------------------- | -------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| app_container_id          | no      |                                     | HTML element id that CardUpdatr is attached to -- this is only required when running embedded.                                                                                      |
| hostname                  | yes      |                                     | Hostname of the target FI (e.g. acmebank.customer-dev.cardupdatr.app).  In the case of SSO, this hostname must match the FI hostname used to aquire the grant.                                                                  |
| top_sites                 | no       | []                                  | These sites are listed first on the "select-merchants" page        
| exclude_sites             | no       | []                                  | These sites are excluded from the "select-merchants" page                                                                         |
| merchant_site_tags        | no       | ["usa", "prod"]                     | usa AND prod -- to provide "OR" functionality, tags must be listed differently. "prod", "canada,usa" means prod AND (usa OR canada) |
| overlay                   | no       | false                             | Set to true to turn on overlay
| close_url                 | no       | See Description                     | close_url can either be "none" (hidden), "close" (applicable with the overlay), or a relative/absolute url that defines the start of the journey.  The various configuration permutations lead to various defaults. Will default to "close" if running as a non-embedded SSO user.  Otherwise, defaults to "/select-merchants".  This option determines the on-click action of the "Close" button (or "Done" in certain cases) that appears on the final page after all jobs have linked the account.  If set to a custom URL, clicking the Close button will navigate to the URL.  If set to "/select-merchants", the user will be logged out and taken back to the site selection page with a new session.  If set to "none", the Close button will not appear on the page. If set to "close" (for embedded), the window will simply be closed. |

### User Object

The user properties are unique to this partiular cardholder, and generally provide login and other customer specific properties necessary to assume a session.

```javascript
  user : {
    grant: "redacted",
    card_id: "redacted",
    custom_data: {
      SCOPE: { //customer defined SCOPE is optional, but recommended to avoid collisions
        CUSTOMER_KEY: "000000000000"
    },
    source: {
      type: "text_message" | "email" | "promo" | "navigation" | "alert" | "test" | "weblink",
      category: "card_controls" | "activation" | "campaign" | "other",
      sub_category: "customer defined", //optional
      device: "desktop web" | "mobile web" | "mobile app"
    }
  },

```

| Property       | Required | Default           | Description                                                                                             |
| -------------- | -------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| grant          | no       |                   | Also returned by CardSavr and required for SSO                                                          |
| card_id        | no       | user's first card | When using SSO, this is the card_id to be used for this session                                         |
| custom_data    | no       |                   | Data that identifies this cardholder/session. It is posted via webhooks when the session is terminated. |
| source         | no       |                   | See [Cardholder Journey Paths](/integrations/sources)                                                   |

### Style Object

Style attributes control the look and feel of the experience. They can optionally be configured in the Partner Portal, but dynamic flexibilty is sometimes preferred if running multiple brands under the same Financial Institution.

```javascript
  style : {
    card_description: "ACME Bank Debit Card"
    //By default, a message that will be appended and link to the select-merchants page: "Add your $card_description to more sites"
    link_color: "#5e35b1",
    button_color: "#5e35b1",
    button_border_radius: "0.25rem",
    button_padding: "0.375rem 0.75rem",
    border_color: "#5e35b1",
  },
```

| Property            | Required | Default                   | Description                                                                                                               |
| ------------------- | -------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| card_description    | no       | Set in the Partner Portal | included in the copy                                                                                                      |
| button_color        | no       | #000000                   | color of buttons (can also be configured in Partner Portal)                                                               |
| button_border_radius        | no       | 0.25rem                   | radius of button corners (can also be configured in Partner Portal)                                                               |
| button_padding        | no       | 0.375 0.75rem,                  | controls space inside buttons (can also be configured in Partner Portal)                                                               |
| border_color        | no       | #000000                   | color of merchant tile border when selected (can also be configured in Partner Portal)                                                           |
| overlay_background_color | no  | rgba(0,0,0,.5)       | The color and opacity of the background.  Defaults to black with 0.5 opacity. 


