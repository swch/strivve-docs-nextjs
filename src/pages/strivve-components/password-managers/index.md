---
title: Password Managers
---

## What is a password manager?
A password manager is an application designed to store and manage online credentials.  This technology helps internet 

## What do password managers do?
Password managers securely store passwords, so users don’t have to worry about remembering them when logging back onto online sites.  In many cases, the password manager auto-fills the credentials into a specific site’s login page when a user is re-accessing; therefore, they only need to submit the logon process to continue.


## How does Strivve work with password managers?
Strivve is often asked on how well an UX interface that prompts for merchant site credentials integrates with password managers.

At this time, the best practice is for cardholders to lookup, copy, and paste the credential information from their password manager into the logon fields for a given site.

## Password Manager Examples
### IOS Mobile Device using iCloud Password Manager

1. User is prompted for merchant site credentials and selects the key icon.
![Password Manager](/images/ios_icloud_1.png ) 
2. User is logged into iCloud Password Manager - in this case using Face ID.
![Password Manager](/images/ios_icloud_2.png ) 
3. User searches for and selects the applicable merchant site. Once selected, the credential fields are auto filled, and the linking process can begin.
![Password Manager](/images/ios_icloud_3.png ) 

### Andriod Mobile Device using Google Password Manager

1. User is prompted for merchant site credentials and selects password using Google Password Manager.
![Password Manager](/images/android_google_1.png ) 
2. User is navigated into the Google Password Manager from which the specified merchant site can be searched for and selected.
![Password Manager](/images/android_google_2.png ) 
3. Once selected, the credential fields are auto filled, and the linking process can begin.
![Password Manager](/images/android_google_3.png ) 

### IOS Mobile Device using third party LastPass Password Manager

1. User is prompted for merchant site credentials and selects the key icon.
![Password Manager](/images/ios_lastpass_1.png ) 
2. User is navigated into the LastPass Password Manager from which the specified merchant site can be searched for and selected.  The credentials are auto filled, and the linking process can begin.
![Password Manager](/images/ios_lastpass_2.png ) 

## What are Strivve’s limitations with password managers?
Strivve does not currently have a solution from which password managers can auto-fill the credentials for a given site in the card-on-file journey.  The reason is that password managers store credential information based on the host domain of the site they previously logged into.  With any UX that is integrated into a web application, the host domain does not match the domain from which the credentials were acquired, thus the password manager does not auto-fill the fields.

## What is Strivve’s plan to address the Cardholder friction in this case?
The CardSavr API supports the ability to remember credentials after the first time entered so the cardholder would not be prompted again for a given site in future placements.

There are also new technologies Strivve is constantly researching to reduce the unwanted friction of having Cardholders needing to specify these credentials.  These technologies are in the proof-of-concept stage and more information will be available as research progresses.

Strivve is always on the forefront in keeping up to date with the latest password managers and digital keychain technologies to improve password manager integration.
