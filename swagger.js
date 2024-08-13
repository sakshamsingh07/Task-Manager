// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// // Swagger definition
// const swaggerDefinition = {
//   openapi: '3.0.0',
//   info: {
//     title: 'Task Manager API',
//     version: '1.0.0',
//     description: 'API documentation for the Task Manager application',
//   },
//   servers: [
//     {
//       url: 'http://localhost:3000/api',
//       description: 'Development server',
//     },
//   ],
//   components: {
//     schemas: {
//       User: {
//         type: 'object',
//         properties: {
//           name: { type: 'string' },
//           email: { type: 'string' },
//           tasks: {
//             type: 'array',
//             items: { $ref: '#/components/schemas/Task' }
//           }
//         },
//         required: ['name', 'email'],
//       },
//       Task: {
//         type: 'object',
//         properties: {
//           subject: { type: 'string' },
//           deadline: { type: 'string', format: 'date-time' },
//           status: { type: 'string', enum: ['pending', 'in progress', 'completed'] },
//           isDeleted: { type: 'boolean' },
//           subtasks: {
//             type: 'array',
//             items: { $ref: '#/components/schemas/Subtask' }
//           }
//         },
//         required: ['subject', 'deadline'],
//       },
//       Subtask: {
//         type: 'object',
//         properties: {
//           subject: { type: 'string' },
//           deadline: { type: 'string', format: 'date-time' },
//           status: { type: 'string', enum: ['pending', 'in progress', 'completed'] },
//           isDeleted: { type: 'boolean' }
//         },
//         required: ['subject', 'deadline'],
//       },
//     },
//   },
//   paths: {
//     '/users': {
//       get: {
//         summary: 'Get all users',
//         responses: {
//           '200': {
//             description: 'List of users',
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'array',
//                   items: { $ref: '#/components/schemas/User' },
//                 },
//               },
//             },
//           },
//         },
//       },
//       post: {
//         summary: 'Create a new user',
//         responses: {
//           '201': {
//             description: 'User created',
//             content: {
//               'application/json': {
//                 schema: { $ref: '#/components/schemas/User' },
//               },
//             },
//           },
//         },
//       },
//     },
//     '/tasks': {
//       post: {
//         summary: 'Create a new task',
//         responses: {
//           '201': {
//             description: 'Task created',
//             content: {
//               'application/json': {
//                 schema: { $ref: '#/components/schemas/Task' },
//               },
//             },
//           },
//         },
//       },
//     },
//     '/tasks/{taskId}': {
//       put: {
//         summary: 'Update a task',
//         responses: {
//           '200': {
//             description: 'Task updated',
//             content: {
//               'application/json': {
//                 schema: { $ref: '#/components/schemas/Task' },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// // Options for the swagger docs
// const options = {
//   swaggerDefinition,
//   apis: ['./routes/*.js', './controllers/*.js'], // Path to the API docs
// };

// // Initialize swagger-jsdoc
// const swaggerSpec = swaggerJsdoc(options);

// module.exports = { swaggerUi, swaggerSpec };

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'API documentation for the Task Manager application',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          tasks: {
            type: 'array',
            items: { $ref: '#/components/schemas/Task' }
          }
        },
        required: ['name', 'email'],
      },
      Task: {
        type: 'object',
        properties: {
          subject: { type: 'string' },
          deadline: { type: 'string', format: 'date-time' },
          status: { type: 'string', enum: ['pending', 'in progress', 'completed'] },
          isDeleted: { type: 'boolean' },
          subtasks: {
            type: 'array',
            items: { $ref: '#/components/schemas/Subtask' }
          }
        },
        required: ['subject', 'deadline'],
      },
      Subtask: {
        type: 'object',
        properties: {
          subject: { type: 'string' },
          deadline: { type: 'string', format: 'date-time' },
          status: { type: 'string', enum: ['pending', 'in progress', 'completed'] },
          isDeleted: { type: 'boolean' }
        },
        required: ['subject', 'deadline'],
      },
    },
  },
  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        responses: {
          '200': {
            description: 'List of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new user',
        responses: {
          '201': {
            description: 'User created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
        },
      },
    },
    '/tasks': {
      get: {
        summary: 'Get all tasks for a user',
        parameters: [
          {
            in: 'query',
            name: 'userId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The user ID to filter tasks',
          },
        ],
        responses: {
          '200': {
            description: 'List of tasks',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Task' },
                },
              },
            },
          },
          '400': {
            description: 'Invalid user ID',
          },
          '404': {
            description: 'User not found',
          },
          '500': {
            description: 'Server error',
          },
        },
      },
      post: {
        summary: 'Create a new task',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  userId: { type: 'string' },
                  subject: { type: 'string' },
                  deadline: { type: 'string', format: 'date-time' },
                  status: { type: 'string', enum: ['pending', 'in progress', 'completed'] },
                },
              },
              examples: {
                example1: {
                  value: {
                    userId: '60c72b2f5f1b2c001c8e4d0e',
                    subject: 'Complete the project',
                    deadline: '2024-08-13T19:23:37.434Z',
                    status: 'pending',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Task created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' },
              },
            },
          },
          '400': {
            description: 'Invalid request',
          },
          '404': {
            description: 'User not found',
          },
          '500': {
            description: 'Server error',
          },
        },
      },
    },
    '/tasks/{taskId}': {
      put: {
        summary: 'Update a task',
        parameters: [
          {
            in: 'path',
            name: 'taskId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The ID of the task to update',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  subject: { type: 'string' },
                  deadline: { type: 'string', format: 'date-time' },
                  status: { type: 'string', enum: ['pending', 'in progress', 'completed'] },
                },
              },
              examples: {
                example1: {
                  value: {
                    subject: 'Update the project',
                    deadline: '2024-09-13T19:23:37.434Z',
                    status: 'in progress',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Task updated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' },
              },
            },
          },
          '400': {
            description: 'Invalid request',
          },
          '404': {
            description: 'Task not found or deleted',
          },
          '500': {
            description: 'Server error',
          },
        },
      },
      delete: {
        summary: 'Delete a task',
        parameters: [
          {
            in: 'path',
            name: 'taskId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The ID of the task to delete',
          },
        ],
        responses: {
          '200': {
            description: 'Task marked as deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
                examples: {
                  example1: {
                    value: {
                      message: 'Task marked as deleted',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid task ID',
          },
          '404': {
            description: 'Task not found or already deleted',
          },
          '500': {
            description: 'Server error',
          },
        },
      },
    },
    '/tasks/deleted': {
      get: {
        summary: 'Get all deleted tasks',
        responses: {
          '200': {
            description: 'List of deleted tasks',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Task' },
                },
              },
            },
          },
          '404': {
            description: 'No deleted tasks found',
          },
          '500': {
            description: 'Server error',
          },
        },
      },
    },
    '/tasks/{taskId}/subtasks': {
      get: {
        summary: 'Get all subtasks for a task',
        parameters: [
          {
            in: 'path',
            name: 'taskId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The task ID to filter subtasks',
          },
        ],
        responses: {
          '200': {
            description: 'List of subtasks',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Subtask' },
                },
              },
            },
          },
          '400': {
            description: 'Invalid task ID',
          },
          '404': {
            description: 'Task not found',
          },
          '500': {
            description: 'Server error',
          },
        },
      },
      post: {
        summary: 'Create a new subtask',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  taskId: { type: 'string' },
                  subject: { type: 'string' },
                  deadline: { type: 'string', format: 'date-time' },
                  status: { type: 'string', enum: ['pending', 'in progress', 'completed'] },
                },
              },
              examples: {
                example1: {
                  value: {
                    taskId: '60c72b2f5f1b2c001c8e4d0e',
                    subject: 'Complete documentation',
                    deadline: '2024-08-14T19:23:37.434Z',
                    status: 'pending',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Subtask created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Subtask' },
              },
            },
          },
          '400': {
            description: 'Invalid request',
          },
          '404': {
            description: 'Task not found',
          },
          '500': {
            description: 'Server error',
          },
        },
      },
    },
    '/tasks/{taskId}/subtasks/{subtaskId}': {
      put: {
        summary: 'Update a subtask',
        parameters: [
          {
            in: 'path',
            name: 'taskId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The task ID for the subtask',
          },
          {
            in: 'path',
            name: 'subtaskId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The ID of the subtask to update',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  subject: { type: 'string' },
                  deadline: { type: 'string', format: 'date-time' },
                  status: { type: 'string', enum: ['pending', 'in progress', 'completed'] },
                },
              },
              examples: {
                example1: {
                  value: {
                    subject: 'Update documentation',
                    deadline: '2024-08-15T19:23:37.434Z',
                    status: 'in progress',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Subtask updated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Subtask' },
              },
            },
          },
          '400': {
            description: 'Invalid request',
          },
          '404': {
            description: 'Subtask not found',
          },
          '500': {
            description: 'Server error',
          },
        },
      },
      delete: {
        summary: 'Delete a subtask',
        parameters: [
          {
            in: 'path',
            name: 'taskId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The task ID for the subtask',
          },
          {
            in: 'path',
            name: 'subtaskId',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The ID of the subtask to delete',
          },
        ],
        responses: {
          '200': {
            description: 'Subtask marked as deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
                examples: {
                  example1: {
                    value: {
                      message: 'Subtask marked as deleted',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid subtask ID',
          },
          '404': {
            description: 'Subtask not found or already deleted',
          },
          '500': {
            description: 'Server error',
          },
        },
      },
    },
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './controllers/*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };

