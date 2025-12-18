# FinTech Payment Gateway (PSD2/SCA)

![Build Status](https://img.shields.io/badge/Build-Initializing-yellow) ![MuleSoft](https://img.shields.io/badge/Platform-MuleSoft-blue) ![IBM](https://img.shields.io/badge/Legacy-IBM%20ACE-green)

An enterprise integration platform demonstrating **Hybrid Connectivity** between modern REST APIs (MuleSoft) and legacy core banking systems (IBM ACE/MQ).

---

## 📚 Documentation Index

| Document                                                     | Description                                                                       |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **[📘 Project Specification](PROJECT-SPEC.md)**              | Full functional requirements, scope, and user stories.                            |
| **[🏛️ API Guidelines](docs/architecture/API-GUIDELINES.md)** | Governance standards for RAML, ISO20022 Data Models, and Error Handling.          |
| **[📸 Implementation Evidence](docs/evidence/EVIDENCE.md)**  | **Start Here:** Screenshots, logs, and database records proving the system works. |

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

We employ a "Shift-Left" testing approach to ensure quality before deployment. All tests are now automated via the CI pipeline.

| Type                  | Tool           | Location                   | Status                                                                                                    |
| :-------------------- | :------------- | :------------------------- | :-------------------------------------------------------------------------------------------------------- |
| **Unit & Functional** | MUnit          | `*/src/test/munit`         | ✅ **Completed** ([See Evidence](docs/evidence/EVIDENCE.md#6-quality-assurance-automated-testing-qa-002)) |
| **Integration**       | Postman        | `tests/postman`            | ✅ **Completed** (Collection Available)                                                                   |
| **Load & Stress**     | k6             | `scripts/load-testing`     | ✅ **Completed** ([See Evidence](docs/evidence/EVIDENCE.md#7-performance-testing-load--stress))           |
| **CI Automation**     | GitHub Actions | `.github/workflows/ci.yml` | ✅ **Live** (Runs on Push)                                                                                |

---

## 🔜 Future Roadmap

The following initiatives are planned for the **v1.2.0** release cycle:

| ID             | Initiative                     | Description                                                                                                                          |
| :------------- | :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **[OPS-003]**  | **Continuous Deployment (CD)** | Automate the deployment of artifacts to a runtime (CloudHub/Runtime Fabric) immediately after a successful build.                    |
| **[QA-004]**   | **Tech Debt Cleanup**          | Refactor `exp-mobile-api` and `proc-payment-api` to enable full MUnit execution by further isolating the Micrometer/Scripting logic. |
| **[ARCH-001]** | **API Façade Pattern**         | Refactor the Experience Layer to be channel-agnostic (Web vs Mobile).                                                                |
| **[OPS-004]**  | **Blue/Green Deployment**      | Implement zero-downtime updates using Docker Compose profiles.                                                                       |
| **[DEMO-001]** | **Automated Demo**             | Create a shell script to spin up the stack and run a full end-to-end transaction automatically.                                      |

---

## 📉 Agile Delivery Methodology

This project follows a strict **Hybrid Agile** methodology managed via JIRA, separating Development (Scrum) from Operations (Kanban).

- **Sprints:** 2-week delivery cycles for API and Integration logic.
- **Kanban:** Continuous flow for Infrastructure (Docker/Azure) and Observability tasks.
- **Epics:** Structured by Architectural Layer (System, Process, Experience).

![JIRA Backlog](docs/diagrams/jira-backlog.png)

---
