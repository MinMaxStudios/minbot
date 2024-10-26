import { initMocks } from "./mock";
import { afterEach, mock } from "bun:test";

initMocks();

afterEach(() => {
  mock.restore();
});
