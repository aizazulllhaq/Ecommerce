import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/Auth.Routes.js";
import {
  checkForAuthentication,
  restrictFromSecureRoutes,
  restrictUserFromAdminRoutes,
} from "./Middlewares/Auth.Middleware.js";
import productRoutes from "./Routes/Product.Routes.js";
import cartRouter from "./Routes/Cart.Routes.js";
import userRouter from "./Routes/User.Routes.js";
import orderRouter from "./Routes/Order.Routes.js";
import cbRouter from "./Routes/CB.Routes.js";
import authAdminRouter from "./Routes/Auth.Admin.Routes.js";
import adminRouter from "./Routes/Admin.Routes.js";
import { ADMIN_FRONTEND, USER_FRONTEND } from "./constant.js";

const app = express();

app.use(
  cors({
    origin: [USER_FRONTEND, ADMIN_FRONTEND],
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
app.use("/api/v1/auth/", authRouter);
// Admin Routes Only
app.use("/api/v1/auth/admin", authAdminRouter);
app.use("/api/v1/admin", restrictUserFromAdminRoutes(["ADMIN"]), adminRouter);
app.use("/api/v1/users", restrictFromSecureRoutes(["NORMAL"]), userRouter);
app.use("/api/v1/product", restrictFromSecureRoutes(["NORMAL"]), productRoutes);
app.use("/api/v1/cart", restrictFromSecureRoutes(["NORMAL"]), cartRouter);
app.use("/api/v1/orders", restrictFromSecureRoutes(["NORMAL"]), orderRouter);
app.use("/api/v1", restrictFromSecureRoutes(["NORMAL"]), cbRouter);

app.use((err, req, res, next) => {
  const success = err.success;
  const statusCode = err.statusCode || 500;
  const error = err.msg || "Internal Server Error";

  return res.status(statusCode).json({ success, error });
});

export default app;
