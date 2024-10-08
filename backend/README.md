
# Project Management API

This project is a Node.js/Express-based API for managing projects, tasks, and users. It includes authentication, value tracking for tasks, and generates project reports.

## Prerequisites

- Node.js and npm installed
- MongoDB instance running locally or on a server
- `Postman` (optional, for API testing)

## Project Structure

```
.
├── config
│   └── db.js               # Database connection configuration
├── controllers             # API logic for handling requests
│   ├── projectController.js
│   ├── reportController.js
│   ├── taskController.js
│   └── userController.js
├── middleware
│   └── authMiddleware.js   # Middleware for authentication
├── models                  # Mongoose schemas for MongoDB
│   ├── Project.js
│   ├── Task.js
│   └── User.js
├── routes                  # Express route definitions
│   ├── projectRoutes.js
│   ├── reportRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
└── server.js               # Main server file
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd project-management-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001
```

## Running the Server

Start the server with:

```bash
npm start
```

or for development with live-reloading:

```bash
npm run dev
```

## API Documentation

### User Authentication

- **Register**
  - `POST /register`
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`

  ```bash
  curl -X POST http://localhost:5000/register        -H "Content-Type: application/json"        -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
  ```

- **Login**
  - `POST /login`
  - Body: `{ "email": "john@example.com", "password": "password123" }`

  ```bash
  curl -X POST http://localhost:5000/login        -H "Content-Type: application/json"        -d '{"email": "john@example.com", "password": "password123"}'
  ```

### Project Management

- **Create a Project**
  - `POST /projects`
  - Headers: `{ Authorization: Bearer <token> }`
  - Body: `{ "name": "Project Name", "status": "Active" }`

  ```bash
  curl -X POST http://localhost:5000/projects        -H "Authorization: Bearer <token>"        -H "Content-Type: application/json"        -d '{"name": "Project Name", "status": "Active"}'
  ```

- **Get All Projects**
  - `GET /projects`
  - Headers: `{ Authorization: Bearer <token> }`

  ```bash
  curl -X GET http://localhost:5000/projects        -H "Authorization: Bearer <token>"
  ```

### Task Management

- **Create a Task**
  - `POST /tasks`
  - Headers: `{ Authorization: Bearer <token> }`
  - Body: `{ "name": "Task Name", "status": "In Progress", "project": "<project_id>", "collaborators": ["email1", "email2"], "value": 100 }`

  ```bash
  curl -X POST http://localhost:5000/tasks        -H "Authorization: Bearer <token>"        -H "Content-Type: application/json"        -d '{"name": "Task Name", "status": "In Progress", "project": "<project_id>", "collaborators": ["email1@example.com"], "value": 100 }'
  ```

- **Get All Tasks**
  - `GET /tasks`
  - Headers: `{ Authorization: Bearer <token> }`

  ```bash
  curl -X GET http://localhost:5000/tasks        -H "Authorization: Bearer <token>"
  ```

### Report Generation

- **Generate Report**
  - `GET /report`
  - Headers: `{ Authorization: Bearer <token> }`

  ```bash
  curl -X GET http://localhost:5000/report        -H "Authorization: Bearer <token>"
  ```

## Testing

You can test the endpoints using `curl` or `Postman`. For token-protected routes, include the token in the `Authorization` header as `Bearer <token>`.

### Seed Data

To prepopulate data for testing, create sample documents in MongoDB for `Project`, `Task`, and `User` collections or use the endpoints to create entries.
