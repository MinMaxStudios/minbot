import { api } from "./api";
import { startYouTube } from "./youtube";

startYouTube();
Bun.serve({
  fetch: api.fetch,
  port: Number.parseInt(process.env.PORT ?? "3000"),
});
