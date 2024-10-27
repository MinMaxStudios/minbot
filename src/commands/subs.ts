import type { Command } from "@/utils/commands";

export default {
  name: "subs",
  aliases: ["subscribers"],
  run: async ({ interaction, args }) => {
    const channelId = args[0] ?? interaction.author.id;
    let name: string = "";
    let subcount: number = 0;

    if (channelId === "UCX6OQ3DkcsbYNE6H8uQQuVA") {
      name = "MrBeast";
      const res = await fetch("https://mrbeast.subscribercount.app/data");
      const data = await res.json();
      subcount = data.mrbeast;
    }
    else {
      const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&&fields=items/snippet/name,items/statistics/subscriberCount&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`);
      const data = await res.json();
      name = data.items[0].snippet.name;
      subcount = Number.parseInt(data.items[0].statistics.subscriberCount);
    }

    interaction.reply(
      `${interaction.author.name}, ${channelId !== interaction.author.id ? `${name} has` : "you have"} ${subcount.toLocaleString()} subscribers.`,
    );
  },
} satisfies Command;
