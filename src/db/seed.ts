import { faker } from "@faker-js/faker";
import chalk from "chalk";

import { users, restaurants } from "./schema";
import { db } from "./conection";

/**
 * Reset database
 */

console.log(chalk.yellow("Resetting database"));

await db.delete(users);
await db.delete(restaurants);

console.log(chalk.green("Database reset successfully"));

/**
 * Seed database
 */

//* Create customers

await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: "customer",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: "customer",
  },
]);

console.log(chalk.green("Customers created successfully"));

//* Create manager

const managerEmail = "admin@admin.com";

const [manager] = await db
  .insert(users)
  .values({
    name: faker.person.fullName(),
    email: managerEmail,
    role: "manager",
  })
  .returning({
    id: users.id,
  });

console.log(chalk.green("Manager created successfully"));

//* Create restaurant

await db.insert(restaurants).values({
  name: faker.company.name(),
  description: faker.lorem.paragraph(),
  manager_id: manager.id,
});

console.log(chalk.green("Restaurant created successfully"));

console.log(chalk.green("Database seeded successfully"));

process.exit(0);
