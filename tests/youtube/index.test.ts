import { expect, test } from "bun:test";

import { startYouTube } from "@/youtube";

import { initMocks, mcMock } from "../mock";

initMocks();

test("should start listening", async () => {
  await startYouTube();
  expect(mcMock.init).toBeCalled();
  expect(mcMock.listen).toBeCalled();
  expect(mcMock.sendMessage).toBeCalledWith("I have arrived!");
});
