import type { RequestMaker } from "@/app/ports";
import type { IncomingRequest, OutgoingResponse } from "@/domain";
import { fetch } from "bun";

export class FetchRequestMaker implements RequestMaker {
  async make(req: IncomingRequest): Promise<OutgoingResponse> {
    const response = await fetch(req.url, {
      body: !req.body ? null : JSON.stringify(req.body),
      headers: req.headers,
      method: req.method,
    })

    return {
      status_code: response.status,
      headers: response.headers.toJSON(),
      body: await response.json(),
    }
  }
}