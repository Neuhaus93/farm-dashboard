import fastify from "fastify";
import { initServer } from "@ts-rest/fastify";
import { contract } from "@repo/api-contract";
import cors from "@fastify/cors";
import { z } from "zod";

const app = fastify();

const s = initServer();

const router = s.router(contract, {
  getPost: async ({ params: { id: unparsedId } }) => {
    // const post = await prisma.post.findUnique({ where: { id } });
    const id = z.coerce.number().parse(unparsedId);

    return {
      status: 200,
      body: {
        id,
        title: "My first post",
        body: "First post body",
      },
    };
  },
  createPost: async ({ body }) => {
    // const post = await prisma.post.create({
    //   data: body,
    // });

    return {
      status: 201,
      body: {
        id: 2,
        ...body,
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
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
