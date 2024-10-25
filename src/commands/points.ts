import type { Command } from "../utils/commands";
import { Users } from "../utils/db";

export default {
  name: "points",
  run: ({ interaction }) => {
    const user = Users.get(interaction.author.id);
    interaction.reply(
      `${interaction.author.name}, you currently have ${
        user?.points ?? 0
      } points.`
    );
  },
} satisfies Command;
