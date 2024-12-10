import type { Command } from "@/utils/commands";

export default {
  name: "rules",
  run: ({ interaction }) => {
    interaction.reply("https://docs.google.com/document/d/1Yy0reE7oowh5fcLK4S2V_47JdqrHbEfYMe8VoC56cXQ/edit?usp=sharing");
  },
} satisfies Command;
