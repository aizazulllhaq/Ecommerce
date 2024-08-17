import { check } from "express-validator";

export const signUpValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is required")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password is required").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),
//   check("profileImg").custom((_, { req }) => {
//     if (!req.file) {
//       throw new Error("Profile is required");
//     }
//     const mimeType = req.file.mimeType;
//     if (
//       mimeType === "image/jpeg" ||
//       mimeType === "image/png" ||
//       mimeType === "image/jpg"
//     ) {
//       return true;
//     } else {
//     }
//     throw new Error(
//       "Please upload an image in ( jpeg , png , jpg ) format only"
//     );
//   }),
];

export const signInValidation = [
  check("email", "Email is required").not().isEmail(),
  check("password", "Password is required").not().isEmpty(),
];
