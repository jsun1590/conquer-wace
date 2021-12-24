import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction } from "../../interfaces"
module.exports = {
  data: new SlashCommandBuilder()
    .setName("source")
    .setDescription("Get the link to the source code"),
  async execute(interaction: Interaction) {
    await interaction.reply("https://github.com/jsun1590/conquer-wace");
    },
};
