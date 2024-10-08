
# ProManage Suite

**ProManage Suite** is a comprehensive project management platform designed to streamline task coordination, user collaboration, and project tracking. Built with a React frontend and Node.js backend, it offers seamless integration for efficient project oversight and reporting.

## Features

- **User Authentication**: Secure login and registration system for user management.
- **Project Management**: Allows creation, viewing, updating, and deletion of projects.
- **Task Management**: Enables users to create, view, update, and delete tasks assigned to projects.
- **Collaborator Management**: Associate users as collaborators on tasks.
- **Reporting**: Generate reports with detailed project summaries, including task and collaborator information.

## Project Structure

```
ProManage-Suite/
├── backend                   # Node.js/Express backend
│   ├── controllers           # API request handling
│   ├── middleware            # Authentication middleware
│   ├── models                # Mongoose schemas
│   ├── routes                # API routes
│   └── server.js             # Main server file
└── frontend                  # React frontend
    ├── public
    └── src
        ├── components        # Reusable components and pages
        ├── context           # Auth context
        └── App.js            # Root React component
```

## Prerequisites

- **Backend**:
  - Node.js and npm installed
  - MongoDB instance running locally or on a server
- **Frontend**:
  - Backend API up and running

## Environment Variables

### Backend

In the backend directory, create a `.env` file with the following variables:

```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001
```

### Frontend

In the frontend directory, create a `.env` file with:

```plaintext
REACT_APP_BACKEND_URL=http://localhost:5001
```

Adjust the URLs if deploying on a different server.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/aishwaryamensinkai/ProManage-Suite.git
   cd ProManage-Suite
   ```

2. **Install dependencies for both backend and frontend**:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

## Running the Application

1. **Start the Backend**:

   ```bash
   cd backend
   npm start
   ```

2. **Start the Frontend**:

   ```bash
   cd ../frontend
   npm start
   ```

3. **Access the Application**:

   Visit `http://localhost:3000` for the frontend and `http://localhost:5001` for the backend API.

## Testing API Endpoints with `curl`

Here are some `curl` commands for testing:

- **User Login**
  ```bash
  curl -X POST http://localhost:5001/api/login -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "password"}'
  ```

- **Create Project**
  ```bash
  curl -X POST http://localhost:5001/api/projects -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"name": "New Project", "status": "In Progress"}'
  ```

Replace `<token>` with the token received from the login response.

---

ProManage Suite is ready to help you manage projects efficiently with a robust architecture and a user-friendly interface.
