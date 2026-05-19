import { R } from "@/app/utils/result";
import type { PatrolConfig } from "./domain";
import { _env } from "./infra/config";
import { use_case_factory } from "./infra/factories";
import { api_routes } from "./infra/http/routes/router";

if (!globalThis.R) {
	globalThis.R = R;
}

export let global_patrol_config: PatrolConfig | null = null;

use_case_factory
	.load_config_use_case()
	.execute()
	.then(async (config) => {
		global_patrol_config = config;

		const server = Bun.serve({
			development: _env.NODE_ENV === "dev",
			port: _env.PORT,
			idleTimeout: 30,
			routes: api_routes(config),
		});

		global_patrol_config.gateway_url = String(server.url);

		console.log(`Server is running on ${server.url}`);
	});
