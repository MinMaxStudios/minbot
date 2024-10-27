import type { Command } from "@/utils/commands";

export default {
  name: "iq",
  run: ({ interaction }) => {
    interaction.reply(`${interaction.author.name}, you have a IQ of ${Math.floor(Math.random() * (210 - 50)) + 50}.`);
  },
} satisfies Command;
