import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SMIT Final Backend API",
            version: "1.0.0",
            description: "API documentation for SMIT Final Backend",
        },
        servers: [
            {
                url: "http://localhost:8080",
                description: "Development server",
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Path to your API route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
