import { afterEach, mock } from "bun:test";

import { initMocks } from "./mock";

initMocks();

afterEach(() => {
  mock.restore();
});
