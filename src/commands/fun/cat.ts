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
    if (!amount || amount < 1) {
      amount = 1;
    } else
      if (amount > 5) {
        await interaction.reply("heck off nougat!");
        return;
      }
    // TODO Make give min/max limits to
    let out = "";
    for (let i = 0; i < amount; i++) {
      let url = await fetch("https://api.thecatapi.com/v1/images/search").then(
        (response: { json: () => string }) => response.json()
      ).catch((error: any) => {
        console.error("boomed");
      })
      out += url[0]["url"] + "\n";
    }

    await interaction.reply(out);
  },
};
