## 📸 Implementation Evidence

### 1. MQ System API (JMS Integration)

**Goal:** Establish asynchronous connectivity between the Integration Layer and the Message Broker.
**Proof:** The composite screenshot below demonstrates:

1.  **Mule Flow:** The System API publishing a JSON payload to the `payment.request` queue.
2.  **Client Request:** Postman successfully submitting a payment (`200 OK`).
3.  **Consumption:** The Mule JMS Listener asynchronously picking up the message from ActiveMQ logs.

![MQ System API Proof](/docs/evidence/evidence-sys-mq.png)

### 2. Audit DB System API (PostgreSQL Persistence)

**Goal:** Persist transaction logs to a secured Audit Database for compliance.
**Proof:** The composite screenshot below demonstrates:

1.  **Mule Flow:** The System API accepting a JSON log event.
2.  **Persistence:** The **Database Connector** successfully inserting the record into the Postgres container (port 5435).
3.  **Verification:** The SQL query confirms the data is committed to the `audit_logs` table.

![Audit DB System API Proof](/docs/evidence/evidence-sys-audit.png)

### 3. Legacy Layer (IBM ACE)

**Goal:** Orchestrate Core Banking connectivity using standard ESQL transformation logic.
**Proof:** The screenshot below shows the **IBM App Connect Enterprise (ACE)** toolkit with the `Payment_Flow` implementation.

1.  **Message Flow:** Reads from `PAYMENT.REQUEST`, processes via Compute Node, and writes to `CORE.BANKING.IN`.
2.  **ESQL Logic:** Validates the Schema `com.fintech.payments` matches the project structure.

![IBM ACE Flow](/docs/evidence/evidence-iib-flow.png)

---
