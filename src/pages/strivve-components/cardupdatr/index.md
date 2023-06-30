---
title: CardUpdatr
---

The first application and web component that instantly updates any card where cardholders shop and make payments online – keeping your card Top of Wallet®.


## Up and running in under an hour
From simple integration requirements to zero integration if needed.  Merely follow these basic steps:
1. Provide Strivve with a few details about your card portfolio and branding assets.
2. Within days, your branded CardUpdatr app is ready to provision your card on e-commerce accounts.
3. Share your CardUpdatr link with your cardholders using existing communication channels!
4. Watch your transaction volume and revenue grow while increasing cardholder loyalty and satisfaction.
***
While CardUdatr can operate as a stand-alone web application in most implementations you will want to embed or launch the CardUpdatr application within your existing experience. There are two options when hosting CardUpdatr within your existing application or website:

1.	__Launching and Embedding__ --- Learn the different mehanisms for implementing CardUpdatr into your application or web site.  Strivve provides a bootstrap library for enabling the experience that works for you.

2.	__Single Sign On__ --- While this option does require deeper technical integration it provides a much better user 
experience because the user is authenticated by your website before CardUpdatr use within your application. When the user 
is authenticated, your site or application passes the cardholder card details and cardholder address information directly to CardUpdatr removing the manual entry by the cardholder.

***
# CardUpdatr Single Sign On

CardUpdatr is a simple way for cardholders to select the merchants they'd like to update, and then monitor the jobs as they progress. The challenge with CardUpdatr is there is a significant barrier where the cardholder must enter their entire credit card form, address, and contact info.  Many financial institutions would prefer a CardSavr integration to streamline this process, but may not want to invest the initial effort to build a user interface.

With CardUpdatr SSO, you can make some simple API calls to set up the cardholder, and then hand over a token to CardUpdatr to handle the user interaction using [CardUpdatr Embedded](/cardupdatr/embed).

## Server Component

A server component is required to create the cardholder, card and address.  There are three SDKs that support this functionality.  Java, Node and C#.  The javaascript library can also be used within a client to create the user.

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

Every cardsavr app requires a cardsavr server and an integrator name and key.  These can be obtained by [contacting developer support](https://developers.strivve.com/sandboxrequest).  You will also need an app username and password that the application uses to log onto the cardsavr platform using the integrator key to encrypt its payloads.

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

## Handing off Credentials to CardUpdatr

Once your application has the necessary information from the Cardsavr server, the application can hand off the credentials to CardUpdatr.  There are two ways to accomplish this.

### Redirection 

By supplying the parameters in the hash value of the url, CardUpdatr will automatically log in as the cardholder, and the cardholder can then select their merchants and corresponding credentials.  This should only be done when the bootstrap configuration options are not available.

```
https://acmebank.customer-dev.cardupdatr.app/#username=USERNAME&grant=GRANT&card_id=CARD_ID
```

### Configuration

There are methods outlined below that use configured parameters (user), and CardUpdatr will once again log in as the cardholder.  THe Configuration options are listed below.


***

# Launching and Configuration
CardUpdatr can be run as a standalone application simply launched as a url and configured within the Strivve Partner Portal (e.g. (https://acmebank.customer-dev.carupdatr.app))  However, CardUpdatr can also be embedded directly within a website, or launched from a configured link using a bootstrap library available on your CardUpdatr instance.  By using this bootstrap library, you can configure the look and feel and define custom FI parameters.  By using the CardUpdatr SSO product, you can even launch or embed CardUpdatr using an access grant created by a custom application that enables cardholders to avoid having to provide their card information. 

This section outlines four possiblities for launching CardUpdatr, how to configure the settings, and pros and cons for each.

## CardUpdatr launch modes

In the examples below, simply replace CARDUPDATR_HOSTNAME with the hostname provided via the following [form](https://strivve.com/cardupdatr/#cardupdatr-form).

### Launch with a Link

Launching CardUpdatr in a dedicated window is frequently the easiest experience for Cardholders.  Scrolling is simply achieved using a browser scrollbar, and when the user is finished, they can simply close the window.  

```html
    <script src="https://CARDUPDATR_HOSTNAME.cardupdatr.app/cardupdatr-client-v2.js"></script>
    <a href="#" onclick='launchCardUpdatr(
      {
        config: { 
          hostname : "CARDUPDATR_HOSTNAME.cardupdatr.app" 
        }, 
        user: {
          ...
        },
        style : { 
          ...
        } 
      }, target, options); return false;'>LAUNCH</a>
```

launchCardUpdatr can be called as a click handler from an anchor, a button or any other clickable element.

### Embedded

Embedding works well for embedding within a desktop experience.  It can provide the CardUpdatr app with supporting instructions and may fit more seamlessly into the application or browser experience.  Although inserted as an iframe, once again the boostrap library makes the insertion much more seamless.   Use the code below in your page to host the CardUpdatr within an iframe.  You must create a div that has the correct height, and then pass the id of the div into the initCardupdatr function. 

```javascript
    <div class="container" style="background-color: deepskyblue; width: 100%; text-align: center; padding-top: 3vh; min-height: 100vh;">
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

### Launch from a Mobile Application

Similar to launching from a link, you can just as easily construct the web window url.  Both iOS and Android have simple mechanims for launching webviews within apps, but generally are launched using native parameters to control the containing child window.  This is not difficult, but it does require the application to assemble the url itself.

https://CARDUPDATR_HOSTNAME.cardupdatr.app/#settings={ ENDCODED\_SETTINGS\_JSON }

ENCODED\_SETTINGS\_JSON is simply the same json object passed in as the first parameter to launchCardUpdatr and embedCardUpdatr, only it must be url encoded.

[Here](https://github.com/swch/Strivve-SDK/tree/master/CU-iOS) is a sample iOS application that demonstrates this launching option.

### Launch as a standalone link

If configured entirely within the Strivve Partner Portal, cardholder can launch using their CardUpdatr url:  https://CARDUPDATR_HOSTNAME.cardupdatr.app/.

## Configuration Settings

There are three sets of settings that can be used to customize your CardUpdatr experience, separated into different configuration objects.  The "user" object is for customer specific data required to authenticate SSO users and also to provide customer specific logging.  The "config" object (some settings required) configures the FI for which CardUpdatr should run, how sites should be sorted, and which countries should be supported.  "style_template" is used to dynamically configured messages, colors and background images.

### config

```javascript
{
  config : {
    app\_container\_id: "APP_CONTAINER_ID", 
    hostname: "CARDUPDATR_HOSTNAME",  
    financial_institution: "acmecu", 
    top_sites: ["amazon.com", "apple.com", "audible.com", "hulu.com", "netflix.com", "spotify.com", "target.com", "uber.com", "venmo.com", "walgreens.com", "walmart.com"],  
    merchant\_site\_tags: ["usa,canada", "prod"],    
    countries_supported: ["Canada", "USA"] 
  },
```         

Property | Required | Default | Description 
-------- | -------- | ------- | -----------
app\_container_id | yes | | HTML element id that CardUpdatr is attached to
hostname | yes | | hostname of CardUpdatr (e.g. acmebank.customer-dev.cardupdatr.app)
financial_institution | no | first element of host, or "default" | Override the value in the hostname (recommended for embedded)
top_sites | no | [] | These sites are listed first on the "select-merchants" page
exclude_sites | no | [] | List of sites to be excluded (hostnames)
merchant\_site_tags | no | ["usa", "prod"] | usa AND prod -- to provide "OR" functionality, tags must be listed differently. "prod", "canada,usa" means prod AND (usa OR canada) 
coutnries_supported | no | ["USA"] | Populated in the country field of the address - if only one country, the country is assumed

### user

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

Property | Required | Default | Description 
-------- | -------- | ------- | -----------
username | no | | When using SSO, this value is generated by CardSavr and required to continue the session
grant | no | | Also returned by CardSavr and required for SSO
card_id | no | user's first card | When using SSO, this is the card_id to be used for this session
selected_sites | no |  | Pre-selected site ids collected from the user using a non-CardUpdatr component
custom_data | no | | Data that identifies this cardholder/session.  It is posted via webhooks when the session is terminated.

### style_template

style_template attributes can be dynamically configured with CardUpdatr's carduupdatr-client-v2.js.  They can optionally be configured in the Partner Portal, but dynamic flexibilty is sometimes preferred if running multiple brands under the same Financial Institution.

```javascript
  },
  style_template : { 
    name: "ACME Bank", 
    page_title: "Update your card!", 
    card_description: "ACME Bank Debit Card"  
    //By default, a message that will be appended and link to the select-merchants page: "Add your $card_description to more sites"
    final_message: "Thank you for updating your card, no further action is needed. Sites may notify you that your payment ",
    invalid\_session_url: "URL",  
    link_color: "#5e35b1",
    button_color: "#5e35b1",
    border_color: "#5e35b1",
    drop_shadow: false,
    dynamic_height: true
  },
```

Property | Required | Default | Description 
-------- | -------- | ------- | -----------
name | no | The FI name | The name of the issuer
page_title | no | The FI name | The title of the page
card_description | no | Set in the Partner Portal | included in the copy 
final_message | no | Set in the Partner Portal | A thank you message that appears after all accounts are linked
invalid\_session\_url | no | select-merchants | Once a session ends, the user can be directed to a new page to re-authenticate
link_color | no | #000000 | color of links (can also be configured in Partner Portal)
button_color | no | #000000 | color of buttons (can also be configured in Partner Portal)
border_color | no | #000000 | color of box borders (can also be configured in Partner Portal)
drop_shadow | no | true | draws a dropshadow around the visible area
dynamic_height | no | false | creates a fixed height on the credit card form and the merchant credential page - this breaks the sticky notification box


## Requesting a Sandbox Environment 

To request your own CardUpdatr preview instance, fill out the free preview form:  <a href="https://strivve.com/cardupdatr/#cardupdatr-form" target="_blank">Request Preview Now</a>  (NOTE: access-control frame-ancestors are used, so please include the hosting domain in your request.

***
