const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "INTERCESSOR API",
      description: "Intercessor endpoints documented on swagger",
      contact: {
        name: "Joshua Adesanya",
        email: "adesanyajoshua@ymail.com",
        url: "https://github.com/Josh4324/Intercessor-BE",
      },
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
      {
        url: "<your live url here>",
        description: "Live server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app, port) => {
  // Swagger Page
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
