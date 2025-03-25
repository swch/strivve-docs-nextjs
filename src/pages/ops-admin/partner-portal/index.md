---
title: Partner Portal
---

## Partner Portal - Administering Environments

Each CardSavr environment includes an portal application used in the administration of
that environment.  This includes creating cardsavr users, configuring applications for use 
with CardSavr and various other tasks. This portal is known as the Partner Portal 
and is reachable over the Internet under the domain name for your environment. Strivve 
provides the initial admin account for the customer to utilize in managing their 
development environment. Per PCI-DSS requirements, password must be changed on first login 
and every 90 days after.  This requirement to change an initial password applies to 
all users who are people.  Automation users known as agents within CardSavr are not 
required to changed their password on first login but must have their have their 
passwords changed every 90 days just like all users.

## Accessing

The Partner Portal can be accessed at `https://portal.<environment_name>.cardsavr.io` where 
<environment_name> indicates the name for your environment.  For example, 
`https://portal.strivve-dev.cardsavr.io`. 

## Menu Items
The following menu items are available:

| Menu Item | Functionality
--------|-----------
Users | Create and delete users within the environment
Financial Institutions | Create and update financial institutions.  Associate BINs with financial institutions
Merchant Sites | Lists supported merchant sites and their current active status.
Reporting | Contains access to card-on-file transaction reports and cardholder session reports
Integrators | Shows all integrators within the CardSavr instance (if logged in as an admin). Admin users may add, edit or delete integrators.  
Help | Detailed help section for Partner Portal

Detailed documentation can be found in the Partner Portal Online Help


