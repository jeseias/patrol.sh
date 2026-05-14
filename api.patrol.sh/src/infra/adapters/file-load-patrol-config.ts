import type { LoadPatrolConfig } from "@/app/ports";
import { InvalidPatrolConfigError } from "@/domain/errors";
import { patrol_config, type PatrolConfig } from "@/domain/patrol";
import fs from "node:fs"
import path from "node:path";

export class LocalFileLoadPatrolConfig implements LoadPatrolConfig {
  load(): Promise<PatrolConfig> {
    const raw_file = fs.readFileSync(path.join(__dirname, "..", "..", "..", "patrol.yaml"), "utf-8");
    const upgraded_file = raw_file.replace(/\$\{([^}]+)\}/g, (_, ...found) => {
      const env_key = found[0]
      return Bun.env[env_key] as string
    })
    const parsedFile  = Bun.YAML.parse(upgraded_file)
    const { data, error } = patrol_config.safeParse(parsedFile)
    
    if (data) {
      return Promise.resolve(data)
    }

    throw new InvalidPatrolConfigError(error.message);
  }
}