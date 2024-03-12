import { integer, pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const transaction = pgTable("transaction", {
  id: serial("id").primaryKey(),
  value: integer("value").notNull(),
  description: text("description"),
  categoryId: integer("category_id")
    .references(() => category.id)
    .notNull(),
});

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  description: varchar("description", { length: 256 }).notNull(),
});
