import type { Command } from "../utils/commands";

export default {
  name: "ping",
  run: ({ interaction }) => {
    return interaction.reply("hello!");
  },
} satisfies Command;
