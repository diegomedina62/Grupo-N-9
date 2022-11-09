const swaggerJSDoc = require("swagger-jsdoc");

// metadata info about API

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Alkemy Bank",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      users: {
        type: "object",
        required: ["firstName", "lastName", "email", "password"],
        properties: {
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
          avatar: {
            type: "string",
          },
          deletedAt: {
            type: "date",
          },
        },
      },
      transactions: {
        type: "object",
        required: ["amount", "lastName", "userId", "categoryId"],
        properties: {
          description: {
            type: "string",
          },
          amount: {
            type: "integer",
          },
          userId: {
            type: "integer",
          },
          categoryId: {
            type: "integer",
          },
          date: {
            type: "date",
          },
          deletedAt: {
            type: "date",
          },
        },
      },
      categories: {
        type: "object",
        required: ["description", "name"],
        properties: {
          description: {
            type: "string",
          },
          name: {
            type: "string",
          },
          deletedAt: {
            type: "date",
          },
        },
      },
      Roles: {
        type: "object",
        required: ["description", "name"],
        properties: {
          description: {
            type: "string",
          },
          name: {
            type: "string",
          },
          deletedAt: {
            type: "date",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

// DOCS in JSON format

const swaggerSetup = swaggerJSDoc(options);

// function to setup our docs

module.exports = { swaggerSetup };
