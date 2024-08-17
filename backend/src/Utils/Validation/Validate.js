import { validationResult } from "express-validator";
import ApiError from "../ApiError";

const Validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(
      new ApiError(
        false,
        400,
        `Validation Failed , these fileds are required : ${errors.array()}`
      )
    );
  }
};

export default Validate;
