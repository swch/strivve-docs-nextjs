# Card Links

## Overview

The **Card Links** interface allows users to upload CSV files containing cardholder, card, and address information. This process generates card entities in the system and provides unique card links for each cardholder. These links direct the cardholder to the Card Links journey.

---

## How It Works

1. **Select Financial Institution** (if admin):
   If you are logged in under the admin FI, you must select the financial institution for which you will be creating card links.

2. **Get Template**:
   A template CSV file containing the required header row properties can be downloaded by clicking the "Download CSV Template" button.

3. **Upload CSV File**:
   After filling the CSV in with cardholder, card, and address information, click "Browse files to upload" and select your CSV file. Press the "Upload" button to start the upload.

4. **Download**:
   Your file will be processed and a new CSV will be generated, with each row containing the newly created `card_id`, card link URL, and the expiration date of the card link. A dialog box with a link for downloading will appear when the CSV is ready.

5. **Download Previously Generated Card Link CSVs**:
   A list of previously generated card link CSVs appears under "Available Downloads." Click the green download icon next to the file name to download it again.

---

## CSV Format

### Notes

* The header row must match exactly.
* CVVs must be hashed and Base64 encoded before uploading.

Each CSV must contain the following headers:

| Field Name                           | Description                                                                                                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cardholder.cuid`                    | Unique identifier for the cardholder (CUID).                                                                                                                                                         |
| `cardsavr_card.pan`                  | Primary Account Number (the card number).                                                                                                                                                            |
| `cardsavr_card.expiration_year`      | Card expiration year (last two digits, e.g., 29 = 2029).                                                                                                                                             |
| `cardsavr_card.expiration_month`     | Card expiration month (1–12).                                                                                                                                                                        |
| `cardsavr_card.name_on_card`         | Full name as it appears on the card.                                                                                                                                                                 |
| `cardsavr_card.cvv_hash`             | Must be provided if not providing the plaintext CVV. This must be a SHA-256 hash with Base64 encoding of the CVV. A sample JavaScript function for generating the hash is provided below this table. |
| `cardsavr_card.cvv`                  | Plain text CVV. Must be provided if not providing a CVV hash.                                                                                                                                        |
| `cardsavr_card.customer_key`         | Optional external reference for identifying the card. If not provided, one will be generated.                                                                                                        |
| `cardsavr_card.nickname`             | Nickname for the card (e.g., "Primary Card").                                                                                                                                                        |
| `cardsavr_card.address.address1`     | Street address line 1.                                                                                                                                                                               |
| `cardsavr_card.address.address2`     | Street address line 2 (optional).                                                                                                                                                                    |
| `cardsavr_card.address.city`         | City.                                                                                                                                                                                                |
| `cardsavr_card.address.subnational`  | State, province, or region.                                                                                                                                                                          |
| `cardsavr_card.address.country`      | Country (e.g., USA).                                                                                                                                                                                 |
| `cardsavr_card.address.postal_code`  | Postal or ZIP code.                                                                                                                                                                                  |
| `cardsavr_card.address.email`        | Email address of the cardholder.                                                                                                                                                                     |
| `cardsavr_card.address.phone_number` | Phone number. (Format guidance may be necessary if issues arise.)                                                                                                                                    |
| `cardsavr_card.address.first_name`   | Cardholder's first name.                                                                                                                                                                             |
| `cardsavr_card.address.last_name`    | Cardholder's last name.                                                                                                                                                                              |
| `cardsavr_card.address.is_primary`   | Whether this address is the primary address for the cardholder (`TRUE` or `FALSE`).                                                                                                                  |

---

## CVV hash generation function (javascript)

```javascript
const generate_b64_hash_from_string = function (string) {
    const hash = crypto.createHash("sha256");
    hash.update(string);
    const binary_hash = hash.digest();

    return binary_hash.toString("base64");
};
```

---

## Example CSV Content

Here is an example of what a single row might look like in the required CSV format:

| cardholder.cuid | cardsavr\_card.pan | cardsavr\_card.expiration\_year | cardsavr\_card.expiration\_month | cardsavr\_card.name\_on\_card | cardsavr\_card.cvv\_hash                     | cardsavr\_card.cvv | cardsavr\_card.customer\_key | cardsavr\_card.nickname | cardsavr\_card.address.address1 | cardsavr\_card.address.address2 | cardsavr\_card.address.city | cardsavr\_card.address.subnational | cardsavr\_card.address.country | cardsavr\_card.address.postal\_code | cardsavr\_card.address.email                        | cardsavr\_card.address.phone\_number | cardsavr\_card.address.first\_name | cardsavr\_card.address.last\_name | cardsavr\_card.address.is\_primary |
| --------------- | ------------------ | ------------------------------- | -------------------------------- | ----------------------------- | -------------------------------------------- | ------------------ | ---------------------------- | ----------------------- | ------------------------------- | ------------------------------- | --------------------------- | ---------------------------------- | ------------------------------ | ----------------------------------- | --------------------------------------------------- | ------------------------------------ | ---------------------------------- | --------------------------------- | ---------------------------------- |
| Gigi6cf4dbkaax  | 1234123412341234   | 29                              | 11                               | Lewis Carroll                 | K+z7nM1/1sQbCkmn6D2AcrSu3cTHkP9r+ImhQ1ob6EM= |                    | KEY\_nl05pta                 | Primary Card            | 978 Tweedledum Street           |                                 | Wonderland                  | WA                                 | USA                            | 98177                               | [alice@wonderland.com](mailto:alice@wonderland.com) | 555-555-5555                         | Lewis                              | Carroll                           | TRUE                               |
