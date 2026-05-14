import type { IncomingRequest, OutgoingResponse } from "@/domain";
import { ValidatePrefixService } from "@/domain/services";

export class HandleRequestUseCase {
	async execute(request: IncomingRequest): Promise<OutgoingResponse> {
		const { global_patrol_config } = await import("../../../server");

		const [err, config] = new ValidatePrefixService().execute(
			request,
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

		return {
			status_code: 200,
			headers: {},
			body: config,
		};
	}
}
