---
title: CardUpdatr 3.0
---

## Overview

CardUpdatr 3.0 is Strivve's latest web drop-in component that handles the end to end experience of updating any card where cardholders shop and make payments online - keeping your card Top of Wallet®. CardUpdatr 3.0 has a responsive design from which it can be leveraged in both Mobile Web and Desktop Web applications. There are several methods from which CardUpdatr can be integrated into your application which is covered in this section.

<Add CardUpdatr 3.0 vide0)>

## Script reference
<script src="https://cdn.jsdelivr.net/npm/@strivve/strivve-cx@0.1.25/dist/main.min.js"></script>

## Obtaining Card Data using the SSO Microservice
Leveraging the [SSO Microservice](/integrations/sso-microservice) collects the collect card and billing address data (cardId, grant) that CardUpdatr 3.0 will require upon launching.

### Appearance Object
The Appearance object is an interface that specifies the appearance options for rendering different UI elements for CardUpdatr 3.0.

```javascript
   const appearance = {
        layout: {
            logoImageUrl: 'https://unsplash.com/photos/CoNsEK5iHug/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjg5MjE2MTEwfA&force=true&w=640',
            appName: 'Sauve Application'
        },
        variables: {
            primaryColor: 'black',
            secondaryColor: 'black',
            borderColor: 'black',
            height: '800px'
        },
        elements: {
            selectSiteList: {
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridGap: '12px',
                borderTop: 'none',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                borderRadius: '12px', 
                paddingTop: '12px'
            },
            selectSiteTitle: {
                fontSize: '20px',
                fontWeight: 'normal'
            },
            selectSiteItem: {
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                border: 'none',
                borderRadius: '8px',
                transitionDuration: '0.2s',
                '&:hover': {
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 2px'
                },
            },
            selectSiteItemImage: {
                height: '80px', 
                width: 'auto'
            },
            input: {
                borderRadius: '20px'
            },
            button: {
                borderRadius: '20px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                '&:hover': {
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 2px'
                },
            },
            outlinedButton: {
                borderRadius: '20px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                '&:hover': {
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 2px'
                },
            },
            accountLinkContainer: {
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                borderRadius: '12px',
                padding: '30px',
                maxWidth: '330px'
            },
            accountLinkView: {
                margin: '20px'
            },
            accountLinkHeaderTitle: {
                fontSize: '20px',
                fontWeight: 'bold'
            },
        },
    }; 
```

### Linking Journey Object
The Linking Journey Object, referencable vai the main.min.js, is used to instantiate CardUpdatr 3.0.

```javascript
    Strivve.mountLinkingJourney({
        element_id: 'full',
        api_instance: 'customer-dev',
        card_id: ssoCardID, 
        grant: ssoGrant, 
        select_site: {
            filter: {
                tags: "prod,usa",
                top_hosts: "att.com,tjmaxx.tjx.com,ae.com,apple.com,amazon.com,netflix.com,spotify.com,target.com,uber.com,venmo.com,walgreens.com,walmart.com"            
            }
        },
        appearance,
        intro: {
            banner: 'https://swch.github.io/Strivve-UX-Components/banner.png',
            onClickBanner: () => {
              alert('open banner');
            },
        },
        header: {
            title: 'Product Test',
            onClose: () => {
                console.log(stv);
                stv.component.unmountLinkingJourney(id);
            }
        }
    });

```