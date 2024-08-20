import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/Auth.Routes.js";
import {
  checkForAuthentication,
  restrictFromSecureRoutes,
} from "./Middlewares/Auth.Middleware.js";
import productRoutes from "./Routes/Product.Routes.js";
import cartRouter from "./Routes/Cart.Routes.js";
import userRouter from "./Routes/User.Routes.js";
import orderRouter from "./Routes/Order.Routes.js";
import cbRouter from "./Routes/CB.Routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Authentication Middlewares
app.use(checkForAuthentication);

// Routes
app.use("/api/v1/auth", authRouter);
app.use(
  "/api/v1/users",
  restrictFromSecureRoutes(["NORMAL", "ADMIN"]),
  userRouter
);
app.use(
  "/api/v1/product",
  restrictFromSecureRoutes(["NORMAL", "ADMIN"]),
  productRoutes
);
app.use(
  "/api/v1/cart",
  restrictFromSecureRoutes(["NORMAL", "ADMIN"]),
  cartRouter
);
app.use(
  "/api/v1/orders",
  restrictFromSecureRoutes(["NORMAL", "ADMIN"]),
  orderRouter
);
app.use("/api/v1", restrictFromSecureRoutes(["NORMAL", "ADMIN"]), cbRouter);

app.use((err, req, res, next) => {
  const success = err.success;
  const statusCode = err.statusCode || 500;
  const error = err.msg || "Internal Server Error";

  return res.status(statusCode).json({ success, error });
});

export default app;
