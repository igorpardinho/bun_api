import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { userRoutes } from "./routes/user.routes";

export const app = new Elysia()
	.use(
		swagger({
			documentation: {
				info: {
					title: "Bun Api",
					description: "Api Rest construida com elysia e drizzleOrm",
					version: "1.0.0",
				},
			},
			path: "/docs",
		}),
	)
	.use(userRoutes);
