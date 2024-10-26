import { expect, test, describe } from "bun:test";
import type { YTRun } from "masterchat";
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
      mcMock
    );
    expect(mcMock.sendMessage).toBeCalledWith("Pong!");
  });
});
