import { SlashCommandBuilder } from "@discordjs/builders";
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Get random cat pictures.")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("Number of cat pics. Max 5.")
        .setRequired(false)
    ),
  async execute(interaction: {
    options: { getNumber: (arg0: string) => any };
    reply: (arg0: any) => any;
  }) {
    let amount = interaction.options.getNumber("amount");
    if (!amount) {
      amount = 1;
    }
    // TODO Make give min/max limits to
    let out = "";
    for (let i = 0; i < amount; i++) {
      let { file } = await fetch("https://aws.random.cat/meow").then(
        (response: { json: () => string }) => response.json()
      );
      out += file + "\n";
    }

    await interaction.reply(out);
  },
};
