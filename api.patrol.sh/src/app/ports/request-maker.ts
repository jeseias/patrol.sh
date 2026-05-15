import type { IncomingRequest, OutgoingResponse } from "@/domain";

export interface RequestMaker {
  make(req: IncomingRequest): Promise<OutgoingResponse>;
}