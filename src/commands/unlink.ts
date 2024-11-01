import type { Command } from "@/utils/commands";

import { Users } from "@/utils/db";

export default {
  name: "unlink",
  run: ({ interaction }) => {
    const user = Users.get(interaction.author.id)!;
    const allUsers = Users.getAll();
    const linkedUsers = allUsers.filter(u => u.mainId === interaction.author.id);
    if (user.mainId) {
      const mainUser = Users.get(user.mainId)!;
      Users.update(user.mainId, {
        points: mainUser.points - user.points,
        dailyPoints: mainUser.dailyPoints - user.dailyPoints,
      });
      Users.update(interaction.author.id, {
        mainId: undefined,
      });

      interaction.reply(`${interaction.author.name}, successfully unlinked your account.`);
    }
    else if (linkedUsers.length) {
      const mainUser = Users.get(interaction.author.id)!;
      let points = 0;
      let dailyPoints = 0;
      for (const user of linkedUsers) {
        points += user.points;
        dailyPoints += user.dailyPoints;
        Users.update(user.id, {
          mainId: undefined,
        });
      }
      Users.update(interaction.author.id, {
        points: mainUser.points - points,
        dailyPoints: mainUser.dailyPoints - dailyPoints,
      });

      interaction.reply(`${interaction.author.name}, successfully unlinked your accounts.`);
    }
  },
} satisfies Command;
