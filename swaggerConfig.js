import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Final E-Commerce Backend API Documentation",
            version: "1.0.0",
            description: "Comprehensive API documentation for Ecommerce Final Backend project.",
            contact: {
                name: "Developer Support",
                email: process.env.EMAIL,
            },
        },
        servers: [
            {
                url: "http://localhost:8080",
                description: "Development server",
            },
            {
                url: "https://api-uf-official-ecommerce.koyeb.app/",
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
