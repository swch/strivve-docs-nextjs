---
title: Notifications
---

## Receive event notifications with webhooks
Webhooks are particularly useful for asynchronous events like card placement jobs. CardSavr uses 
webhooks to notify your system when a card placement event completes. 

Currently, only user session completion is supported.

__Note__ that environments can also be set to purge ephemeral users upon session completion. This is 
specifically advised environments where Strivve is managing the safe_keys. This setting is 
managed by Strivve and applied globally for that environment.  

Notifications can be assigned to an event and then mapped to a notification type:
1.	Email (required email addresses are saved with cardholders)
2.	Webhook

Each notification type has its own configuration.  For example, a webhook needs to know what 
URL to hit, and an email needs to know what address to email.

**Email notifications currently must be configured by Strivve.**

Webhooks require a URL to be saved via the notification endpoint.  This URL must contain all 
the necessary security information to connect to the customer's web service.  Webhooks are 
also currently configured by Strivve. The notification endpoint reference is available under 
the [API/SDK](https://swch.github.io/slate) section.

### Job Placement Completion Event

The data format for a job placement event is:
```json
    {
        "jobs": [
            {
                "job_id": 10,
                "card_customer_key": 123456789,
                "completed_on": "2020-06-25T22:39:47.942Z",
                "merchant_site": {
                    "host": "amazon.com",
                    "name": "Amazon",
                    "id": 10
                },
                "termination_type": "USER_DATA_FAILURE",
                "job_status": "TIMEOUT_TFA",
                "job_status_message": "Unable to automatically update your card due to invalid or missing two-factor authentication.",
                "custom_data": {
                    "meta_key": "MB9800665"
                }
            }
        ],
        "custom_data": {
            "meta_key": "MB9800665",
            "myfi": {
                "token": "1234"
            }
        },
        "trace": {
            "key": "siazwbp1c81qwoplrr66"
        },
        "financial_institution": "Acme Bank",
        "financial_institution_id": 11,
        "cuid": "siazwbp1c81qwoplrr66",
    }
```

The meta_key comprised of the first and last initials of the user, the postal code, and the last 
two digits of the PAN. For cardholders that have been authenticated by the customer, the CardSavr 
username is available and can easily be associated with the necessary contact information 
(email, mobile number) when the webhook is processed.

### Termination types

The list of termination_types is as follows:

Termination Type | Notes
|-----------|--------
BILLABLE | Success
USER\_DATA\_FAILURE | Generally a credential/card problem
SITE\_INTERACTION\_FAILURE | Cardsavr is unable to navigate the site successfully
PROCESS\_FAILURE | A unknown backend failure - should be reported as unsuccessful

The [job\_status list](/resources/job-progress/#termination-types) is frequently updated; it is advised to use the job\_status\_message for 
unknown job_status values.  

### Using webhooks with your CardSavr integration
 
There are only a few steps to utilize webhooks within CardSavr:

1. Create a webhook endpoint on your server
2. Register the webhook endpoint with a CardSavr event

Webhooks can be either statically configured in the Strivve Portal, or dynamically assigend when a cardholder is created.  Webhook
payloads are signed using the integrator key used to create the corresponding cardholder.  By installing a 
[Strivve SDK](https://github.com/swch/strivve-sdk), you can [verify webhook signatures](https://github.com/swch/Strivve-SDK/blob/master/src/cardsavr/CardsavrSessionCrypto.ts#L225) for added security.  (Notice the function takes two keys, current and previous key, in case of key rotation)

### Testing Webhooks

Webhook behavior in CardSavr environments is identical between production and non-production 
environments.

### Payload Signing

All payloads are signed using the same mechanism as the CardSavr API. This guarantees the source of the webhook request to protect against man-in-the-middle attacks.  Verifying the signature of the payload is optional but recommended.  Here are some examples from our [Java](https://github.com/swch/strivve-sdk-java/blob/1db2b56a002fd5753661d0ac20ef2ddc483fdd5b/cardsavr/src/main/java/com/strivve/Signing.java#L24) and [Javascript](https://github.com/swch/Strivve-SDK/blob/9679fa3c5b1047e67f6e36667e89156b43001a2b/src/cardsavr/CardsavrSessionCrypto.ts#L225) SDKs.

Here is a code sample that verified the signature of the incoming request using the Strivve Java SDK:

```Java

static class MyHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange t) throws IOException {

        String input = new BufferedReader(
            new InputStreamReader(t.getRequestBody(), StandardCharsets.UTF_8))
                .lines()
                .collect(Collectors.joining("\n"));

        Headers headers = t.getRequestHeaders();
        String signature = headers.getFirst("x-cardsavr-signature");
        String nonce = headers.getFirst("x-cardsavr-nonce");
        String authorization = headers.getFirst("x-cardsavr-authorization");

        if (signature != null && nonce != null && authorization != null) {
            try {
                Signing.verifySignature(
                    signature, 
                    "http://"+t.getRequestHeaders().getFirst("Host")+t.getRequestURI(),
                    authorization, 
                    nonce, 
                    new SecretKey[] {Encryption.convertRawToAESKey(Base64.getDecoder().decode(INTEGRATOR_KEY))}, 
                    input);
            } catch (Exception e) {
                // Signature verification failed
                e.printStackTrace();
            }
        }
        
        String response = "This is the response";
        t.sendResponseHeaders(200, response.length());
        OutputStream os = t.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}

```

### Retry Logic

If the notification is not successfully delivered the CardSavr platform will retry the 
notification in intervals of 10, 20, and 40 seconds. Should the CardSavr service experience 
unexpected downtime, all the notifications will be sent for the entire service downtime upon 
service restoration. If for any reason customer webhook recipients are not accessible, we recommend you 
unsubscribe from notifications. Once your servers are up, you can subscribe to notifications again.