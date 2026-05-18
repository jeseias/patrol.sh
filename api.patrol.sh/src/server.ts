import {
	API_PATROL_PREFIX,
	type PatrolConfig,
} from "./domain";
import { _env } from "./infra/config";
import { use_case_factory } from "./infra/factories";
import { HTTP } from "./infra/http";

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
		[`/${API_PATROL_PREFIX}/*`]: async (req) => {
      return HTTP.wc(HTTP.bir(req), {
        body: null,
        headers: {},
        status_code: 200
      })
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
