import fastify from "fastify";
import { initServer } from "@ts-rest/fastify";
import { contract } from "@repo/api-contract";
import cors from "@fastify/cors";
import { client, db } from "./db/client";
import { transaction, category } from "./db/schema";

const app = fastify();

const s = initServer();

const router = s.router(contract, {
  getTransactions: async () => {
    const transactions = await db.select().from(transaction);
    return {
      status: 200,
      body: transactions,
    };
  },
  getCategories: async () => {
    const categories = await db.select().from(category);
    return {
      status: 200,
      body: categories,
    };
  },
  createCategory: async () => {
    return {
      status: 200,
      body: {
        id: 1,
        description: "",
      },
    };
  },
  createTransaction: async () => {
    return {
      status: 201,
      body: {
        id: 1,
        categoryId: 1,
        value: 2000,
        description: "Testing",
      },
    };
  },
});

app.register(s.plugin(router));

const start = async () => {
  try {
    await app.register(cors);
    await app.listen({ port: 3000 });
    console.log("Connected to port 3000");
    await client.connect();
    console.log("Database connected");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
