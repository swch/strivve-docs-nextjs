---
title: Strivve Site Tags
---

## Site Tagging
Strivve supports a wide range of sites from e-commerce, to subscription, to utilities.  It's important to understand the process for how sites are tagged, so integrators can ensure they are querying with the correct parameters.

Strivve uses tags to identify certain site criteria.  These tags can be used for different sorts of categorization such as locales or success rates.  

### Available Tags

Tags are assigned based on their support and availability. 

Site         | Tags              | Effect
------------ | ----------------- | --------------------
Site A       | prod, usa         | This is a prod site, only available in the US.  Canadian cardholders likely cannot place a card on this site
Site B       | prod, usa, canada | This is a prod site that is available in both canada and the us.
Site C       | disabled, canada  | This site is only available in Canada, but it is temporarily disabled
Site D       | beta, usa         | This usa site is new, and may not have a high enough success rate to qualify as "prod", but we still encourage production customers to include it
Site E       | synthetic         | Synthtetic sites are very useful for testing UX, as they simulate real site behvior.  They can be made to prompt for tfa codes, new credentials, or even secruity questions. 

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

Perhaps a QA system wants to include all synthetic sites, as well as prod and beta sites:
```
https://api.{{CARDSAVR-INSTANCE}}.cardsavr.io/merchant_sites?tags=beta,prod,synthetic
```