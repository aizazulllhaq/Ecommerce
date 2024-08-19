import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";
import ApiError from "../Utils/ApiError.js";

export const checkForAuthentication = (req, res, next) => {
  // check is request-cookies contain jwt-accessToken ?
  const accessToken = req.cookies?.accessToken;

  // Intially null the request-user;
  req.user = null;

  // check if accessToken not find in request-cookies then next() => go to unRestricted routes like ( auth routes )
  if (!accessToken) return next();

  try {
    const user = jwt.verify(accessToken, JWT_SECRET);

    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    return next(new ApiError(false, 400, "Invalid Token"));
  }
};

export const restrictFromSecureRoutes = (role = []) => {
  return (req, res, next) => {
    if (!req.user) return next(new ApiError(false, 401, "Please First Login"));

    if (!req.user.isVerified)
      return next(new ApiError(false, 400, "Please First verify your mail"));

    if (!role.includes(req.user.role))
      return next(new ApiError(false, 400, "Role Must be Request"));

    next();
  };
};
