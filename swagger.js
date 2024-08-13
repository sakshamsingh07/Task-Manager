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
      post: {
        summary: 'Create a new task',
        responses: {
          '201': {
            description: 'Task created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' },
              },
            },
          },
        },
      },
    },
    '/tasks/{taskId}': {
      put: {
        summary: 'Update a task',
        responses: {
          '200': {
            description: 'Task updated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Task' },
              },
            },
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

