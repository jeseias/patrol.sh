import {
	API_PATROL_PREFIX,
	type IncomingRequest,
	type PatrolConfig,
} from "./domain";
import { _env } from "./infra/config";
import { use_case_factory } from "./infra/factories";

export let global_patrol_config: PatrolConfig | null = null;

const server = Bun.serve({
	development: _env.NODE_ENV === "dev",
	port: _env.PORT,
	routes: {
		"/": new Response("Patrol API Gateway"),
		"/health": () => {
			return Response.json(
				{
					status: "ok",
					timestamp: new Date().toISOString(),
				},
				{ status: 200 },
			);
		},
		[`/${API_PATROL_PREFIX}/*`]: async (request) => {
			const incoming_request: IncomingRequest = {
				url: request.url,
				headers: request.headers.toJSON(),
				body: request.body,
				method: request.method,
				params: request.params,
			};
			const result = await use_case_factory
				.handle_request_use_case()
				.execute(incoming_request);
			return Response.json(result.body, {
				status: result.status_code,
				headers: result.headers,
			});
		},
	},
});

use_case_factory
	.load_config_use_case()
	.execute()
	.then((config) => {
		global_patrol_config = config;
		global_patrol_config.gateway_url = String(server.url);
	});

console.log(`Server is running on ${server.url}`);
