import type { Command } from "@/utils/commands";

import { Users } from "@/utils/db";

export default {
  name: "unlink",
  run: ({ interaction }) => {
    const user = Users.get(interaction.author.id)!;
    if (!user.mainId)
      throw interaction.reply(`${interaction.author.name}, you are not linked to any account.`);

    const mainUser = Users.get(user.mainId)!;
    Users.update(user.mainId, {
      points: mainUser.points - user.points,
      dailyPoints: mainUser.dailyPoints - user.dailyPoints,
    });
    Users.update(interaction.author.id, {
      mainId: undefined,
    });

    interaction.reply(`${interaction.author.name}, successfully unlinked your account.`);
  },
} satisfies Command;
