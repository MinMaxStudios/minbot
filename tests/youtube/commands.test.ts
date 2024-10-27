import { describe, expect, test } from "bun:test";

import { mcMock, mockChatMessage } from "../mock";

describe("commands", () => {
  test("should be able to run the ping command", () => {
    mockChatMessage("!ping");
    expect(mcMock.sendMessage).toBeCalledWith("Pong!");
  });
  test("should ignore specified commands to ignore", () => {
    mcMock.sendMessage.mockClear();
    mockChatMessage("!sr");
    mockChatMessage("!skip");
    mockChatMessage("!currentsong");
    mockChatMessage("!queue");
    expect(mcMock.sendMessage).not.toHaveBeenCalled();
  });
});
