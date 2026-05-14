import z from "zod";

const env_schema = z.object({
  PORT: z.coerce.number().default(9696),
  NODE_ENV: z.enum(["dev", "prod"]).default("prod"),
})

const { data, error } = env_schema.safeParse(Bun.env)

if (error) {
  throw new Error(`Invalid environment variables: ${error.message}`)
}

export const _env = data
