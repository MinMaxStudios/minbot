import { type AddChatItemAction, Masterchat } from "masterchat";

import { commandHandler } from "@/utils/commands";
import {
  getCount,
  incrementCount,
  incrementMessages,
  Users,
} from "@/utils/db";

import { YouTubeInteraction } from "./interaction";
import { activeUsers, startPoints } from "./points";

async function processChats(mc: Masterchat, chats: AddChatItemAction[]) {
  if (chats.length <= 0)
    return;
  for (const chat of chats) {
    const interaction = new YouTubeInteraction(chat, mc);

    if (interaction.author.id === process.env.YOUTUBE_BOT_ID!)
      return;

    Users.ensure(interaction.author.id, {
      id: interaction.author.id,
      name: interaction.author.name,
      avatar: interaction.author.avatar,
    });

    activeUsers.set(interaction.author.id, Date.now());

    incrementMessages();

    if (interaction.content.startsWith("!")) {
      const [commandName, ...args] = interaction.content
        .slice("!".length)
        .trim()
        .split(" ");
      const command = commandHandler.getCommand(commandName);
      if (command) {
        try {
          await command.run({ interaction, args });
        }
        catch (err) {
          console.error(err);
        }
      }
      else {
        const voteCommand = commandHandler.getCommand("vote");
        try {
          await voteCommand!.run({ interaction, args: [commandName] });
        }
        catch (err) {
          console.error(err);
        }
      }
    }
    else {
      const firstPart = interaction.content.split(" ")[0];
      const num = Number.parseInt(firstPart.split(",").join(""));
      if (!Number.isNaN(num)) {
        if (num !== getCount() + 1)
          return;
        incrementCount();
      }
    }
  }
}

export async function startYouTube() {
  const mc = await Masterchat.init(process.env.YOUTUBE_STREAM_ID!, {
    credentials: process.env.YOUTUBE_BOT_CREDENTIALS!,
  });

  mc.on("chats", chats => processChats(mc, chats));

  mc.sendMessage("I have arrived!");
  startPoints(mc);
  await mc.listen({ ignoreFirstResponse: true });
}
