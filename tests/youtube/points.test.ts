import { describe, expect, test } from "bun:test";

import { Users } from "@/utils/db";

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

  describe("gambling", () => {
    test("should not be able to gamble without a specified amount", () => {
      mockChatMessage("!gamble");
      expect(mcMock.sendMessage).toBeCalledWith(
        "ToastedToast, you need to specify the number of points to gamble.",
      );
    });

    test("should not be able to gamble less than 50 points", () => {
      mockChatMessage("!gamble 10");
      expect(mcMock.sendMessage).toBeCalledWith(
        "ToastedToast, you need to bet more than 50 points.",
      );
    });

    test("should not be able to gamble with less than 50 points", () => {
      mockChatMessage("!gamble 50");
      expect(mcMock.sendMessage).toBeCalledWith(
        "ToastedToast, you don't have enough points to gamble 50.",
      );
    });

    test("should be able to gamble", () => {
      Users.update("UC7Pw1zHdjkBXY3q8mVoLdQ", {
        points: 100,
      });
      mockChatMessage("!gamble 50");
      expect(mcMock.sendMessage).toBeCalled();
      Users.update("UC7Pw1zHdjkBXY3q8mVoLdQ", {
        points: 0,
      });
    });
  });
});
