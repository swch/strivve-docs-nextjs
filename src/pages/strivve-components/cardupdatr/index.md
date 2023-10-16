---
title: CardUpdatr
---

## Overview

CardUpdatr is a web drop-in component that handles the end to end experience of updating any card where cardholders shop and make payments online - keeping your card Top of Wallet®. CardUpdatr has a responsive design from which it can be leveraged in both Mobile Web and Desktop Web applications. There are several methods from which CardUpdatr can be integrated into your application which is covered in this section.

{% video url="https://www.youtube.com/embed/AZAmT9hq-XE?autoplay=1&enablejsapi=1&wmode=opaque" /%}

## CardUpdatr Integration Techniques

CardUpdatr supports embedding and launching techniques from which you can easily integrate it into your application. 

Below is an example of the CardUpdatr journey to place cards to your top sites:

![CardUpdatr ACME 1](/images/CardUpdatr_ACME_1.png)
![CardUpdatr ACME 2](/images/CardUpdatr_ACME_2.png)

### Embedding 

Embedding CardUpdatr in a webpage or webview can fit seamlessly into your application or browser experience.  

In this case CardUpdatr is inserted as an iframe, and the boostrap library makes the insertion seamless.  Use the code below in your page to host the CardUpdatr within an iframe.  You must create a div that has the correct height, and then pass the id of the div into the embedCardupdatr function. 


```javascript
    <div class="container" style="background-color: deepskyblue; width: 100%; text-align: center; min-height: 100vh;">
    <!-- This script loads in from a .cardupdatr.app domain. -->
    <script src="https://CARDUPDATR_HOSTNAME.cardupdatr.app/cardupdatr-client-v2.js"></script>
    <!-- Empty div to initialize the iFrame which loads CardUpdatr. -->
    <div class="cardupdatr-frame" id="cardupdatr-frame"></div>
    </div>
    <script>
      window.embedCardupdatr(settings = { 
        config: { 
          app_container_id: "cardupdatr-frame", 
          hostname: "https://CARDUPDATR_HOSTNAME.cardupdatr.app/" 
        } 
      });
</script>
```

### Constructing a URL

There are cases to be considered when native applications do not have access to a DOM.  There are simple mechanisms for launching webviews within applications, and this can include using native parameters to control the containing child window.  This is not difficult, but it does require the application to assemble the url itself.

```
https://CARDUPDATR_HOSTNAME.cardupdatr.app/#settings={ ENDCODED\_SETTINGS\_JSON }
```

"ENCODED\_SETTINGS\_JSON" is simply the same json object passed in as the first parameter to launchCardUpdatr and embedCardUpdatr, only it must be url encoded.


## CardUpdatr Single-Sign On

{% video url="/videos/cardupdatr-sso-animation.mp4" /%}

CardUpdatr is a simple way for cardholders to select the merchants they'd like to update, and then monitor the jobs as they progress. The challenge with CardUpdatr is there is a significant barrier where the cardholder must enter their entire credit card form, address, and contact info.  Many financial institutions would prefer a CardSavr integration to streamline this process, but may not want to invest the initial effort to build a user interface.

With CardUpdatr SSO, you can make some simple API calls to set up the cardholder, and then hand over a token to CardUpdatr to handle the user interaction using CardUpdatr.

### Server Component

A server component is required to create the cardholder, card and address.  There are three SDKs that support this functionality.  Java, Node and C#.  The javascript library can also be used within a client to create the user.

The data format for the data objects can be found on the (API/SDK reference guide)[https://swch.github.io/slate]. 

### Node

The [strivve-sdk github repository](https://github.com/swch/strivve-sdk) has instructions for setup and execution. There is a CardsavrHelper class that makes creating the token extremely simple:

```javascript
const { CardsavrHelper } = require("@strivve/strivve-sdk/lib/cardsavr/CardsavrHelper");

try {
    const ch = CardsavrHelper.getInstance();
    const financial_institution = "default"; //all cardsavr instances come with a "default" fi
    //Setup the settings for the application
    ch.setAppSettings(cardsavr_server, app_name, app_key); 
    //Create a session for the application user (cardholder agent)
    if (await ch.loginAndCreateSession(app_username, app_password)) {
        //Save the card on a behalf of a temporary cardholder - return their username, grant, card par
        const data = await ch.createCard(app_username, 
                                         financial_institution, 
                                         cardholder_data, 
                                         address_data, 
                                         card_data);
        const handoff = { grant : data.grant, 
                          username : data.cardholder.username, 
                          card_id : data.card.id };
    }
} catch (err) {
    console.log(err);
}
 
```

Every cardsavr app requires a Cardsavr server and an integrator name and key.  You will also need an app username and password that the application uses to log onto the cardsavr platform using the integrator key to encrypt its payloads.  

This is accomplished within the loginAndCreateSession call.  Once logged in, the application can call createCard which creates a user and card with an attached address.  The response object contains three imporant pieces of data:

* The ephemeral username that was created for this cardholer (attached to the cardholder object that is part of the response)
* A one-time credential grant that can be issued to different application (usually a frontend app) to assume the role of the cardholder -- this grant expires in three minutes
* The card_id for the created card, so the virtual browser knows which card to place

Many cardsavr functions are __asyncronous__ and require await to extract the return data from the Promise.

### Microsoft C Sharp

There is a corresponding [C# SDK](https://github.com/swch/metro_sdk_c_sharp) that accomplishes the same function:

```cs
using Switch.CardSavr.Http;
using Newtonsoft.Json;

CardsavrHelper helper = new CardsavrHelper();
helper.SetAppSettings(Context.accountBaseUrl, Context.accountCardholderAgentAppID, Context.accountCardholderAgentStaticKey);
await helper.LoginAndCreateSession(Context.accountCardholderAgentUserName, Context.accountCardholderAgentPassword, null, "{\"key\": \"my_trace\"}");

PropertyBag cd = new PropertyBag(){{"default", new PropertyBag(){{"token", "123"}}}};

ClientLogin login = await helper.CreateCard(Context.accountCardholderAgentUserName, "default", 
    new User(){ email = "foo@foo.com", 
                phone_number = "5555555555", 
                custom_data = cd },
    new Card(){ first_name="Strivve", 
                last_name="User", 
                pan="4111111111111111", 
                cvv="111", 
                expiration_month="01", 
                expiration_year="25" },
    new Address(){ is_primary=true, 
                address1="1234 1st ave", 
                city="Seattle", 
                subnational="WA", 
                postal_code="98006", 
                country="USA" }
);
await helper.CloseSession(Context.accountCardholderAgentUserName);
log.Info("username: " + login.cardholder.username + ", grant: " + login.userCredentialGrant + ", card_id: " + login.card.id);

```

It's a very similar pattern and requires the same developer integrator and user credentials to set up.  You'll also notice the usage of "custom\_data", which is a gneric object that can be passed into a user object. This custom_data atribute will appear in downstrem reporting and as part of [webhook notifications](/resources/notifications/).

### Java

There is a corresponding [Java](https://github.com/swch/strivve-sdk-java) that accomplishes the same function:

```java
import javax.json.*;
import com.strivve.CardsavrRESTException.Error;
import com.strivve.*;

JsonObject response = null;
try {
    CardsavrSession.APIHeaders headers = this.session.createHeaders();
    headers.hydration = Json.createArrayBuilder().add("cardholder").build();
    JsonObject card = Json.createReader(new StringReader("{" +
        "\"cardholder\": {" +
            "\"cuid\": \"peLpzDnEHdhiiWEtuhUgIbN\"" +
        "}," +
        "\"customer_key":"peLpzDnEHdhiiWEtuhUgIbNpeLpzDnEHdhiiWEtuhUgIbN\"," +
        "\"pan\":\"4111111111111111\"," +
        "\"cvv\":\"123\"," +
        "\"expiration_month\":\"12\"," +
        "\"expiration_year\":\"24\"," +
        "\"name_on_card\":\"FirstName LastName\"," +
        "\"first_name\":\"FirstName\"," +
        "\"last_name\":\"LastName\"," +
        "\"email\":\"foo@foo.com\"," +
        "\"phone_number\":\"5555555555\"," +
        "\"address\":" +
            "{" +
                "\"cardholder_ref\": {" +
                "\"cuid\": \"{{CARDHOLDER_UNIQUE_KEY}}\"" +
            "}," +
            "\"first_name\":\"Switch\"," +
            "\"last_name\":\"Strivve\"," +
            "\"address1\":\"SGTClNSCCMqlfjuzTmJuepDyFgvWhlCMRycXlKGiRIooOJJkoXeObOcAwJMGeqjSDWfhTHobAWMimcCynMIQcvlBFSbMQlwUFyJ\"," +
            "\"address2\":\"AyFgoCTjCLXUQVylBAfkHJOtqkkKJjuaLHnmJpSctqBOQueIvciyAUPqYoFpkiAPlkGjgPuabhAPCHFPvaxciObOmIBvBUWpngD\"," +
            "\"city\":\"Seattle\"," +
            "\"subnational\":\"WA\"," +
            "\"postal_code\":\"98177\"," +
            "\"postal_other\":\"98177-0124\"," +
            "\"country\":\"USA\"," +
            "\"is_primary\": true" +
        "}" +
    "}")).read().asJsonObject();
    response = (JsonObject)session.post("/cardsavr_cards", card, headers);
} catch (CardsavrRESTException e) {
    System.out.println(e.getRESTErrors()[0]);
} catch (IOException e) {
    e.printStackTrace();
}

int cardId = response.getInt("id"); // card_id
String grant = response.getJsonObject("cardholder").getString("grant");

```

### Handing off Credentials to CardUpdatr

Once your application has the necessary information from the Cardsavr server, the application can hand off the credentials to CardUpdatr.  There are two ways to accomplish this.

### Redirection 

By supplying the parameters in the hash value of the url, CardUpdatr will automatically log in as the cardholder, and the cardholder can then select their merchants and corresponding credentials.  This should only be done when the bootstrap configuration options are not available.

```
https://acmebank.customer-dev.cardupdatr.app/#grant=GRANT&card_id=CARD_ID
```


## CardUpdatr Configuration

There are three sets of settings that can be used to customize your CardUpdatr experience, separated into different configuration objects. The "user" object is for customer specific data required to authenticate SSO users and also to provide customer specific logging. The "config" object (some settings required) configures the FI for which CardUpdatr should run, how sites should be sorted, and which countries should be supported. "style_template" is used to dynamically configured messages, colors and background images.

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
    countries_supported: ["Canada", "USA"]
  },
```

| Property              | Required | Default                             | Description                                                                                                                         |
| --------------------- | -------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| app_container_id      | yes      |                                     | HTML element id that CardUpdatr is attached to                                                                                      |
| hostname              | yes      |                                     | hostname of CardUpdatr (e.g. acmebank.customer-dev.cardupdatr.app)                                                                  |
| financial_institution | no       | first element of host, or "default" | Override the value in the hostname (recommended for embedded)                                                                       |
| top_sites             | no       | []                                  | These sites are listed first on the "select-merchants" page                                                                         |
| merchant_site_tags    | no       | ["usa", "prod"]                     | usa AND prod -- to provide "OR" functionality, tags must be listed differently. "prod", "canada,usa" means prod AND (usa OR canada) |
| countries_supported   | no       | ["USA"]                             | Populated in the country field of the address - if only one country, the country is assumed                                         |

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
    button_padding: "0.375 0.75rem",
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


If you have any questions regarding this content, please [Contact Us](mailto:support@strivve.com).