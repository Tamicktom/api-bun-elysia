//* Libraries imports
import { text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const restaurants = pgTable("restaurants", {
  id: text("id").$defaultFn(createId).primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
