import { SlashCommandBuilder } from "@discordjs/builders";
const fetch = require("node-fetch");
import { Interaction } from "../../interfaces"

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
  async execute(interaction: Interaction) {
    let amount = interaction.options.getNumber("amount");
    if (!amount) {
      amount = 1;
    } else
    if (amount > 5) {
      await interaction.reply("Sorry, the max number of cat images is 5 at a time.");
    }

    let out = "";
    for (let i = 0; i < amount; i++) {
      let { file } = await fetch("https://aws.random.cat/meow").then(
        (response: { json: () => string }) => response.json()
      ).catch((error) => {
        console.log(error)
      });;
      out += file + "\n";
    }

    await interaction.reply(out);
  },
};
