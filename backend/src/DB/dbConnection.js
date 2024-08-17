import { connect } from "mongoose";
import { DB_NAME, MONGO_URL } from "../constant.js";

export default async function dbConnection() {
  try {
    const connectionInstance = await connect(`${MONGO_URL}/${DB_NAME}`);
    console.log(`Mongodb Connected : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`Mongodb Connection Failed : ${error.message}`);
    process.exit(1);
  }
}
