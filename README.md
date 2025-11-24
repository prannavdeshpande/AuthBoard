# AuthBoard: Full-Stack Task Management API

AuthBoard is a secure, scalable, and feature-complete RESTful API for a task management application, built with a modern PERN (PostgreSQL, Express.js, React.js, Node.js) stack. It includes a functional frontend for user interaction and testing. This project was developed to demonstrate core competencies in backend development, API design, security, and full-stack integration.

## Features

*   **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens) with password hashing (bcryptjs).
*   **Role-Based Access Control (RBAC):** Differentiated access levels between standard `users` and `admins`. Admins have elevated privileges, such as viewing all tasks across the system.
*   **Protected CRUD Operations:** Full Create, Read, Update, and Delete functionality for tasks. Routes are protected, ensuring users can only access and manage their own data.
*   **RESTful API Design:** Follows REST principles with proper use of HTTP methods, status codes, and a versioned API (`/api/v1/`).
*   **Data Validation:** Server-side validation of incoming data to ensure integrity and prevent errors.
*   **Functional Frontend:** A clean, responsive frontend built with React.js allows for user registration, login, and full task management from the browser.

## Tech Stack

*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL (hosted on Neon)
*   **Frontend:** React.js (bootstrapped with Vite)
*   **Authentication:** JSON Web Tokens (JWT), bcryptjs
*   **API Testing:** Postman

## Local Setup & Installation

Follow these steps to run the project locally.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn
*   Postman (for API testing)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    *   Create a `.env` file in the `backend` root.
    *   Copy the contents of `.env.example` (or use the template below) and fill in your database credentials and a JWT secret.
    ```ini
    PORT=5000
    DB_USER=your_db_user
    DB_HOST=your_db_host
    DB_DATABASE=your_db_name
    DB_PASSWORD=your_db_password
    DB_PORT=5432
    JWT_SECRET=your_super_strong_jwt_secret
    ```
4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The server will be running at `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    yarn install
    ```
3.  **Start the frontend development server:**
    ```bash
    yarn dev
    ```
    The React application will be available at `http://localhost:5173`.

## API Documentation

The complete API can be tested using the provided Postman collection:
[**AuthBoard.postman_collection.json**](./AuthBoard.postman_collection.json)

You can import this file directly into Postman to access all endpoints with examples.

## Scalability and Deployment Readiness

(This is the section we wrote earlier. Copy it here.)

This project was built with production scalability in mind...
... (paste the full scalability note here) ...
