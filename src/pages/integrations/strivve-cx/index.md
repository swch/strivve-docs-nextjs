---
title: StrivveCX Library
---

## Overview
The StrivveCX Library consists of a set of secure cardholder experience (C/X) components designed for use by digital banking application users, from within any digital banking application.

This library is **still under development** with the expect release comming soon.  If you are interested in any additional information or would like to be part of a pilot release, please [Contact Us](mailto:developers@strivve.com).

The primary capabilities StrivveCX enables banking customer applications to easily and securely create a compelling user-experiences for banking customers across any cardholder journeys which provide simple native starter components and customizable components:

* Selection of card-on-file sites from Strivve’s Sites Directory
* Secure acquisition of online site account credentials with default options to allow for persisting user’s online account site credentials
* Card-on-File Placement progress and results
* Card-on-File Placement History, conveying where users have previously placed their cards using the CardSavr Platform
* Future versions will also provide similar capability for:
  * Native and customizable payment card entry/acquisition
  * Native and customizable billing address entry/acquisition

 
## StrivveCX Full Card-Placement Workflow Journey
Using the Component-Based Library, Strivve offers a pre-built Full Card Placement Workflow Journey that can be easily dropped into your appliation.  The package, which comes with it's own styling defaults, offers many customizble branding options that will help the integrated solution provide a consistent web application look and feel for your cardholders.

With the component based architecture, another level of customization is available to where developers may further take control by creating/modifying the experience themselves.  This includes: 

* Create/customize your own Service Object which interfaces directly to the CardSavr backend.
* Create/customize your own Component Objects to render your own custom UX/views.

There really is no limitation to customizing your experience, while the architecture takes away the complexities of having to program directly to the CardSavr API (Strivve does it for you!.  The full component level [Customization](#customization) will be added to this documentation as the product develops.  For now, the focus will be on the Full Card Placement Workflow.

### Workflow Example Quickstart 
This example and screenshots of the Workflow includes the author passing in the card information directly via the javascript; however, further development is underway to create a service that can be used to programatically acquire the card information from your Card Issuer Processor.  More details on that will come at a later time.

Below uses the Strivve Default Styling as no overrides are provided in this example. Fonts, colors, images, and text are all configurable and will be covered fully at a later time as this site develops.

```html
<body>
  <div id="account-link"></div>
</body>
<script src="{url}/main.js"></script>
<script>
  Strivve.mountLinkingJourney({
    element_id: 'account-link',
    api_instance: 'customer-dev',
    card: {
      pan: '4111111111111111',
      cvv: '321',
      expiration_month: '2',
      expiration_year: '24',
      name_on_card: 'Jane',
      address: {
        city: 'Seattle',
        postal_code: '98177',
        country: 'USA',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@test.com',
        phone_number: '2065555555',
        address1: 'test',
        state: 'test',
        subnational: 'WA',
        is_primary: true
      }
    }
  });
</script>
```

### Site Selection Screen

![Site Selection](/images/Site_Selection.jpg)

The default Site Selection screen provides a list of top preferred sites shown in a carousel.  Four sites at a time will be displayed as the cardholder navigates the full list of preferred sites.

Strivve provides the list of preferred sites by default; however, this list can be customized.


### More Sites Screen

![More sites](/images/More_Sites.jpg)

If the Cardholder wishes to list the full list of sites, the Cardholder may choose the "Browse All Sites" button which shows the full list that Strivve has available.

### Site Linking

![Site Selection](/images/Site_Linking.jpg)

After the Cardholder has selected a single merchant tile, the Cardholder will be prompted for authentication that is specific to the selected merchant site.  This is required for the Strivve RPA process to link your account before placing your specified card as top-of-wallet.

The above example demonstrates a simple username/password combination.  There are cases from which the Cardholder will be asked for a One-Time-Password or MFA code - all of which the workflow supports.

### Your Sites

The Your Sites view will provide a summary all sthe sites the particular cardholder has pushed to a merchant with a timestamp on when the transaction completed.  If there was an error for that particular attempt, details will be provided on failure.

**The image for this view is still under construction.**


## Customization

The library comes in the form of Javascript packages for the most popular NodeJS and browser frameworks.

StrivveCX is built for use by Mobile Web and Desktop Web Applications, as well as Native Mobile applications alike.  Applications can dynamically compose and of course consume Javascript components at a minimum, or complete DOM object components also.  Optimally whether the applications are native applications or browser based applications, the StrivveCX components can provide complete components or partial object only components.  However, most applications can compose and consume StrivveCX rich DOM components by making use of the StrivveCX standard JavaScript library and runtime.

Below is an high-level example of building your own components.  There are three main objects the make up our component architecture:

1. **Service Layer** - Service contains functions that are connected to API/Backend.
2. **Core Layer** - Orchestration interface for processing job status, submitting credentials, functions and state for compoenent.
3. **Component Layer** - Contains functions to render components on the website.

All three layers are fully customizable.  The below snippet is only an example of instantiating these layers.  Full documentation and further details are under construction.

```js
  const service = Strivve.createService({ api_instance: 'customer-dev' });
  
  // This "core" code is merely a test example.  Below Strivve describes 
  // the requirement to implement the SSO Microservice for 
  // production usage
  //
  const core = Strivve.createCore({
    service,
    card: {
      pan: '4111111111111111',
      cvv: '321',
      expiration_month: '02',
      expiration_year: '24',
      name_on_card: 'Mvick',
    }
  });

  const component = Strivve.createComponent({ core });
  component.mountAccountLinkView('account-link', {
    site_id: '1',
    hide_title: false
  });
  
  component.mountSelectSiteView('select-sites', {
    single: false,
    view: 'list',
    hide_search: false,
    submit: (selected) => {
      alert(selected.map(item => item.name).join(', '))
    },
  });

```

## StrivveCX Single-Sign On
In order to specify the credit card, address, and contact info details into the CardSavr API, the integrator must leverage the [SSO-Microservice](/integrations/sso-microservice) from which the cardholder credentials (grant and token) are retrieved and in turn passed into the Strivve-CX component.  

There is no UX in StrivveCX from which the cardholder can manually enter the card information: Strivve strongly discoverages this manual step as it results in high cardholder friction and can heavily affect cardholder adoption.

```js
  Strivve.mountLinkingJourney({
      element_id: 'linking',
      api_instance: 'customer-dev',
      card_id: data.card_id,  // card_id from the SSO Microservice
      grant: data.grant, // grant from the SSO Microservice
    });
```

## Summary
Full details of the StrivveCX library can be found [here:](https://swch.github.io/Strivve-UX-Components/?path=/docs/introduction--documentation).  Please [Contact](mailto:developers@strivve.com) for additional support and questions.
