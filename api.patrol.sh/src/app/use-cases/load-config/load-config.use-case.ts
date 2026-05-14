import type { LoadPatrolConfig } from "@/app/ports"

type Deps = {
  readonly load_patrol_config: LoadPatrolConfig
}

export class LoadConfigUseCase {
  constructor(private readonly deps: Deps) {}

  async execute() {
    return this.deps.load_patrol_config.load()
  }
}