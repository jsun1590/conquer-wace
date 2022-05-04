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
<<<<<<< HEAD
      if (amount > 5) {
        await interaction.reply("heck off nougat!");
      }
    // TODO Make give min/max limits to
=======
    if (amount > 5) {
      await interaction.reply("Sorry, the max number of cat images is 5 at a time.");
    }

>>>>>>> 9a71a408d5f36f754a63a2cc3f225533e8d67d39
    let out = "";
    for (let i = 0; i < amount; i++) {
      let url = await fetch("https://api.thecatapi.com/v1/images/search").then(
        (response: { json: () => string }) => response.json()
<<<<<<< HEAD
      )
      out += url[0]["url"] + "\n";
=======
      ).catch((error) => {
        console.log(error)
      });;
      out += file + "\n";
>>>>>>> 9a71a408d5f36f754a63a2cc3f225533e8d67d39
    }

    await interaction.reply(out);
  },
};
