import { DomainError, InvalidPrefixError, NoPatrolConfigFoundError, ServiceNotFoundError, type IncomingRequest, type OutgoingResponse, type PatrolConfig } from "@/domain"

export class HandleRequestUseCase {
  async execute(request: IncomingRequest): Promise<OutgoingResponse> {
    const { global_patrol_config } = await import("../../../server")

    const [err, config] = this.validate_prefix(request, global_patrol_config)
    if (err) {
      return {
        status_code: 400,
        headers: {},
        body: {
          error: err.message
        }
      }
    }

    return {
      status_code: 200,
      headers: {},
      body: config
    }
  }


  private validate_prefix(request: IncomingRequest, config: PatrolConfig | null): [DomainError | null, PatrolConfig | null] {
    if (!config) {
      return [new NoPatrolConfigFoundError("Please create a patrol.yaml file to configure the gateway"), null]
    }
    
    const current_url = `${config.gateway_url}p`
    const incoming_prefix = request.url.split(current_url)[1]?.split("/")[1]
    
    if (!incoming_prefix) {
      return [new ServiceNotFoundError(`Please provide a prefix after ${current_url}`), null]
    }

    const allowed_services = config.services.map(service => service.prefix)

    if (!allowed_services.includes(incoming_prefix)) {
      return [new InvalidPrefixError(`Invalid prefix: ${incoming_prefix}.`), null]
    }

    return [null, config]
  }
}