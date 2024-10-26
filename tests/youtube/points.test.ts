import { describe, expect, test } from "bun:test";

import { activeUsers } from "../../src/youtube/points";
import { initMocks, mcMock, mockChatMessage } from "../mock";

initMocks();

describe("points", () => {
  test("should make a user with 0 points", () => {
    mockChatMessage("!points");
    expect(mcMock.sendMessage).toBeCalledWith(
      "ToastedToast, you currently have 0 points.",
    );
  });

  test("user should be an active user", () => {
    expect(activeUsers.has("UC7Pw1zHdjkBXY3q8mVoLdQ")).toBe(true);
  });
});
