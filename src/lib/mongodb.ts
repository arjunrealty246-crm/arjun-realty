import mongoose from "mongoose";

const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

interface MongoMemoryServerInstance {
  getUri(): string;
  stop(): Promise<boolean>;
}

declare global {
  var __mongo: MongoMemoryServerInstance | undefined;
}

let cached = global as unknown as { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } };
cached.mongoose = cached.mongoose || { conn: null, promise: null };

async function getMongoURI(): Promise<string> {
  const envUri = process.env.MONGODB_URI;
  if (envUri) return envUri;

  if (isProduction) {
    throw new Error(
      "MONGODB_URI is not configured. Set the MONGODB_URI environment variable to a MongoDB Atlas connection string for production."
    );
  }

  const { MongoMemoryServer } = await import("mongodb-memory-server");
  if (!globalThis.__mongo) {
    const instance = await MongoMemoryServer.create({
      instance: { dbName: "arjun-realty" },
    });
    globalThis.__mongo = instance;
    return instance.getUri();
  }
  return globalThis.__mongo.getUri();
}

export async function connectDB() {
  if (cached.mongoose!.conn) return cached.mongoose!.conn;
  if (!cached.mongoose!.promise) {
    const uri = await getMongoURI();
    cached.mongoose!.promise = mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000,
    });
  }
  try {
    cached.mongoose!.conn = await cached.mongoose!.promise;
    return cached.mongoose!.conn;
  } catch (err) {
    cached.mongoose!.promise = null;
    throw err;
  }
}
