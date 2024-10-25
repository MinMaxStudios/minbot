import type { Command } from "../utils/commands";
import { Users } from "../utils/db";

export default {
  name: "ping",
  run: ({ interaction }) => {
    console.log(Users.get(interaction.author.id));
    return interaction.reply("hello!");
  },
} satisfies Command;
