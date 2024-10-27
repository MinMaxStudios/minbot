import { afterEach, beforeAll, mock } from "bun:test";

import { startYouTube } from "@/youtube";

import { initMocks, mcMock } from "./mock";

initMocks();

beforeAll(async () => {
  await startYouTube();
});

afterEach(() => {
  mock.restore();
});
