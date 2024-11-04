import type { Command } from "@/utils/commands";

import { Users } from "@/utils/db";

export default {
  name: "points",
  run: ({ interaction }) => {
    const user = Users.get(interaction.author.id)!;

    const allUsers = Users.getAll();
    const rank = allUsers
      .sort((a, b) => b.points - a.points)
      .findIndex(u => u.id === user.id) + 1;
    interaction.reply(
      `${interaction.author.name}, you currently have ${
        user?.points ?? 0
      } points, and are rank #${rank}.`,
    );
  },
} satisfies Command;
