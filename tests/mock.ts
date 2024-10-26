import { mock, spyOn } from "bun:test";
import { stringify } from "masterchat";
import { EventEmitter } from "node:events";
import * as fs from "node:fs/promises";

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
  mcMock[key as keyof typeof baseMcMock]
    = baseMcMock[key as keyof typeof baseMcMock];
}

export function initMocks() {
  mock.module("masterchat", () => ({
    Masterchat: mcMock,
    stringify,
  }));
  mock.module("node:fs", () => ({
    existsSync: mock(() => true),
  }));
  spyOn(fs, "mkdir").mockImplementation(() => Promise.resolve() as any);
  spyOn(Bun, "file").mockImplementation(() => {
    return {
      json: mock(() => ({
        users: [],
        messages: 0,
        count: 0,
      })),
    } as any;
  });
}
