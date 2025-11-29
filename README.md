# Motoland Logistics Platform 🚛

**A full-stack inventory management system engineered to centralize warehouse operations and optimize supply chain workflows.**

This project was developed as a practical solution for *Motoland Importaciones* to replace manual tracking methods with a robust, scalable relational database architecture.

---

## 🛠️ Tech Stack

* **Backend:** Java EE (Servlets), Maven Architecture.
* **Database:** MySQL (Relational Schema with UTF-8 support).
* **Frontend:** HTML5, CSS3, JavaScript (Located in `webapp`).
* **Tools:** IntelliJ IDEA, Git, Tomcat Server.

---

## 🚀 Key Features

* **Centralized Inventory:** Real-time tracking of stock levels using a SQL backend.
* **Secure Authentication:** Role-based login system managed by `AuthService` and `LoginServlet`.
* **Operational Logic:** Automated calculations for cubic volume and storage optimization.
* **Data Persistence:** Robust JDBC connection ensuring zero data redundancy.

---

## ⚙️ Installation & Setup

To run this project locally, you need a Java environment (JDK 8+), Maven, and a MySQL server.

### 1. Clone the Repository

    git clone [https://github.com/Uziel-Fassi/motoland-logistics-system.git](https://github.com/Uziel-Fassi/motoland-logistics-system.git)

### 2. Database Configuration 🗄️
The project relies on a local MySQL database named `login_db`.

1.  Locate the file `database_schema.sql` in the root folder of this project.
2.  Import this file into your MySQL server (using HeidiSQL, Workbench, or CLI).
3.  **Note:** The script will automatically create the `login_db` database and the necessary tables.

### 3. Configure the Connection 🔌
To connect the Java backend to your local database, you must update your credentials.

1.  Navigate to: `src/main/java/org/example/DatabaseConnection.java`
2.  Update the `USER` and `PASSWORD` constants to match your local MySQL installation:

    package org.example;

    import java.sql.Connection;
    import java.sql.DriverManager;
    import java.sql.SQLException;

    public class DatabaseConnection {
        // Ensure your MySQL server is running on port 3306
        private static final String URL = "jdbc:mysql://localhost:3306/login_db?useUnicode=true&characterEncoding=UTF-8";
        private static final String USER = "root"; // Change if your user is different
        private static final String PASSWORD = "YOUR_LOCAL_PASSWORD"; // <--- PUT YOUR PASSWORD HERE

        public static Connection getConnection() throws SQLException {
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
            return DriverManager.getConnection(URL, USER, PASSWORD);
        }
    }

### 4. Build & Run
1.  Open the project in **IntelliJ IDEA**.
2.  Ensure **Maven** loads the dependencies (check `pom.xml`).
3.  Configure a **Tomcat Server** (ver 9.0 or higher):
    * **Deployment:** Add the exploded WAR artifact.
    * **Application Context:** `/` (or `/motoland`).
4.  Run the server and access the login page at: `http://localhost:8080/`

---

## 📂 Project Structure

    src/main/
    ├── java/org/example/
    │   ├── clientes/       # Customer management logic
    │   ├── ventas/         # Sales processing
    │   ├── DatabaseConnection.java  # JDBC Singleton
    │   └── LoginServlet.java        # Auth Controller
    └── webapp/
        ├── style.css       # Global styles
        ├── productos-ubicacion.js # Frontend logic
        └── index.html      # Entry point

---

### 👨‍💻 Author
**Uziel Fassi** - *Computer Science Undergraduate & Product Engineer*
[LinkedIn](https://www.linkedin.com/in/uziel-fassi-08840a287/) | [Portfolio](https://myportfoliouzielf.framer.website)
