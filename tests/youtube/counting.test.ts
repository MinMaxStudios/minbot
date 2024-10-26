import type { YTRun } from "masterchat";

import { describe, expect, test } from "bun:test";

import { getCount } from "@/utils/db";

import { initMocks, mcMock } from "../mock";

initMocks();

describe("counting", () => {
  test("should increment the count if it is correct", () => {
    mcMock.emit(
      "chats",
      [
        {
          authorName: "ToastedToast",
          authorPhoto: "https://toasted.dev/logo.png",
          authorChannelId: "UC7Pw1zHdjkBXY3q8mVoLdQ",
          message: [
            {
              text: "1",
            },
          ] as YTRun[],
        },
      ],
      mcMock,
    );
    expect(getCount()).toBe(1);
  });

  test("should not increment the count if it is incorrect", () => {
    mcMock.emit(
      "chats",
      [
        {
          authorName: "ToastedToast",
          authorPhoto: "https://toasted.dev/logo.png",
          authorChannelId: "UC7Pw1zHdjkBXY3q8mVoLdQ",
          message: [
            {
              text: "5",
            },
          ] as YTRun[],
        },
      ],
      mcMock,
    );
    expect(getCount()).toBe(1);
  });

  test("should not increment the count if message is not a number", () => {
    mcMock.emit(
      "chats",
      [
        {
          authorName: "ToastedToast",
          authorPhoto: "https://toasted.dev/logo.png",
          authorChannelId: "UC7Pw1zHdjkBXY3q8mVoLdQ",
          message: [
            {
              text: "hello",
            },
          ] as YTRun[],
        },
      ],
      mcMock,
    );
    expect(getCount()).toBe(1);
  });
});
