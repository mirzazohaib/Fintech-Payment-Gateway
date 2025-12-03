# 📘 Project Specification: FinTech Payment Gateway

**Version:** 1.0 (Architect Edition)
**Status:** Active Development

---

## 1. Executive Summary

**Project Title:** AI-Powered PSD2 Integration Platform with IBM IIB, MuleSoft & Azure
**Goal:** Create a fully working end-to-end PSD2-compliant integration platform simulating a Tier-1 Bank's landscape.

**Business Value:**

- Modernize legacy banking APIs while keeping core IBM systems.
- Comply with EU PSD2 regulations (SCA, Dynamic Linking).
- Bridge the gap between modern REST JSON and legacy MQ/XML.

---

## 2. Architecture Overview

The solution follows a **Hybrid Integration Architecture**:

- **Channel Layer:** Mobile App / TPP (Third Party Provider).
- **Experience Layer (MuleSoft):** REST APIs for Payment Initiation (PISP) and Account Info (AISP).
- **Process Layer (MuleSoft):** Orchestration of SCA (3DSv2), Fraud Check, and Routing.
- **System Layer (MuleSoft):** Connectivity to Queues (JMS) and Databases.
- **Legacy Layer (IBM ACE):** Message flows handling ISO20022 XML transformations and Core Banking connectivity.
- **Infrastructure:** ActiveMQ, Keycloak (OAuth2), Postgres, Azure Monitor.

---

## 3. Detailed Scope (Epics)

### EPIC-00: Governance & Standards

- Define Canonical Data Models (ISO 20022 `pain.001`).
- Define API Style Guides (RAML 1.0).
- Define GitFlow Branching Strategy.

### EPIC-01: Infrastructure & DevOps

- Docker Compose stack (MQ, Keycloak, DB).
- GitHub Actions CI/CD pipelines.
- Azure Free Tier resource provisioning.

### EPIC-02: Security & Compliance (PSD2)

- **OAuth2/OIDC:** Implemented via Keycloak.
- **SCA:** Strong Customer Authentication with 3DSv2 logic.
- **PII Redaction:** GDPR compliance middleware.

### EPIC-03: System Layer (Mule + MQ)

- JMS Listeners for Async messaging.
- Database Connectors for Audit logging.

### EPIC-04: Legacy Layer (IBM IIB/ACE)

- ESQL Transformations (JSON <-> XML).
- Message Flows for Core Banking Simulation.

### EPIC-05: Process & Experience Layer

- Payment Orchestration Logic.
- Mobile-optimized APIs.
- Global Error Handling.

### EPIC-06: Observability

- Prometheus & Grafana Dashboards.
- Distributed Tracing (Correlation IDs).

### EPIC-08: Quality Engineering

- MUnit Tests (Mule).
- Postman Automation.
- Load Testing (k6).

---

## 4. Compliance Matrix

| Requirement         | Standard  | Implementation             |
| :------------------ | :-------- | :------------------------- |
| **SCA**             | PSD2 RTS  | Keycloak MFA + Mule Policy |
| **Dynamic Linking** | PSD2 RTS  | Signed Transaction IDs     |
| **Logging**         | PCI DSS   | Masked PANs in Logs        |
| **Messaging**       | ISO 20022 | XML Schemas in IBM ACE     |

---

## 5. Technology Stack (Free Tier / Open Source)

- **Integration:** MuleSoft 4 Community Edition
- **Legacy:** IBM App Connect Enterprise (Developer Edition)
- **Broker:** ActiveMQ (Simulating IBM MQ)
- **Identity:** Keycloak
- **Database:** PostgreSQL
- **Monitoring:** Prometheus + Grafana
