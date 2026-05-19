import { API_PATROL_PREFIX } from "../constants";
import {
	type DomainError,
	InvalidPrefixError,
	NoPatrolConfigFoundError,
	ServiceNotFoundError,
} from "../errors";
import type { PatrolConfig, PatrolService } from "../patrol";
import type { IncomingRequest } from "../types";

export class ValidatePrefixService {
	execute(
		request: IncomingRequest,
		config: PatrolConfig | null,
	): [DomainError, null, null] | [null, PatrolConfig, PatrolService] {
		if (!config) {
			return [
				new NoPatrolConfigFoundError(
					"Please create a patrol.yaml file to configure the gateway",
				),
				null,
				null,
			];
		}

		const current_url = `${config.gateway_url}${API_PATROL_PREFIX}`;
		const incoming_prefix = request.url.split(current_url)[1]?.split("/")[1];

		if (!incoming_prefix) {
			return [
				new ServiceNotFoundError(
					`Please provide a prefix after ${current_url}`,
				),
				null,
				null,
			];
		}

		const allowed_services = config.services.map((service) => service.prefix);

		if (!allowed_services.includes(incoming_prefix)) {
			return [
				new InvalidPrefixError(`Invalid prefix: ${incoming_prefix}.`),
				null,
				null,
			];
		}

		const service =
			config.services.find((service) => service.prefix === incoming_prefix) ??
			null;
		if (!service) {
			return [
				new ServiceNotFoundError(`Service not found: ${incoming_prefix}`),
				null,
				null,
			];
		}

		return [null, config, service];
	}
}
