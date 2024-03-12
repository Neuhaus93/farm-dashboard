import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const TransactionSchema = z.object({
  id: z.number(),
  value: z.number(),
  description: z.string().nullable(),
  categoryId: z.number(),
});

const CategorySchema = z.object({
  id: z.number(),
  description: z.string(),
});

export const contract = c.router({
  getTransactions: {
    method: "GET",
    path: "/transactions",
    responses: {
      200: z.array(TransactionSchema),
    },
  },
  createTransaction: {
    method: "POST",
    path: "/transactions/add",
    responses: {
      201: TransactionSchema,
    },
    body: z.object({
      value: z.number(),
      description: z.string().optional(),
      categoryId: z.number(),
    }),
  },
  getCategories: {
    method: "GET",
    path: "/categories",
    responses: {
      200: z.array(CategorySchema),
    },
  },
  createCategory: {
    method: "POST",
    path: "/categories/add",
    responses: {
      201: CategorySchema,
    },
    body: z.object({
      value: z.number(),
      description: z.string().optional(),
      categoryId: z.number(),
    }),
  },
});
