import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/Auth.Routes.js";
import {
  checkForAuthentication,
  restrictFromSecureRoutes,
} from "./Middlewares/Auth.Middleware.js";
import productRoutes from "./Routes/Product.Routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Authentication Middlewares
app.use(checkForAuthentication);

// Routes
app.use("/api/v1/users", authRouter);
app.use(
  "/api/v1/product",
  restrictFromSecureRoutes(["NORMAL", "ADMIN"]),
  productRoutes
);

app.get("/", (req, res) => {
  res.send("Done");
});

app.use((err, req, res, next) => {
  const success = err.success;
  const statusCode = err.statusCode || 500;
  const error = err.msg || "Internal Server Error";

  return res.status(statusCode).json({ success, error });
});

export default app;
