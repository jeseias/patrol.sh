import type { BunRequest } from "bun";
import type { IncomingRequest, PatrolCors } from "@/domain";

/**
 * Build incoming request from BunRequest
 * @param req
 * @returns IncomingRequest {
 *   method: string;
 *   body: unknown | null;
 *   headers: Record<string, string>;
 *   params: Record<string, string>;
 *   url: string;
 * }
 */
export const build_incoming_request = async (
	req: BunRequest,
	cors: PatrolCors,
): Promise<IncomingRequest> => {
	let headers = new Headers();

	if (cors.open) {
		headers = new Headers(req.headers);
	}

	return {
		method: req.method,
		body: req.body ? await req.body.json() : null,
		headers: headers.toJSON(),
		url: req.url,
		params: req.params,
	};
};
