import { R } from "@/app/utils/result";
import { API_PATROL_PREFIX, type PatrolConfig } from "./domain";
import { _env } from "./infra/config";
import { use_case_factory } from "./infra/factories";
import { HTTP } from "./infra/http";

if (!globalThis.R) {
	globalThis.R = R;
}

export let global_patrol_config: PatrolConfig | null = null;

const server = Bun.serve({
	development: _env.NODE_ENV === "dev",
	port: _env.PORT,
	idleTimeout: 30,
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
		[`/${API_PATROL_PREFIX}/*`]: async (req) => {
      const incoming_request = await HTTP.bir(req)
			const response = await use_case_factory
				.handle_request_use_case()
				.execute(incoming_request);

			return HTTP.wc(incoming_request, response);
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
