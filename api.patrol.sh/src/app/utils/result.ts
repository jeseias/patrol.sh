export const R = {
	ac: async <T>(fn: () => Promise<T>) => {
		try {
			const result = await fn();
			return [null, result] as const;
		} catch (error) {
			return [error as Error, null] as const;
		}
	},
};
