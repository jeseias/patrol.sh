import type { IncomingRequest, OutgoingResponse } from "@/domain"

export class HandleRequestUseCase {
  async execute(request: IncomingRequest): Promise<OutgoingResponse> {
    const { global_patrol_config: config } = await import("../../../server")

    return {
      status_code: 200,
      headers: {},
      body: config
    }
  }
}