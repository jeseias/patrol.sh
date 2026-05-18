import type { IncomingRequest } from "@/domain"
import type { BunRequest } from "bun"

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
export const build_incoming_request = (req: BunRequest): IncomingRequest => {
  return {
    method: req.method,
    body: req.body,
    headers: req.headers.toJSON(),
    url: req.url,
    params: req.params,
  }
}