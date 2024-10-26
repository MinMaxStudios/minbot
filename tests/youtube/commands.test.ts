import type { YTRun } from "masterchat";

import { describe, expect, test } from "bun:test";

import { mcMock } from "../mock";

describe("commands", () => {
  test("should be able to run the ping command", () => {
    mcMock.emit(
      "chats",
      [
        {
          authorName: "ToastedToast",
          authorPhoto: "https://toasted.dev/logo.png",
          authorChannelId: "UC7Pw1zHdjkBXY3q8mVoLdQ",
          message: [
            {
              text: "!ping",
            },
          ] as YTRun[],
        },
      ],
      mcMock,
    );
    expect(mcMock.sendMessage).toBeCalledWith("Pong!");
  });
});
