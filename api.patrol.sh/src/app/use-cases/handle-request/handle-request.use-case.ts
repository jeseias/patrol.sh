import type { RequestMaker } from "@/app/ports";
import type { IncomingRequest, OutgoingResponse } from "@/domain";
import { ValidatePrefixService } from "@/domain/services";

type Deps = {
  readonly request_maker: RequestMaker;
}

export class HandleRequestUseCase {
  constructor(private readonly deps: Deps) {}

	async execute(request: IncomingRequest): Promise<OutgoingResponse> {
		const { global_patrol_config } = await import("../../../server");

		const [err, _] = new ValidatePrefixService().execute(
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

    const response = await this.deps.request_maker.make(request)
    
    return response;
	}
}
