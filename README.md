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
