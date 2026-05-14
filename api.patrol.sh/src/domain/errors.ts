export const ERROR_CODES = {
	INVALID_PATROL_CONFIG: "INVALID_PATROL_CONFIG",
	NO_PATROL_CONFIG_FOUND: "NO_PATROL_CONFIG_FOUND",
	SERVICE_NOT_FOUND: "SERVICE_NOT_FOUND",
	INVALID_PREFIX: "INVALID_PREFIX",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export class DomainError extends Error {
	public readonly code: ErrorCode;

	constructor(name: string, code: ErrorCode, message: string) {
		super(message);
		this.code = code;
		this.name = name;
	}
}

export class InvalidPatrolConfigError extends DomainError {
	constructor(message: string) {
		super(
			"InvalidPatrolConfigError",
			ERROR_CODES.INVALID_PATROL_CONFIG,
			message,
		);
	}
}

export class NoPatrolConfigFoundError extends DomainError {
	constructor(message: string = "No config found") {
		super(
			"NoPatrolConfigFoundError",
			ERROR_CODES.NO_PATROL_CONFIG_FOUND,
			message,
		);
	}
}

export class ServiceNotFoundError extends DomainError {
	constructor(message: string = "Service not found") {
		super("ServiceNotFoundError", ERROR_CODES.SERVICE_NOT_FOUND, message);
	}
}

export class InvalidPrefixError extends DomainError {
	constructor(message: string = "Invalid prefix") {
		super("InvalidPrefixError", ERROR_CODES.INVALID_PREFIX, message);
	}
}
