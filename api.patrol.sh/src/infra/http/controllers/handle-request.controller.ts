import type { PatrolConfig } from "@/domain";
import { use_case_factory } from "@/infra/factories";
import { HTTP } from "../utils";

export const handle_request_controller =
	(config: PatrolConfig) => async (req: Bun.BunRequest) => {
		const incoming_request = await HTTP.bir(req, config.cors);

		const response = await use_case_factory
			.handle_request_use_case()
			.execute(incoming_request);

		return HTTP.wc(incoming_request, response, config.cors);
	};
