import type { YTRun } from "masterchat";

import { describe, expect, test } from "bun:test";

import { activeUsers } from "../../src/youtube/points";
import { initMocks, mcMock } from "../mock";

initMocks();

describe("points", () => {
  test("should make a user with 0 points", () => {
    mcMock.emit(
      "chats",
      [
        {
          authorName: "ToastedToast",
          authorPhoto: "https://toasted.dev/logo.png",
          authorChannelId: "UC7Pw1zHdjkBXY3q8mVoLdQ",
          message: [
            {
              text: "!points",
            },
          ] as YTRun[],
        },
      ],
      mcMock,
    );
    expect(mcMock.sendMessage).toBeCalledWith(
      "ToastedToast, you currently have 0 points.",
    );
  });

  test("user should be an active user", () => {
    expect(activeUsers.has("UC7Pw1zHdjkBXY3q8mVoLdQ")).toBe(true);
  });
});
