import { config } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

config();

export const mongoDbClient = new MongoClient(
  process.env.MONGODB_URI as string,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);
