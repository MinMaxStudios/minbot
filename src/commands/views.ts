import type { Command } from "@/utils/commands";

export default {
  name: "views",
  run: async ({ interaction, args }) => {
    const channelId = args[0] ?? interaction.author.id;

    const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&&fields=items/snippet/name,items/statistics/viewCount&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`);
    const data = await res.json();

    interaction.reply(`${interaction.author.name}, ${channelId !== interaction.author.id ? `${data.items[0].snippet.name} has` : "you have"} ${Number.parseInt(data.items[0].statistics.viewCount).toLocaleString()} views.`);
  },
} satisfies Command;
