import type { Command } from "@/utils/commands";

import { Users } from "@/utils/db";

export default {
  name: "points",
  run: ({ interaction }) => {
    const user = Users.get(interaction.author.id);
    const allUsers = Users.getAll();
    const rank = allUsers.findIndex(u => u.id === interaction.author.id) + 1;
    interaction.reply(
      `${interaction.author.name}, you currently have ${
        user?.points ?? 0
      } points, and are rank #${rank}.`,
    );
  },
} satisfies Command;
