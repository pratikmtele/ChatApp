import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";

const dbConfig = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DATABASE_NAME}`
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConfig;
