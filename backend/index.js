import dotenv from "dotenv";
import dbConnection from "./src/DB/dbConnection.js";
import app from "./src/app.js";
import { PORT, SERVER_URL } from "./src/constant.js";

dotenv.config({
  path: "./.env",
});

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Started on : ${SERVER_URL}/${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Mongodb connection failed : ${err.message}`);
    process.exit(1);
  });
