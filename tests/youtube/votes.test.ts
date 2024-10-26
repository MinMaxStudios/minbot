import { describe, expect, test } from "bun:test";

import { mcMock, mockChatMessage } from "../mock";

describe("vote", () => {
  test("should be able to vote with !vote", () => {
    mockChatMessage("!vote mrbeast");
    expect(mcMock.sendMessage).toBeCalledWith("ToastedToast has voted for MrBeast!");
  });
  test("should error when no votee is given", () => {
    mockChatMessage("!vote");
    expect(mcMock.sendMessage).toBeCalledWith("ToastedToast, please specify someone to vote for.");
  });
  test("should be able to vote with !<name>", () => {
    mockChatMessage("!mrbeast");
    expect(mcMock.sendMessage).toBeCalledWith("ToastedToast has voted for MrBeast, and so has 2 other people!");
  });
});
