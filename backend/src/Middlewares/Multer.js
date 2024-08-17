import multer from "multer";
import ApiError from "../Utils/ApiError.js";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      const filterOriginalFilename = path.basename(file.originalname);
      const fileName = `${Date.now()}-${filterOriginalFilename}`;
      cb(null, fileName);
    } else {
      cb(new ApiError(false, 400, "Invalid file type"));
    }
  },
});

const upload = multer({ storage: storage });
export default upload;
