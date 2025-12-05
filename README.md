# FinTech Payment Gateway (PSD2/SCA)

![Build Status](https://img.shields.io/badge/Build-Initializing-yellow) ![MuleSoft](https://img.shields.io/badge/Platform-MuleSoft-blue) ![IBM](https://img.shields.io/badge/Legacy-IBM%20ACE-green)

An enterprise integration platform demonstrating **Hybrid Connectivity** between modern REST APIs (MuleSoft) and legacy core banking systems (IBM ACE/MQ).

---

## 🎯 Project Scope

This project implements a PSD2-compliant payment initiation flow. It simulates a Tier-1 banking environment where:

- **MuleSoft** handles the Experience and Process layers (SCA validation, Orchestration).
- **IBM ACE (IIB)** manages the System of Record connectivity (Legacy XML, Mainframe).
- **Azure & Docker** provide the underlying infrastructure (API Management, Identity, Messaging).

---

## 🌍 Architecture

### High-Level Design

This solution bridges the gap between Cloud-Native Experience APIs and On-Premise Mainframe systems using an Event-Driven Architecture.

```mermaid
graph TD
    %% Users
    User([📱 Mobile User])

    %% Layers
    subgraph Experience_Layer [Experience Layer]
        ExpAPI[📱 Mobile Exp API]
    end

    subgraph Process_Layer [Process Layer]
        ProcPay[⚙️ Payment Process API]
        Proc3DS[🛡️ 3DSv2 Logic]
    end

    subgraph System_Layer [System Layer]
        SysMQ[🔌 MQ System API]
        SysDB[💾 Audit DB System API]
    end

    subgraph Infrastructure [Infrastructure Docker/Azure]
        MQ((ActiveMQ / IBM MQ))
        Keycloak{🔑 Keycloak IAM}
        DB[(Postgres Audit DB)]
    end

    subgraph Legacy_Layer [Legacy Layer IBM ACE]
        IIB[⚙️ IBM ACE IIB Integration]
        Core[🏛️ Core Banking Mock]
    end

    %% Flow
    User -->|HTTPS/JSON| ExpAPI
    ExpAPI -->|Validate Token| Keycloak
    ExpAPI --> ProcPay

    ProcPay -->|Check Risk| Proc3DS
    ProcPay -->|Submit Payment| SysMQ
    ProcPay -->|Log Event| SysDB

    SysMQ -->|JMS| MQ
    SysDB -->|SQL| DB

    MQ -->|XML Message| IIB
    IIB -->|TCP/ISO8583| Core

    %% Styling
    style User fill:#f9f,stroke:#333,stroke-width:2px,color:black
    style MQ fill:#ff9,stroke:#333,stroke-width:2px,color:black
    style IIB fill:#9f9,stroke:#333,stroke-width:2px,color:black
    style Keycloak fill:#f96,stroke:#333,stroke-width:2px,color:black
```

---

## 🏗 Tech Stack & Compliance

| Component       | Technology               | Role                               |
| :-------------- | :----------------------- | :--------------------------------- |
| **Integration** | MuleSoft 4 (Community)   | API-Led Connectivity               |
| **Legacy**      | IBM ACE 12 (App Connect) | Core Banking Adapter               |
| **Messaging**   | ActiveMQ                 | JMS Broker (Simulating IBM MQ)     |
| **Security**    | Keycloak                 | OAuth2 & OpenID Connect (PSD2 SCA) |
| **Database**    | PostgreSQL               | Audit & Transaction Log            |
| **Monitoring**  | Prometheus + Grafana     | Observability & Tracing            |

### Compliance Matrix

- **PSD2 SCA:** Implemented via Keycloak MFA & MuleSoft Policies.
- **ISO 20022:** Canonical Data Model enforced at the System Layer.
- **GDPR:** PII Redaction Middleware implemented in Process Layer.

---

## 🚀 Getting Started

**Prerequisites:** Docker, Anypoint Studio, IBM ACE Toolkit.

```bash
# 1. Clone Repository
git clone https://github.com/mirzazohaib/Fintech-Payment-Gateway.git

# 2. Start Infrastructure (MQ, Auth, DB)
docker-compose -f mq/docker-compose.yml up -d
```

---

## 🧪 Testing Strategy

- **Unit:** MUnit (Mule), ESQLUnit (IBM).
- **Integration:** Postman Collections (in \`/tests/postman\`).
- **Load:** k6 scripts (in \`/scripts/load-testing\`).

---

## 📉 Agile Delivery Methodology

This project follows a strict **Hybrid Agile** methodology managed via JIRA, separating Development (Scrum) from Operations (Kanban).

- **Sprints:** 2-week delivery cycles for API and Integration logic.
- **Kanban:** Continuous flow for Infrastructure (Docker/Azure) and Observability tasks.
- **Epics:** Structured by Architectural Layer (System, Process, Experience).

![JIRA Backlog](docs/diagrams/jira-backlog.png)

---

## 📸 Implementation Evidence (Sprint 2)

### 1. MQ System API (JMS Integration)

**Goal:** Establish asynchronous connectivity between the Integration Layer and the Message Broker.
**Proof:** The composite screenshot below demonstrates:

1.  **Mule Flow:** The System API publishing a JSON payload to the `payment.request` queue.
2.  **Client Request:** Postman successfully submitting a payment (`200 OK`).
3.  **Consumption:** The Mule JMS Listener asynchronously picking up the message from ActiveMQ logs.

![MQ System API Proof](docs/diagrams/evidence-sys-mq.png)

### 2. Audit DB System API (PostgreSQL Persistence)

**Goal:** Persist transaction logs to a secured Audit Database for compliance.
**Proof:** The composite screenshot below demonstrates:

1.  **Mule Flow:** The System API accepting a JSON log event.
2.  **Persistence:** The **Database Connector** successfully inserting the record into the Postgres container (port 5435).
3.  **Verification:** The SQL query confirms the data is committed to the `audit_logs` table.

![Audit DB System API Proof](docs/diagrams/evidence-sys-audit.png)
