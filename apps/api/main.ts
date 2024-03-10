import fastify from "fastify";
import { initServer } from "@ts-rest/fastify";
import { contract } from "@repo/api-contract";
import cors from "@fastify/cors";
import { z } from "zod";
import { client, db } from "./db/client";
import { post } from "./db/schema";
import { eq } from "drizzle-orm";

const app = fastify();

const s = initServer();

const router = s.router(contract, {
  getPost: async ({ params: { id: unparsedId } }) => {
    const id = z.coerce.number().parse(unparsedId);
    const posts = await db.select().from(post).where(eq(post.id, id));

    if (posts.length === 0) {
      throw new Error("Post not found");
    }

    return {
      status: 200,
      body: posts[0],
    };
  },
  createPost: async ({ body }) => {
    const res = await db.insert(post).values(body).returning();

    if (res.length === 0) {
      throw new Error("Error creating post");
    }

    return {
      status: 201,
      body: res[0],
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
