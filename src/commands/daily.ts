import type { Command } from "@/utils/commands";

import { Users } from "@/utils/db";

export default {
  name: "daily",
  aliases: ["last24h", "pointslast24h", "dailypoints"],
  run: ({ interaction }) => {
    let user = Users.get(interaction.author.id)!;
    if (user.mainId) {
      user = Users.get(user.mainId)!;
    }

    const allUsers = Users.getAll();
    const rank = allUsers
      .sort((a, b) => b.dailyPoints - a.dailyPoints)
      .filter(user => !user.mainId)
      .findIndex(u => u.id === user.id) + 1;

    interaction.reply(
      `${interaction.author.name}, you have gained ${user.dailyPoints} points in the last 24 hours, and are rank #${rank}.`,
    );
  },
} satisfies Command;
