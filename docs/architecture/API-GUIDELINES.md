# 🏛️ API & Integration Governance Standards

## 1. Canonical Data Model (CDM)

We adhere to a simplified **ISO 20022** structure for all internal messaging.

### Payment Initiation (PACS.008 Simplification)

**JSON Format (MuleSoft Layer):**

```json
{
  "paymentId": "PAY-123456",
  "amount": 100.5,
  "currency": "EUR",
  "debtor": { "iban": "DE8937..." },
  "creditor": { "iban": "FR7654..." },
  "remittanceInfo": "Invoice #99"
}
```

**XML Format (IBM ACE Layer):**

```xml
<PaymentRequest>
    <MsgID>PAY-123456</MsgID>
    <Amt Ccy="EUR">100.50</Amt>
    <DbtrAcct>DE8937...</DbtrAcct>
    <CdtrAcct>FR7654...</CdtrAcct>
    <RmtInf>Invoice #99</RmtInf>
</PaymentRequest>
```

---

## 2. Interface Standards

| Interface           | Protocol  | Format | Standard              |
| :------------------ | :-------- | :----- | :-------------------- |
| **Experience API**  | HTTP/REST | JSON   | RAML 1.0              |
| **Process API**     | HTTP/REST | JSON   | RAML 1.0              |
| **System API (MQ)** | JMS       | XML    | Internal Schema (XSD) |

---

## 3. Error Handling Standards

All APIs must return errors in this format:

```json
{
  "error": {
    "code": "ERR-SYS-001",
    "message": "Database Connectivity Failed",
    "correlationId": "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
    "timestamp": "2023-10-27T10:00:00Z"
  }
}
```

## 4. Versioning Strategy

- **URI Versioning:** `/api/v1/payments`
- **Breaking Changes:** Require new major version (v2).
- **Non-Breaking:** Additive changes allowed in v1.
