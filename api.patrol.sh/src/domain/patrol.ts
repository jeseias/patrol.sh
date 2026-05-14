import z from "zod";

const service = z.object({
  name: z.string(),
  prefix: z.string().startsWith("/"),
  destination: z.url()
})

export const patrol_config = z.object({
  services: z.array(service)
}).strict()

export type PatrolConfig = z.infer<typeof patrol_config>