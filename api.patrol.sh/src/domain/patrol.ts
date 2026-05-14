import z from "zod";

const service = z.object({
  name: z.string(),
  prefix: z.string(),
  destination: z.url()
})

export const patrol_config = z.object({
  gateway_url: z.url().optional(),
  services: z.array(service)
}).strict()

export type PatrolConfig = z.infer<typeof patrol_config>