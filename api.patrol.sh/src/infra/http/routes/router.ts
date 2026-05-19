import type { Serve } from "bun";
import { API_PATROL_PREFIX, type PatrolConfig } from "@/domain";
import {
	handle_request_controller,
	health_controller,
	home_controller,
} from "../controllers";

export const api_routes = (
	config: PatrolConfig,
): Serve.Routes<undefined, string> => ({
	"/": home_controller,
	"/health": health_controller,
	[`/${API_PATROL_PREFIX}/*`]: handle_request_controller(config),
});
