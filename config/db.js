import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_DATABASE_URL);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(`Error while connecting to DB: ${error.message}`);
  }
};

export default connectDB;
