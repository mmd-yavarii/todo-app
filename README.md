# Fullstack Todo App with Auth (Next.js + MongoDB)

This is a simple fullstack Todo application built with **Next.js**, **MongoDB**, and **JWT authentication**.  
It allows users to create, view, complete, and delete their own todos after logging in securely.

---

## 🔐 Features

-   **User authentication** with JWT
-   **Secure API access** using cookies and token validation
-   **Todo ownership validation** – users can only access and modify their own todos
-   **Mark todos as done**
-   **Delete todos**
-   Fully protected backend routes

---

## 🛠 Tech Stack

-   **Next.js** (Frontend + API routes)
-   **MongoDB** (Local instance)
-   **Mongoose** (for MongoDB models)
-   **JWT** (JSON Web Token for auth)
-   **bcryptjs** (for password hashing)
-   **cookie** (for reading JWT from cookies)

---

## 🚀 How to Run

### 1. Clone the project

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### 2. create a file named .env and put these in it
```bash
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_secret_key
```

### 3. run app 
```bash
npm install 
npm run dev
```
