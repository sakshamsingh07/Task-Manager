Introduction:
This project is a backend API developed using Express.js and MongoDB to manage tasks and subtasks for users within an application. The API enables users to perform CRUD (Create, Retrieve, Update, Delete) operations on tasks and their associated subtasks while ensuring that any deleted tasks or subtasks are excluded from GET API responses without affecting the ability to perform CRUD operations.

Key Features:

1. User Record Separation: Each user has a dedicated record within the database for storing tasks and subtasks.
2. Task and Subtask Storage: All tasks and their corresponding subtasks for a user are saved within the same user record.
3. Soft Deletion Handling: Tasks and subtasks marked as deleted remain in the database but are excluded from GET responses.
4. Task CRUD API: Supports creating, retrieving, updating, and deleting individual tasks.
5. Subtask CRUD API: Allows managing the list of subtasks for a specific task, with support for updating multiple subtasks at once.
   
Tech Stack:

Node.js & Express.js: Server-side framework used to build the API.
MongoDB & Mongoose: NoSQL database and ORM for managing user, task, and subtask data.

Project Structure:

/config
  └── db.js             // Database connection setup
/controllers
  └── taskController.js // Task-related controller logic
  └── subtaskController.js // Subtask-related controller logic
  └── userController.js // User-related controller logic
/models
  └── task.js           // Task Mongoose schema and model
  └── subtask.js        // Subtask Mongoose schema and model
  └── user.js           // User Mongoose schema and model
/routes
  └── taskRoutes.js     // Task-related routes
  └── subtaskRoutes.js  // Subtask-related routes
  └── userRoutes.js     // User-related routes
/middleware
  └── errorHandler.js   // Custom error handling middleware
/utils
  └── validateTask.js   // Task validation utilities
  └── validateSubtask.js // Subtask validation utilities
/swagger.js             // Swagger setup and configuration
/server.js              // Entry point of the application

Key Components

1. Controllers
   Task Controller: Handles task-related operations such as creating, editing, and deleting tasks.

   Subtask Controller: Manages subtasks, including operations for adding, updating, and marking them as deleted.

   User Controller: Manages user-related operations like user creation and retrieval.

2. Models

   User Model:
   Fields: name, email, tasks (array of tasks).
   Relationships: A user can have multiple tasks.

   Task Model:
   Fields: subject, deadline, status, isDeleted, subtasks (array of subtasks).
   Relationships: A task can have multiple subtasks.

   Subtask Model:
   Fields: subject, deadline, status, isDeleted.
   Relationships: Subtasks are embedded within tasks.

3. Routes

   User Routes: Handles user-related API requests (e.g., /users, /users/:id).

   Task Routes: Handles task-related API requests (e.g., /tasks, /tasks/:taskId).

   Subtask Routes: Manages subtask-related API requests (e.g., /tasks/:taskId/subtasks).

Middleware

Error Handling Middleware: Custom middleware for handling errors across the application, ensuring consistent error responses.

Utilities

Validation Utilities: Functions created to validate the input data for tasks and subtasks before processing them.

Significant Development Decisions

1. MongoDB Schema Design

   Embedded Subtasks: Subtasks are embedded within the task document for better data consistency and easier retrieval.

   Task Deletion: Tasks and subtasks are marked as deleted rather than being physically removed from the database.

2. Error Handling

   Centralized Error Handling: A custom middleware is used to handle all errors, ensuring a unified response structure.

3. Concurrency Issues

   Task Deletion During Access: Implemented checks to ensure that tasks being accessed aren't simultaneously deleted by another user.

4. Swagger Integration

   API Documentation: Swagger was integrated to provide a user-friendly interface for testing and documenting the API, making it easier for developers to understand and use the API.

5. API Documentation

Swagger UI

The API is fully documented using Swagger UI, accessible at /api-docs when the server is running.

Endpoints

1. User Endpoints: List all user-related endpoints with their HTTP methods and purposes.

2. Task Endpoints: Document all task-related endpoints.

3. Subtask Endpoints: Describe the endpoints related to subtasks, including how to retrieve, create, update, and delete subtasks.

Setup and Installation

Environment Variables

.env Setup: Include instructions on setting up environment variables like MongoDB connection strings.

Installation Instructions

Step-by-step guide:
Clone the repository.
Install dependencies using npm install.
Set up environment variables.
Start the server with npm start.