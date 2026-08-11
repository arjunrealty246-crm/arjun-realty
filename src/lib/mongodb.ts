import mongoose from "mongoose";

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
    cached.mongoose!.promise = mongoose.connect(uri, { bufferCommands: false });
  }
  try {
    cached.mongoose!.conn = await cached.mongoose!.promise;
    return cached.mongoose!.conn;
  } catch (err) {
    cached.mongoose!.promise = null;
    throw err;
  }
}
