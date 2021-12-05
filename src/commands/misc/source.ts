import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("source")
    .setDescription("Get the link to the source code"),
  async execute(interaction: { reply: (arg0: string) => any; }) {
    await interaction.reply("https://github.com/jsun1590/conquer-wace");
    },
};
