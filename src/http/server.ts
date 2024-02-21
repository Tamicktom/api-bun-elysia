//* Libraries imports
import { Elysia, t } from "elysia";

import { env } from "../env";
import { db } from "../db/conection";
import { users, restaurants } from "../db/schema";

const app = new Elysia()
  .get("/", () => {
    return "Hello World";
  })
  .post(
    "/restaurants",
    async ({ body, set }) => {
      const { restaurantName, managerName, email, phone } = body;

      const [manager] = await db
        .insert(users)
        .values({
          name: managerName,
          email,
          phone,
        })
        .returning({
          id: users.id,
        });

      await db.insert(restaurants).values({
        name: restaurantName,
        manager_id: manager.id,
      });

      set.status = 204; // success without content
    },
    {
      body: t.Object({
        restaurantName: t.String({ minLength: 1 }),
        managerName: t.String(),
        email: t.String({ format: "email" }),
        phone: t.String(),
      }),
    }
  );

app.listen(env.PORT, () => {
  console.log("Server is running on port 3000");
});
