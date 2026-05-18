import { build_incoming_request } from "./building-incoming-request";
import { with_cors } from "./with-cors";

export const HTTP = {
  bir: build_incoming_request,
  wc: with_cors
}