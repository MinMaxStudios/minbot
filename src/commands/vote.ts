import type { Command } from "@/utils/commands";

import { Votes } from "@/utils/db";

const names = {
  tseries: "T-Series",
  mrbeast: "MrBeast",
  pewdiepie: "PewDiePie",
} as const;

export default {
  name: "vote",
  cooldown: 10 * 1000,
  run: ({ interaction, args }) => {
    const votee = args[0]?.toLowerCase();
    if (!votee) {
      return interaction.reply(
        `${interaction.author.name}, please specify someone to vote for.`,
      );
    }

    Votes.vote(votee);

    // this will always exist because of the check in `addVote`
    const { votes } = Votes.get(votee)!;
    interaction.reply(
      `${interaction.author.name} has voted for ${
        names[votee as keyof typeof names] ?? votee
      }${
        votes > 1 ? `, and so has ${votes.toLocaleString()} other people` : ""
      }!`,
    );
  },
} satisfies Command;
