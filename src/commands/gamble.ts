import type { Command } from "@/utils/commands";

import { Users } from "@/utils/db";

export default {
  name: "gamble",
  // cooldown: 1 * 60 * 1000,
  run: ({ interaction, args }) => {
    // if (!args[0]) {
    //   throw interaction.reply(
    //     `${interaction.author.name}, you need to specify the number of points to gamble.`,
    //   );
    // }

    // const amount = Number.parseInt(args[0]);
    // if (Number.isNaN(amount))
    //   throw interaction.reply(`${interaction.author.name}, that's not a number.`);
    // if (amount < 25) {
    //   throw interaction.reply(
    //     `${interaction.author.name}, you need to bet more than 25 points.`,
    //   );
    // }

    // const user = Users.get(interaction.author.id)!;

    // if (amount > user.points) {
    //   throw interaction.reply(
    //     `${
    //       interaction.author.name
    //     }, you don't have enough points to gamble ${amount.toLocaleString()}.`,
    //   );
    // }

    // const won = Math.random() < 0.5;
    // if (won) {
    //   const amountWon = Number(
    //     (amount * (Math.random() * 0.55)).toFixed(0),
    //   );

    //   user.points += amountWon;
    //   Users.update(interaction.author.id, user);

    //   interaction.reply(
    //     `${
    //       interaction.author.name
    //     }, you won ${amountWon.toLocaleString()} points! You now have ${user.points.toLocaleString()} points.`,
    //   );
    // }
    // else {
    //   const amountLost = Number(
    //     (amount * (Math.random() * (amount < 1000 ? 0.5 : 0.1))).toFixed(0),
    //   );

    //   user.points -= amountLost;
    //   Users.update(interaction.author.id, user);

    //   interaction.reply(
    //     `${
    //       interaction.author.name
    //     }, you lost ${amountLost.toLocaleString()} points. You now have ${user.points.toLocaleString()} points.`,
    //   );
    // }
  },
} satisfies Command;
