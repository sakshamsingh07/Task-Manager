                                            API Documentation 

                       https://documenter.getpostman.com/view/24721538/2sA3s6Fq4A 

********************************************************************************************************************
                                            Code Documentation

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

Postman

The API is fully documented using Postman.

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


***************************************************************************************************************


                                      Database Schema Documentation

User Collection

Schema Definition
Collection Name: `users`
Document Structure:
{
  "_id": "ObjectId",  // Unique identifier for the user, generated by MongoDB
  "name": "string",   // User's full name
  "email": "string",  // User's email address (unique)
  "tasks": [          // Array of tasks associated with the user
    {
      "subject": "string",             // Title or subject of the task
      "deadline": "date-time",         // Deadline of the task
      "status": "string",              // Status of the task (e.g., "pending", "in progress", "completed")
      "isDeleted": "boolean",          // Indicates if the task is marked as deleted
      "subtasks": [                   // Array of subtasks associated with the task
        {
          "subject": "string",         // Title or subject of the subtask
          "deadline": "date-time",     // Deadline of the subtask
          "status": "string",          // Status of the subtask (e.g., "pending", "in progress", "completed")
          "isDeleted": "boolean"       // Indicates if the subtask is marked as deleted
        }
      ]
    }
  ]
}


Fields:

`_id`: Unique identifier for the user, automatically generated by MongoDB.
`name`: The name of the user.
`email`: The email address of the user (unique).
`tasks`: An array containing references to tasks assigned to the user.

Relationships
User to Tasks: One-to-Many (One user can have multiple tasks).


Task Collection

Schema Definition
Collection Name: `tasks`
Document Structure:
{
  "_id": "ObjectId",  // Unique identifier for the task, generated by MongoDB
  "subject": "string",             // Title or subject of the task
  "deadline": "date-time",         // Deadline of the task
  "status": "string",              // Status of the task (e.g., "pending", "in progress", "completed")
  "isDeleted": "boolean",          // Indicates if the task is marked as deleted
  "subtasks": [                   // Array of subtasks associated with the task
    {
      "subject": "string",         // Title or subject of the subtask
      "deadline": "date-time",     // Deadline of the subtask
      "status": "string",          // Status of the subtask (e.g., "pending", "in progress", "completed")
      "isDeleted": "boolean"       // Indicates if the subtask is marked as deleted
    }
  ]
}


Fields:

`_id`: Unique identifier for the task, automatically generated by MongoDB.
`subject`: Title or subject of the task.
`deadline`: Deadline for completing the task.
`status`: Current status of the task.
`isDeleted`: Flag indicating whether the task has been logically deleted.
`subtasks`: Array of subtask objects, each containing details of individual subtasks.

Relationships
Task to Subtasks: One-to-Many relationship (One task can have multiple subtasks).


Subtask Collection

Schema Definition
Collection Name: `subtasks`
Document Structure:
{
  "_id": "ObjectId",            // Unique identifier for the subtask, generated by MongoDB
  "subject": "string",          // Title or subject of the subtask
  "deadline": "date-time",      // Deadline of the subtask
  "status": "string",           // Status of the subtask (e.g., "pending", "in progress", "completed")
  "isDeleted": "boolean"        // Indicates if the subtask is marked as deleted
}


Fields:

`_id`: Unique identifier for the subtask, automatically generated by MongoDB.
`subject`: Title or subject of the subtask.
`deadline`: Deadline for completing the subtask.
`status`: Current status of the subtask.
`isDeleted`: Flag indicating whether the subtask has been logically deleted.

Relationships
Subtasks: Each subtask is embedded within the `tasks` collection as an array, so there is no separate collection for `subtasks` in this schema.


Schema Relationships Summary

User to Tasks: A user can have multiple tasks. The tasks array in the user document references tasks in the tasks collection.

Task to Subtasks: A task can have multiple subtasks. The subtasks array within each task document contains subtask details.


Visualization of Relationships

User (One) ↔ Task (Many)
  User has many Tasks.
  Task belongs to one User.

Task (One) ↔ Subtask (Many)
  Task has many Subtasks.
  Subtask belongs to one Task.

User (Indirectly) ↔ Subtask (Many)
  User has many Tasks, which in turn have many Subtasks.


How to Access Subtasks for a User

To find all Subtasks for a given User, you would typically follow these steps in your application logic:
Retrieve the User document.
Access the tasks array in the User document.
For each Task, access the subtasks array.



                 