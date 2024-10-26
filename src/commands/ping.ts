import type { Command } from "@/utils/commands";

export default {
  name: "ping",
  run: ({ interaction }) => interaction.reply("Pong!"),
} satisfies Command;
