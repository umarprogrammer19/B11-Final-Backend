import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SMIT Final Backend API",
            version: "1.0.0",
            description: "Comprehensive API documentation for SMIT Final Backend project.",
            contact: {
                name: "Developer Support",
                email: "support@smitbackend.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8080",
                description: "Development server",
            },
            {
                url: "https://api.productiondomain.com",
                description: "Production server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.js", "./src/controllers/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
