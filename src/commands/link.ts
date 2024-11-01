import Fuse from "fuse.js";

import type { Command } from "@/utils/commands";

import { Users } from "@/utils/db";

const fuse = new Fuse(Users.getAll(), {
  keys: ["id", "name"],
});

const linkRequests = new Map<string, {
  id: string;
  name: string;
}>();

export default {
  name: "link",
  run: ({ interaction, args }) => {
    if (!args[0]) {
      throw interaction.reply(`${interaction.author.name}, please provide a channel ID or name.`);
    }

    const query = args.join(" ");
    const results = fuse.search(query);
    if (results.length === 0) {
      throw interaction.reply(`${interaction.author.name}, no users found for "${query}".`);
    }

    const result = results[0];
    const linkRequest = linkRequests.get(result.item.id);
    const mainLinkRequestKey = [...linkRequests.entries()].find(([, { id }]) => id === result.item.id)?.[0];
    if (linkRequest) {
      throw interaction.reply(`${interaction.author.name}, you already have a link request for this user. Please go to ${result.item.name} and type !link ${interaction.author.name}.`);
    }

    if (mainLinkRequestKey) {
      const { id, name } = linkRequests.get(mainLinkRequestKey)!;
      linkRequests.delete(mainLinkRequestKey);

      const user = Users.get(interaction.author.id)!;
      const mainUser = Users.get(id)!;
      Users.update(id, {
        points: mainUser.points + user.points,
        dailyPoints: mainUser.dailyPoints + user.dailyPoints,
        mainId: undefined,
      });
      Users.update(interaction.author.id, {
        points: 0,
        dailyPoints: 0,
        mainId: id,
      });

      return interaction.reply(`${interaction.author.name}, successfully linked ${interaction.author.name} with ${name}.`);
    }

    linkRequests.set(result.item.id, {
      id: interaction.author.id,
      name: interaction.author.name,
    });
    interaction.reply(`${interaction.author.name}, link request sent. Please go to ${result.item.name} and type !link ${interaction.author.name}.`);
  },
} satisfies Command;
