---
title: Microsoft.net Quick Start
---

The Strivve DotNet library is built around a class, CardsavrSession. To start using the library, you must instantiate a new CardsavrSession object.  This requires the following items:

1. API url (e.g. api.acmebank.cardsavr.io)
1. App name (app_name) and integrator key (app_key) - these can be obtained by contacting developer-developers@strivve.com
1. App username and password - also obtained from a CardSavr administrator.  Simple applications (like the quick start) require a cardholder agent, while more complex applications may require a customer agent.

```javascript
var app_name = "CardUpdatr Demo"; //This can be anything
var app_key = "[REDACTED]". //from administrator
var cardsavr_server = "[REDACTED]";  //please use acmebank for demonstration purposes 
var app_username = "cardholder_demo";  //an integrator "cardholder_agent" that has the ability to provision users
var app_password = "[REDACTED]";  //integrator's password
```

The application is a simple web application (/sample/webserver.js).  The initial call to /create_user simply provisions the user, and hands off a grant and a username to a frontend webform that manages the interaction with the user.  Both create_user and the web page (/dist/index.html) require that these credentials be filled in.

From the sample directory, you can also run the express web server:

```bash
node webserver.js
```

This is just a simple api call and static webserver that demonstrates how the web application works.  In the dist/index.html file, there is a simple application that uses a webpack bundle of the sdk (strivve-sdk.js) to manage the user's merchant credentials and job.  By passing the grant and username into the url of the web application, it can attain a sesssion for that user:

`http://localhost:3000/#grant=[GRANT]&username=[USERNAME]`

Now the web application can re-establish the session using the grant and username provided by the original provisioning call.  The cardholder will be presented with a simple form for the merchant credentials of the site to place their card.  Once the form is submitted, the web application authenticates the user with the username and grant, and then posts the job as that user.  There is a messaging system the posts messages to the UI to show status, progress, and the success or failure of the job.  The form will also present additional fields to collect a new password or a two-factor authentication code.


## Microsoft.Net SDK on GitHub
Click to access [ Strivve .Net SDK @ Github  ](https://github.com/swch/metro_sdk_c_sharp)

***











