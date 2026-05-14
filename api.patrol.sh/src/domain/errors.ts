export const ERROR_CODES = {
  INVALID_PATROL_CONFIG: "INVALID_PATROL_CONFIG"
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export class DomainError extends Error {
  public readonly code: ErrorCode;

  constructor(name: string,code: ErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = name;
  }
}

export class InvalidPatrolConfigError extends DomainError {
  constructor(message: string) {
    super("InvalidPatrolConfigError", ERROR_CODES.INVALID_PATROL_CONFIG, message);
  }
}