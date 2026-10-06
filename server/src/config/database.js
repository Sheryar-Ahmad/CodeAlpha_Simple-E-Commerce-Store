import mongoose from "mongoose";

export async function connectDatabase() {
  if (process.env.USE_MEMORY_DB === "true") {
    console.log("Using in-memory development data. MongoDB connection skipped.");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing. Add it to server/.env before starting the API.");
  }

  mongoose.set("strictQuery", true);

  try {
    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`MongoDB connected: ${connection.connection.name}`);
  } catch (error) {
    throw new Error(
      "MongoDB connection failed. Start MongoDB locally or set MONGODB_URI to a MongoDB Atlas connection string."
    );
  }
}
