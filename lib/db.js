import "server-only";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

let cached = globalThis.__musaConsultingMongoose;

if (!cached) {
  cached = globalThis.__musaConsultingMongoose = { conn: null, promise: null };
}

export function hasDatabaseConfig() {
  return Boolean(uri);
}

export async function connectToDatabase() {
  if (!uri) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 6000
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
