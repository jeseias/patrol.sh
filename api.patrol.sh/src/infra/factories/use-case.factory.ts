import type { LoadPatrolConfig, RequestMaker } from "@/app/ports";
import { HandleRequestUseCase, LoadConfigUseCase } from "@/app/use-cases";
import { FetchRequestMaker, LocalFileLoadPatrolConfig } from "../adapters";

type Deps = {
	readonly load_patrol_config: LoadPatrolConfig;
	readonly request_maker: RequestMaker;
};

export class UseCaseFactory {
	constructor(private readonly deps: Deps) {}

	load_config_use_case() {
		return new LoadConfigUseCase({
			load_patrol_config: this.deps.load_patrol_config,
		});
	}

	handle_request_use_case() {
		return new HandleRequestUseCase({
			request_maker: this.deps.request_maker,
		});
	}
}

export const use_case_factory = new UseCaseFactory({
	load_patrol_config: new LocalFileLoadPatrolConfig(),
	request_maker: new FetchRequestMaker(),
});
