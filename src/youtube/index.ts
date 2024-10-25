import { Masterchat, type AddChatItemAction } from "masterchat";
import { YouTubeInteraction } from "./interaction";
import { commandHandler } from "../utils/commands";
import { Users } from "../utils/db";
import { activeUsers, startPoints } from "./points";

async function processChats(mc: Masterchat, chats: AddChatItemAction[]) {
  if (chats.length <= 0) return;
  for (const chat of chats) {
    const interaction = new YouTubeInteraction(chat, mc);
    const [commandName, ...args] = interaction.content
      .slice("!".length)
      .trim()
      .split(" ");
    const command = commandHandler.getCommand(commandName);
    if (!command) continue;

    Users.ensure(interaction.author.id, {
      id: interaction.author.id,
      name: interaction.author.name,
      avatar: interaction.author.avatar,
    });

    activeUsers.set(interaction.author.id, Date.now());

    console.log(interaction.content);

    try {
      await command.run({ interaction, args });
    } catch (err) {
      console.error(err);
    }
  }
}

export async function startYouTube() {
  const mc = await Masterchat.init(process.env.YOUTUBE_STREAM_ID!, {
    credentials: process.env.YOUTUBE_BOT_CREDENTIALS!,
  });

  mc.on("chats", (chats) => processChats(mc, chats));

  startPoints(mc);
  await mc.listen({ ignoreFirstResponse: true });
}
