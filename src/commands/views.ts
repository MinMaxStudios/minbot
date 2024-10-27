import type { Command } from "@/utils/commands";

export default {
  name: "views",
  run: async ({ interaction }) => {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&&fields=items/statistics/viewCount&id=${interaction.author.id}&key=${process.env.YOUTUBE_API_KEY}`);
    const data = await res.json();

    interaction.reply(`${interaction.author.name}, you have ${Number.parseInt(data.items[0].statistics.viewCount).toLocaleString()} views.`);
  },
} satisfies Command;
