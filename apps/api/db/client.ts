import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

export const client = new Client({
  connectionString:
    "postgres://postgres:mysecretpassword@localhost:5432/postgres",
});

// await client.connect();
export const db = drizzle(client, { schema });
