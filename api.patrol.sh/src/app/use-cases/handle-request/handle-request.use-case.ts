import type { RequestMaker } from "@/app/ports";
import {
	API_PATROL_PREFIX,
	type IncomingRequest,
	type OutgoingResponse,
} from "@/domain";
import { ValidatePrefixService } from "@/domain/services";

type Deps = {
	readonly request_maker: RequestMaker;
};

export class HandleRequestUseCase {
	constructor(private readonly deps: Deps) {}

	async execute(req: IncomingRequest): Promise<OutgoingResponse> {
		const { global_patrol_config } = await import("../../../server");

		const [err, _config, service] = new ValidatePrefixService().execute(
			req,
			global_patrol_config,
		);
		if (err) {
			return {
				status_code: 400,
				headers: {},
				body: {
					error: err.message,
				},
			};
		}

		const second_part_of_the_url = req.url.split(
			`${global_patrol_config?.gateway_url}${API_PATROL_PREFIX}/${service.prefix}`,
		)[1];
		const final_url = `${service.destination}${second_part_of_the_url}`;

		const [make_request_error, response] = await R.ac(() =>
			this.deps.request_maker.make({
				body: req.body,
				headers: req.headers,
				method: req.method,
				params: req.params,
				url: final_url,
			}),
		);

		if (make_request_error) {
			return {
				status_code: 500,
				headers: {},
				body: {
					error: "Failed to make request to service",
				},
			};
		}

		return response;
	}
}
