import type { Masterchat } from "masterchat";

import { Users } from "@/utils/db";

import { sendMessage } from "./utils";

export const activeUsers = new Map<string, number>();
const POINTS_DURATION = 1 * 60 * 1000;

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function startPoints(mc: Masterchat) {
  setInterval(() => {
    if (activeUsers.size === 0)
      return;

    for (const [userId, lastMessageTime] of activeUsers) {
      if (Date.now() - lastMessageTime > POINTS_DURATION)
        activeUsers.delete(userId);

      Users.update(userId, {
        points: Users.get(userId)!.points + random(1, 5),
      });
    }

    if (activeUsers.size > 0) {
      sendMessage(
        mc,
        `${activeUsers.size} user${activeUsers.size !== 1 ? "s" : ""} ${
          activeUsers.size !== 1 ? "have" : "has"
        } been given points!`,
      );
    }
  }, POINTS_DURATION);
}
