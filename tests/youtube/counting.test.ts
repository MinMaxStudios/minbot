import { describe, expect, test } from "bun:test";

import { getCount } from "@/utils/db";

import { initMocks, mockChatMessage } from "../mock";

initMocks();

describe("counting", () => {
  test("should increment the count if it is correct", () => {
    mockChatMessage("1");
    expect(getCount()).toBe(1);
  });

  test("should not increment the count if it is incorrect", () => {
    mockChatMessage("5");
    expect(getCount()).toBe(1);
  });

  test("should not increment the count if message is not a number", () => {
    mockChatMessage("test");
    expect(getCount()).toBe(1);
  });
});
