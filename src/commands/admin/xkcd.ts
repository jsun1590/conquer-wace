import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction } from "../../interfaces"
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xkcd")
    .setDescription("Gets a random xkcd comic."),

  async execute(interaction: Interaction) {
    let { title, url } = await fetch("https://random-xkcd-img.herokuapp.com").then(
      (response: { json: () => string }) => response.json()
    );
    await interaction.reply(title + "\n" + url);
  },
};
