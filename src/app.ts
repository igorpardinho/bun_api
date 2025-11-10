import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { userRoutes } from "./routes/user.routes";


export const app = new Elysia()
	.use(
		swagger({
			path: "/docs",
			documentation: {
				info: {
					title: "Bun Api",
					description: "Api Rest construida com elysia e drizzleOrm",
					version: "1.0.0",
				},
			},
			scalarConfig: {
				spec: { url: "/docs/json" },
			},
		}),
	)
	.use(userRoutes)
	
	
