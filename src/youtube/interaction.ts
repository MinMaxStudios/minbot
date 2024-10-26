import { type AddChatItemAction, type Masterchat, stringify } from "masterchat";

import type { Interaction } from "@/utils/commands";

import { sendMessage } from "./utils";

export class YouTubeInteraction implements Interaction {
  constructor(private chat: AddChatItemAction, private mc: Masterchat) {}

  get channel() {
    return {
      id: this.mc.videoId,
      platform: "youtube" as const,
    };
  }

  get author() {
    return {
      id: this.chat.authorChannelId,
      name: this.chat.authorName!,
      avatar: this.chat.authorPhoto,
    };
  }

  get content() {
    return stringify(this.chat.message!);
  }

  reply(content: string) {
    sendMessage(this.mc, content);
  }
}
