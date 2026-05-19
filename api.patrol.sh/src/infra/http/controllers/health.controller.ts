export const health_controller = () => {
	return Response.json(
		{
			status: "ok",
			timestamp: new Date().toISOString(),
		},
		{ status: 200 },
	);
};
