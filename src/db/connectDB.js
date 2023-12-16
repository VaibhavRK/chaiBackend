import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DATABASE_NAME}`
    );
    console.log(
      `\n DB CONNECTED !! \n DB connection Served at: ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log(`DB not connected! \n Error : ${error}`);
    process.exit(1);
  }
};

export default connectDB;
