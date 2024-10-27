import { mock, spyOn } from "bun:test";
import { stringify } from "masterchat";
import { EventEmitter } from "node:events";
import * as fs from "node:fs/promises";

import { defaultDb } from "@/utils/db";

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
  spyOn(Bun, "file").mockImplementation((_) => {
    return {
      json: mock(() => defaultDb),
    } as any;
  });
  spyOn(globalThis, "fetch").mockImplementation(() => Promise.resolve({
    json: mock(() => Promise.resolve({
      items: [
        {
          statistics: {
            subscriberCount: "100",
            viewCount: "1000",
          },
        },
      ],
    })),
  } as any));
}

export function mockChatMessage(text: string, user?: {
  id?: string;
  name?: string;
  avatar?: string;
}) {
  mcMock.emit(
    "chats",
    [
      {
        authorName: user?.name ?? "ToastedToast",
        authorPhoto: user?.avatar ?? "https://toasted.dev/logo.png",
        authorChannelId: user?.id ?? "UC7Pw1zHdjkBXY3q8mVoLdQ",
        message: [
          {
            text,
          },
        ],
      },
    ],
    mcMock,
  );
}
