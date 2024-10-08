
# Project Management Application

This is a React-based frontend for managing projects and tasks. The application integrates with a backend API to manage user authentication, project, and task management, as well as reporting features.

## Project Structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.js                      # Main application component
    ├── components                  # UI components for features
    │   ├── Auth
    │   │   ├── Home.js             # User login and registration
    │   │   └── LoginHome.js        # Landing page after login
    │   ├── Layout
    │   │   └── Navbar.js           # Navigation bar component
    │   ├── Projects
    │   │   ├── ProjectForm.js      # Form to create or edit a project
    │   │   ├── ProjectList.js      # Lists all projects
    │   │   └── ProjectPage.js      # Detailed project view
    │   ├── Reports
    │   │   └── ReportCreator.js    # Generate reports for projects
    │   └── Tasks
    │       ├── TaskForm.js         # Form to create or edit a task
    │       ├── TaskList.js         # Lists all tasks by project
    │       └── TaskPage.js         # Detailed task view
    ├── context
    │   └── AuthContext.js          # Authentication context provider
    ├── index.css                   # Global styles
    └── index.js                    # Entry point
```

## Prerequisites

- Node.js and npm installed
- `Axios` library for API calls
- Backend API URL available in `.env` file

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
REACT_APP_BACKEND_URL=http://localhost:5001
```

## Installation

1. Navigate to the project directory:

   ```bash
   cd project-management-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

To start the development server, run:

```bash
npm start
```

This will run the app on `http://localhost:3000`.

## API Documentation

The application interacts with a backend API that requires authentication and includes routes for managing projects, tasks, and generating reports. Ensure a valid token is stored in localStorage under `token`.

### Example API Calls with curl

Replace `:id` with specific task or project IDs, and `:token` with your authorization token.

- **Login**
  ```bash
  curl -X POST http://localhost:5001/api/login -d '{"email": "user@example.com", "password": "password"}' -H "Content-Type: application/json"
  ```

- **Fetch All Projects**
  ```bash
  curl -X GET http://localhost:5001/api/projects -H "Authorization: Bearer :token"
  ```

- **Create a Project**
  ```bash
  curl -X POST http://localhost:5001/api/projects -d '{"name": "New Project", "status": "In Progress"}' -H "Authorization: Bearer :token" -H "Content-Type: application/json"
  ```

- **Fetch All Tasks**
  ```bash
  curl -X GET http://localhost:5001/api/tasks -H "Authorization: Bearer :token"
  ```

- **Create a Task**
  ```bash
  curl -X POST http://localhost:5001/api/tasks -d '{"name": "New Task", "status": "Not Started", "value": 100}' -H "Authorization: Bearer :token" -H "Content-Type: application/json"
  ```

## Testing

- Test components independently using curl commands above or interact with the UI via a browser.
- Use `Postman` or similar tools to verify the backend API responses, ensuring the correct data is returned to the frontend.

## Additional Information

This project is built using React and Material-UI for component styling and layout. The application relies on a backend for authentication and CRUD operations, with authorization checks implemented in protected routes.

---

This README file provides the necessary setup and configuration instructions for the project management frontend.
