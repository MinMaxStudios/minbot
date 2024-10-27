import { describe, expect, test } from "bun:test";
import { mockChatMessage } from "tests/mock";

import { Users } from "@/utils/db";

describe("database", () => {
  test("should update name", () => {
    mockChatMessage("test", {
      name: "Untoast",
    });
    expect(Users.get("UC7Pw1zHdjkBXY3q8mVoLdQ")?.name).toBe("Untoast");
  });
  test("should update avatar", () => {
    mockChatMessage("test", {
      avatar: "https://github.com/ToastedDev.png",
    });
    expect(Users.get("UC7Pw1zHdjkBXY3q8mVoLdQ")?.avatar).toBe("https://github.com/ToastedDev.png");
  });
});
