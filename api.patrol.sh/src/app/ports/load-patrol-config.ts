import type { PatrolConfig } from "@/domain/patrol";

export interface LoadPatrolConfig {
  load(): Promise<PatrolConfig>
}