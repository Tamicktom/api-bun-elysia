//* Libraries imports
import z from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);