## 🚀 Employee Management System (EMS) **

A full-stack **Employee Management System** built using modern technologies like **ASP.NET Core Web API**, **Angular**, and **SQL Server**.
This project demonstrates real-world enterprise application development with secure authentication, role-based access, and scalable architecture.

---

## 📌 Project Overview

The Employee Management System (EMS) is designed to manage employee data efficiently within an organization.
It provides secure access based on user roles and enables streamlined management of employees, departments, and designations.

---

## 🛠 Tech Stack

### 🔹 Backend

* ASP.NET Core Web API (.NET 8)
* Entity Framework Core (Database-First)
* SQL Server
* JWT Authentication

### 🔹 Frontend

* Angular
* Angular Material
* TypeScript
* HTML, CSS

---

## 🔐 Key Features

### ✅ Authentication & Authorization

* Secure JWT-based authentication
* Role-Based Access Control:

  * **Admin** → Full access (CRUD + Delete)
  * **HR** → Create & Update
  * **Employee** → Read-only access

---

### 👨‍💼 Employee Management

* Create, Read, Update, Delete (CRUD)
* Server-side Pagination
* Search, Filtering, Sorting

---

### 🏢 Department & Designation Management

* Manage departments and designations
* Dropdown integration in employee forms

---

### 🎨 Frontend Features

* Angular Material UI
* Responsive data tables
* Dialog-based forms (Add/Edit)
* Confirmation dialogs for delete
* Global loading spinner
* Snackbar notifications

---

### ⚙️ Backend Features

* Clean API architecture
* DTOs with validation
* Global exception handling middleware
* Standardized API responses
* Secure endpoints using JWT

---

## 🏗 Project Structure

```plaintext
EmployeeManagementSystem/
│
├── backend/        # ASP.NET Core Web API
├── frontend/       # Angular Application
├── database/       # SQL Script for DB setup
└── README.md
```

---

## 🚀 Getting Started

### 🔹 Backend Setup

1. Open the backend project in Visual Studio
2. Update `appsettings.json` with your SQL Server connection string
3. Run the API

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Access the application at:

```
http://localhost:4200
```

---

## 🗄 Database Setup

1. Open SQL Server (SSMS)
2. Create a new database (e.g., `EMS_DB`)
3. Run the SQL script:

   ```
   database/EmployeemanagementDB.sql
   ```
4. Update connection string in `appsettings.json`

---

## 🔑 Sample Roles & Access

| Role     | Permissions        |
| -------- | ------------------ |
| Admin    | Full CRUD + Delete |
| HR       | Create & Update    |
| Employee | View Only          |

---

## 📸 Screenshots

> *(Add screenshots here for better presentation)*

* Login Page
* Employee List
* Add/Edit Employee Dialog

---

## 📚 Learning Outcomes

* Built a complete full-stack enterprise application
* Implemented JWT authentication and role-based authorization
* Worked with real-world API design and Angular integration
* Improved debugging and problem-solving skills
* Gained hands-on experience with clean architecture practices

---

## 📬 Contact

* **Name:** Hussain Basha Shaik
* **LinkedIn:** *(Add your LinkedIn profile link)*
* **Email:** *(Add your email address)*

---

## ⭐ Acknowledgment

This project was developed as part of my learning journey in **Full Stack Development** using .NET and Angular.

---
