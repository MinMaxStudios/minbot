import { mock } from "bun:test";
import { stringify } from "masterchat";
import { EventEmitter } from "node:events";
import { readdir } from "node:fs/promises";

const baseMcMock = {
  listen: mock(),
  sendMessage: mock(),
};

export const mcMock = new EventEmitter() as EventEmitter &
  typeof baseMcMock & {
    init: ReturnType<typeof mock<() => typeof mcMock>>;
  };
mcMock.init = mock(() => mcMock);

for (const key in baseMcMock) {
  mcMock[key as keyof typeof baseMcMock] =
    baseMcMock[key as keyof typeof baseMcMock];
}

export function initMocks() {
  mock.module("masterchat", () => ({
    Masterchat: mcMock,
    stringify,
  }));
  mock.module("node:fs", () => ({
    existsSync: mock(() => true),
  }));
  mock.module("node:fs/promises", () => ({
    readFile: mock(),
    writeFile: mock(),
    readdir,
    mkdir: mock(),
  }));
}
