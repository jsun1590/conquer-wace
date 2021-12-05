import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("interval-test")
    .setDescription("Interval Test"),
  async execute(interaction: { reply: (arg0: string) => any }) {
    let counter = 0;
    let interval = setInterval(function () {
      console.log(`hello ${counter}`);
      counter++;
    }, 1 * 1000);

    await interaction.reply("Interaction Successful.");
  },
};
