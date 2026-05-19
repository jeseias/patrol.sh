import type { IncomingRequest, OutgoingResponse } from "@/domain";

/**
 * Add CORS headers to the response
 * @param req
 * @param res OutgoingResponse | null
 * @returns Response {
 *   status: number;
 *   headers: Headers;
 *   body: unknown | null;
 * }
 * @returns
 */
export const with_cors = (
	req: IncomingRequest,
	res: OutgoingResponse | null,
) => {
	const headers = new Headers(req.headers);
	headers.set("Access-Control-Allow-Origin", "*");
	headers.set(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, OPTIONS",
	);
	headers.set(
		"Access-Control-Allow-Headers",
		"Content-type, X-Access-Token, referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, user-agent",
	);
	headers.set("Access-Control-Allow-Credentials", "true");

	if (res) {
		for (const [key, value] of Object.entries(res.headers)) {
			headers.set(key, value);
		}

		return new Response(res.body ? JSON.stringify(res.body) : null, {
			status: res.status_code,
			headers,
		});
	}

	return Response.json(null, { status: 200, headers });
};
