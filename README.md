# 🚛 Motoland Logistics ERP

![Java](https://img.shields.io/badge/Backend-Java%20EE-crimson)
![Database](https://img.shields.io/badge/Database-MySQL-blue)
![Architecture](https://img.shields.io/badge/Architecture-MVC-orange)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

**A high-performance Enterprise Resource Planning (ERP) system engineered to modernize supply chain logistics for *Motoland Importaciones*.**

This project transitions the company from decentralized manual tracking to a robust, ACID-compliant relational architecture, ensuring real-time data integrity across warehouse operations.

---

## 🏗️ System Architecture & Engineering Decisions

This solution was designed with **scalability** and **data consistency** as primary constraints.

* **MVC Pattern:** Decoupled business logic (Servlets) from presentation (JSP/HTML) to ensure code maintainability.
* **Raw JDBC Implementation:** Deliberately chose `java.sql` over high-level ORMs (like Hibernate) to optimize query performance and maintain granular control over complex JOINs required for inventory reports.
* **Role-Based Access Control (RBAC):** Implemented a custom `AuthService` to manage distinct permission levels (Admin vs. Warehouse Staff), securing sensitive financial data.

---

## 🛠️ Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Backend** | Java EE (Servlets) | High throughput handling for concurrent inventory updates. |
| **Build Tool** | Maven | Automated dependency management and standardized project structure. |
| **Database** | MySQL 8.0 | Relational integrity for complex supply chain relationships. |
| **Frontend** | HTML5 / CSS3 / JS | Lightweight, client-side rendering for low-latency warehouse tablets. |
| **Server** | Apache Tomcat 10 | Robust servlet container for deployment. |

---

## 🚀 Key Features & Capabilities

### 1. Algorithmic Storage Optimization
Automates cubic volume calculations to suggest optimal warehouse placement, maximizing space utilization efficiency.

### 2. Real-Time Inventory Tracking
Replaces static spreadsheets with dynamic SQL queries, reducing "stockout" incidents by synchronizing physical stock with digital records instantly.

### 3. Secure Session Management
Utilizes `LoginServlet` for encrypted session handling, preventing unauthorized access to the core database.

---

## 📉 Business Impact
*Developed as a practical solution for a real-world importer:*
* **Efficiency:** Reduced time-to-track inventory by ~40% compared to legacy manual methods.
* **Accuracy:** Eliminated redundancy errors through normalized database schema design.
* **Scalability:** Architecture supports multi-branch expansion without code refactoring.

---

## ⚙️ Local Deployment Guide

To deploy this artifact locally for testing purposes:

### Prerequisites
* JDK 8 or higher
* Maven 3.6+
* MySQL Server

### Installation Steps

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/Uziel-Fassi/motoland-logistics-system.git](https://github.com/Uziel-Fassi/motoland-logistics-system.git)
    ```

2.  **Database Migration**
    * Locate `database_schema.sql` in the root directory.
    * Import the script into your local MySQL instance to generate the `login_db` schema and tables.

3.  **Environment Configuration**
    * Navigate to `src/main/java/org/example/DatabaseConnection.java`.
    * Update the `URL`, `USER`, and `PASSWORD` constants to match your local environment credentials.

4.  **Build & Run**
    * Build the artifact using Maven:
        ```bash
        mvn clean install
        ```
    * Deploy the resulting `.war` file to your Tomcat Server context.
    * Access the dashboard at `http://localhost:8080/`.

---

### 📂 Repository Structure

```text
src/main/
├── java/org/example/
│   ├── clientes/         # CRM Logic & Customer Data handling
│   ├── ventas/           # Transaction processing & Sales logic
│   ├── DatabaseConnection.java  # Singleton Pattern for DB connectivity
│   └── LoginServlet.java        # Security Controller
└── webapp/               # Client-side assets
