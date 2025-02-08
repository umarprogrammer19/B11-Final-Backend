import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { urlencoded } from "express";
import swaggerUi from "swagger-ui-express";
import adminAuthRouter from "./src/admin/routes/auth.routes.js";
import adminUserRouter from "./src/admin/routes/user.routes.js";
import connectdb from "./src/db/index.js";
import homePageUI from "./src/pages/homePage.js";
import authRouter from "./src/routes/auth.routes.js";
import checkoutRouter from "./src/routes/checkout.routes.js";
import contactRouter from "./src/routes/contact.routes.js";
import orderRouter from "./src/routes/orders.routes.js";
import productRouter from "./src/routes/products.routes.js";
import swaggerDocs from "./swaggerConfig.js";

const app = express();

const allowedOrigins = [
    "https://uf-furniro-store.vercel.app",
    "https://ui-ux-hackathon-foodtuck-website.vercel.app",
    "https://uf-food-tuck.vercel.app",
    "http://localhost:3000"
];

const corsOption = {
    origin: (origin, callback) => {
        console.log("Received Origin:", origin);

        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            console.log("✅ Allowed:", origin);
            return callback(null, true);
        } else {
            console.log("❌ Blocked:", origin);
            return callback(new Error("Not allowed by CORS"));
        }
    },
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
app.use("/api/v5", contactRouter);
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin", adminUserRouter);
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