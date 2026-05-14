import { _env } from "./infra/config"

const server = Bun.serve({
  development: _env.NODE_ENV === 'dev',
  port: _env.PORT,
  routes: {
    "/": new Response("Patrol API Gateway"),
    "/health": () =>  {
      return Response.json({
        status: "ok",
        timestamp: new Date().toISOString(),
      }, { status: 200 })
    }
  }
})

console.log(`Server is running on ${server.url}`)