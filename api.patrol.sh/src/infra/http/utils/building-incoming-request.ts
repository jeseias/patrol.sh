import type { BunRequest } from "bun";
import type { IncomingRequest } from "@/domain";

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
): Promise<IncomingRequest> => {
	return {
		method: req.method,
		body: req.body ? await req.body.json() : null,
		headers: req.headers.toJSON(),
		url: req.url,
		params: req.params,
	};
};
