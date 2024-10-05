// testConnection.ts
import { connectMongo } from "@/lib/database"; // Adjust path as necessary
import User from "@/lib/database/models/user.model"; // Adjust path as necessary
import mongoose from "mongoose";

export const testConnection = async () => {
  try {
    await connectMongo(); // Attempt to connect to MongoDB
    console.log("MongoDB connected successfully!");

    // Optional: Perform a simple operation, like finding all users
    const users = await User.find({});
    console.log("Users:", users);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Close the connection if needed
    await mongoose.disconnect();
  }
};

testConnection();
