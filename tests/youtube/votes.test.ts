import type { YTRun } from "masterchat";

import { describe, expect, test } from "bun:test";

import { mcMock } from "../mock";

describe("vote", () => {
  test("should be able to vote with !vote", () => {
    mcMock.emit(
      "chats",
      [
        {
          authorName: "ToastedToast",
          authorPhoto: "https://toasted.dev/logo.png",
          authorChannelId: "UC7Pw1zHdjkBXY3q8mVoLdQ",
          message: [
            {
              text: "!vote mrbeast",
            },
          ] as YTRun[],
        },
      ],
      mcMock,
    );
    expect(mcMock.sendMessage).toBeCalledWith("ToastedToast has voted for MrBeast!");
  });
  test("should be able to vote with !<name>", () => {
    mcMock.emit(
      "chats",
      [
        {
          authorName: "ToastedToast",
          authorPhoto: "https://toasted.dev/logo.png",
          authorChannelId: "UC7Pw1zHdjkBXY3q8mVoLdQ",
          message: [
            {
              text: "!mrbeast",
            },
          ] as YTRun[],
        },
      ],
      mcMock,
    );
    expect(mcMock.sendMessage).toBeCalledWith("ToastedToast has voted for MrBeast, and so has 2 other people!");
  });
});
