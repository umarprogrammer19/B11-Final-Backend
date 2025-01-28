import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import connectdb from "./src/db/index.js";
import authRouter from "./src/routes/auth.routes.js";
import productRouter from "./src/routes/products.routes.js";
import orderRouter from "./src/routes/orders.routes.js";
import checkoutRouter from "./src/routes/checkout.routes.js"
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerConfig.js";
import homePageUI from "./src/pages/homePage.js";
import cookieParser from "cookie-parser";

const app = express();

// Set Cors For Production 
const corsOption = {
    origin: process.env.NODE_ENV === "production" ? "https://uf-furniro-store.vercel.app" : "http://localhost:3000",
    credentials: true,
};

app.use(express.json());
app.use((urlencoded({ extended: false })));
app.use(cors(corsOption));
app.use(cookieParser());
app.use("/api/v1", authRouter);
app.use("/api/v2", productRouter);
app.use("/api/v3", orderRouter);
app.use("/api/v4", checkoutRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
    res.send(homePageUI);
});

// Database Connection
connectdb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server Is Running On The Port", process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })