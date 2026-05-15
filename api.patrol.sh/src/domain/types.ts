export type IncomingRequest = {
	readonly method: string;
	readonly body: unknown | null;
	readonly headers: Record<string, string>;
	readonly params: Record<string, string>;
	readonly url: string;
};

export type OutgoingResponse = {
	status_code: number;
	headers: Record<string, string>;
	body: unknown;
};
