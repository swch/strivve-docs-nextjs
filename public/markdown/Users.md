## Users
The users tab shows all existing portal users with associated roles and assigned financial institutions.  Here users can be added, edited, and deleted.  When editing, the user can be assigned to a specific FI, or, all FIs by selecting the "All FIs" checkbox.  

##### Add/Edit a User
To edit a user, click the pencil icon beside the user you wish to edit. 

###### Role
A user's role determines their permissions within the CardSavr API. A user may have the following roles:

**admin** : 
- admins are Partner Portal-specific users that can create, edit, and delete any cardholder within the specified Financial Institution. 

**cardholder_sso_agent** :
- create cardholders
- create cards/addresses for those cardholders
- create accounts for those cardholders
- post jobs for those cardholders
- poll jobs for messages and respond to them on behalf of cardholders they created.

**cardholder_agent** :
- create cardholders
- create cards/addresses for those cardholders
- create accounts for those cardholders
- post jobs for those cardholders
- poll jobs for messages and respond to them on behalf of cardholders they created.

**customer_agent** :
- customer_agents have the same capabilities as cardholder_agents, but they can act on any cardholder within their FI (unless they are assigned to all FIs via the "All FIs" checkbox, in which case they can act on any cardholder).

##### Delete User
To delete a user, click the trash can next to the user you would like to delete.
