---
title: Introdcucing the CardSavr Platform
---

## Credit card issuance doesn’t end at activation.

When you implement card provisioning services via the CardSavr API you will need to integrate with other 
financial services applications. Although each integration scenario is unique, there are common requirements
and issues that developers and product teams must consider.

This section provides background and guidance on the areas that must be considered when integrating the CardSavr API
into your solution. Each area describes the design and decision considerations for a particular scenario rather than 
a specific implementation. 

 
In this section you’ll find:
* An overview of the CardSavr platform
* A primer on the platform architecture
* Best practices and design considerations for:
    * Credential management
    * Data retention
    * PCI compliance
    * User interface and experience

***    
    
Strivve’s CardSavr Service is a Software As A Service (SaaS) which securely places payment cards on merchant sites on 
behalf of Card Issuers and their cardholders. It uses Remote Process Automation (RPA) to perform these push-provisioning
operations.  CardSavr is PCI-DSS compliant.  

# Development Processes
The CardSavr service supports your development model with multple environments for each phase of development.  For 
 example; sandbox, dev, and production environments are configurable. For testing, non-production environments are 
 equipped with synthetic sites allowing you to test without impacting live merchant sites.



