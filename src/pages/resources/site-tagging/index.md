---
title: Strivve Site Tags
---

## Site Tagging
Strivve supports a wide range of sites from e-commerce, to subscription, to utilities.  It's important to understand the process for how sites are tagged, so integrators can ensure they are querying with the correct parameters.

Strivve uses tags to identify certain site criteria.  These tags can be used for different sorts of categorization such as locales or success rates.  

### Available Tags

Tags are assigned based on their support and availability. 

Site         | Tags                    | Effect
------------ | ------------------------| --------------------
Site A       | prod, unrestricted, usa | This is a prod site, only available in the US.  Canadian cardholders likely cannot place a card on this site
Site B       | prod, unrestricted, usa, canada | This is a prod site that is available in both canada and the us.
Site C       | prod, disabled, canada  | This site is only available in Canada, but it is temporarily disabled
Site D       | prod, beta, usa         | This usa site is new, and may not have a high enough success rate to qualify as "unrestricted", but we still encourage production customers to include it
Site E       | prod, limited           | This card can be placed "some" of the time, and is actively being investigated
Site F       | synthetic               | Synthtetic sites are very useful for testing UX, as they simulate real site behvior.  They can be made to prompt for tfa codes, new credentials, or even secruity questions. 

### Query Examples

The [merchant sites endpoint](https://swch.github.io/slate/#get-merchant-site) is used to query sites.  To query all "usa" and "prod" sites:

```
https://api.{{CARDSAVR-INSTANCE}}.cardsavr.io/merchant_sites?tags=usa&tags=prod
```

Note that standard query string array syntax is required, with the key being repeated to enable filtering on multiple parameters (e.g. usa & prod) 

To query all prod sites AND also usa OR canada, we use a comma between the properties that require OR
```
https://api.{{CARDSAVR-INSTANCE}}.cardsavr.io/merchant_sites?tags=usa,canada&tags=prod
```

Perhaps a QA system wants to include all synthetic sites, as well as unrestricted and beta sites:
```
https://api.{{CARDSAVR-INSTANCE}}.cardsavr.io/merchant_sites?tags=unrestricted,beta,synthetic
```

### Non-Exhaustive Tag List

Below are three categories of tags that are carefully managed by the Site Support team. Tags are meant to be fluid, but there
are some constraints that can be relied upon:

#### Site Status

Tag          | Effect             
------------ | ----------------- 
prod         | production sites that should always be visible to cardholders -- if these sites become temporarily unavailable, they will generally be restored shortly
down         | indicates that a site is unavailable for card placements

![Site States](/images/site_states.jpg)
*Site State tag relationships*

#### Site States

Sites tagged "prod" will also have an additional tag that indicates how sites should be displayed to cardholders.

Tag          | Effect                                                                                | CardUpdatr Label
------------ | --------------------------------------------------------------------------------------|------------------
unrestricted | cards can be placed reliably 
limited      | cards can be placed "most" of the time, and cardholders can be encouraged to try them | "Try me!" 
beta         | simmilar to limited, but are newer sites                                              | "Beta"
disabled     | indicates that a site it temporarily unavailable for card placements -- cardholders should be alerted that these sites are temporarily unavailable (Labeled "temporarily Unavailble" in CardUpdatr)                   | "Temporarily Unavailable"

#### Countries

Strivve supports some sites that are exclusively availabe in the US and/or Canada. This is not to be confused with
billing address support, but rather sites that are designed for people that reside in a specific country.

Tag          | Effect             
------------ | ----------------- 
usa          | for cardholders that support transactions on sites in the us
canada       | for cardholders that support transactions on sites in canada

It's important to note that many cards support international billing addresses and although these sites would only be tagged both canada and us, they are oftentimes available with other international billing addresses.

#### Site Types

Tag          | Effect
------------ | ----------------- 
synthetic    | applied to test sites for [UX development and testing](/testing/site-testing) - these should be filtered out in production