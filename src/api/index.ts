import { Hono } from "hono";
import { cors } from "hono/cors";

import { getCount, getMessages, Users, Votes } from "@/utils/db";

export const api = new Hono().use(cors());

api.get("/lb/points", (c) => {
  const users = Users.getAll();
  return c.json({
    users: users
      .sort((a, b) => b.points - a.points)
      .map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        points: user.points,
      })),
  });
});

api.get("/lb/daily-points", (c) => {
  const users = Users.getAll();
  return c.json({
    users: users
      .sort((a, b) => b.dailyPoints - a.dailyPoints)
      .map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        points: user.dailyPoints,
      })),
  });
});

api.get("/lb/votes", (c) => {
  const votes = Votes.getAll();
  return c.json({
    votes: votes
      .sort((a, b) => b.votes - a.votes)
      .map(vote => ({
        id: vote.id,
        votes: vote.votes,
      })),
  });
});

api.get("/total", (c) => {
  const users = Users.getAll();
  const votes = Votes.getAll();
  return c.json({
    points: users.reduce((acc, user) => acc + user.points, 0),
    votes: votes.reduce((acc, vote) => acc + vote.votes, 0),
    messages: getMessages(),
  });
});

api.get("/count", (c) => {
  return c.json({
    count: getCount(),
  });
});
