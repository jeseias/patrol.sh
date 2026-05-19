import z from "zod";

const service = z.object({
	name: z.string(),
	prefix: z.string(),
	destination: z.url(),
});

const cors = z
	.object({
		open: z.coerce.boolean().optional().default(false),
		allowed_origins: z.array(z.url()).optional(),
		allowed_methods: z
			.array(z.enum(["GET", "POST", "PUT", "DELETE", "OPTIONS"]))
			.optional(),
		allowed_headers: z.array(z.string()).optional(),
		credentials: z.boolean().optional(),
	})
	.default({ allowed_origins: [], open: false });

export const patrol_config = z
	.object({
		gateway_url: z.url().optional(),
		services: z.array(service),
		cors: cors,
	})
	.strict();

export type PatrolCors = z.infer<typeof cors>;
export type PatrolService = z.infer<typeof service>;
export type PatrolConfig = z.infer<typeof patrol_config>;
