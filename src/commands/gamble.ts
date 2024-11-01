import type { Command } from "@/utils/commands";

import { Users } from "@/utils/db";

export default {
  name: "gamble",
  cooldown: 1 * 60 * 1000,
  run: ({ interaction, args }) => {
    if (!args[0]) {
      throw interaction.reply(
        `${interaction.author.name}, you need to specify the number of points to gamble.`,
      );
    }

    const amount = Number.parseInt(args[0]);
    if (Number.isNaN(amount))
      throw interaction.reply(`${interaction.author.name}, that's not a number.`);
    if (amount < 25) {
      throw interaction.reply(
        `${interaction.author.name}, you need to bet more than 25 points.`,
      );
    }

    let userId = interaction.author.id;
    let user = Users.get(interaction.author.id)!;
    if (user.mainId) {
      userId = user.mainId;
      user = Users.get(user.mainId)!;
    }

    if (amount > user.points) {
      throw interaction.reply(
        `${
          interaction.author.name
        }, you don't have enough points to gamble ${amount.toLocaleString()}.`,
      );
    }

    const won = Math.random() < 0.5;
    if (won) {
      const amountWon = Number(
        (amount * (Math.random() * 0.55)).toFixed(0),
      );

      user.points += amountWon;
      Users.update(userId, user);

      interaction.reply(
        `${
          interaction.author.name
        }, you won ${amountWon.toLocaleString()} points! You now have ${user.points.toLocaleString()} points.`,
      );
    }
    else {
      user.points -= amount;
      Users.update(userId, user);

      interaction.reply(
        `${
          interaction.author.name
        }, you lost ${amount.toLocaleString()} points. You now have ${user.points.toLocaleString()} points.`,
      );
    }
  },
} satisfies Command;
