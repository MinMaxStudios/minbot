import type { Command } from "@/utils/commands";

import { Users } from "@/utils/db";

export default {
  name: "messages",
  run: ({ interaction }) => {
    const user = Users.get(interaction.author.id)!;

    interaction.reply(`${interaction.author.name}, you have sent ${user.messages} messages (${user.dailyMessages} in the past 24 hours).`);
  },
} satisfies Command;
