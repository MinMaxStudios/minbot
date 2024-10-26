import { expect, test } from "bun:test";

import { initMocks, mcMock } from "../mock";

initMocks();

test("should have started listening", async () => {
  expect(mcMock.init).toBeCalled();
  expect(mcMock.listen).toBeCalled();
  expect(mcMock.sendMessage).toBeCalledWith("I have arrived!");
});
