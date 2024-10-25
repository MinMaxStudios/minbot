import { Hono } from "hono";
import { Users } from "../utils/db";

const api = new Hono();

api.get("/lb/points", (c) => {
  const users = Users.getAll();
  return c.json({
    users: users
      .sort((a, b) => b.points - a.points)
      .map((user) => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        points: user.points,
      })),
  });
});

api.get("/total", (c) => {
  const users = Users.getAll();
  return c.json({
    points: users.reduce((acc, user) => acc + user.points, 0),
  });
});

export function startApi() {
  Bun.serve({
    fetch: api.fetch,
    port: 3000,
  });
}
