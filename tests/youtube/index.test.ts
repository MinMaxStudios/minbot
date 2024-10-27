import { describe, expect, test } from "bun:test";

import { mcMock } from "../mock";

describe("youtube", () => {
  test("should have started listening", async () => {
    expect(mcMock.init).toBeCalled();
    expect(mcMock.listen).toBeCalled();
    expect(mcMock.sendMessage).toBeCalledWith("I have arrived!");
  });
});
