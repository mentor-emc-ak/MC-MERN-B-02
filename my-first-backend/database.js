import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const uri = process.env.MONGO_URI;

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
