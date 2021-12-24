import { SlashCommandBuilder } from "@discordjs/builders";
const fetch = require("node-fetch");
import { Interaction } from "../../interfaces"

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Gets a random joke."),

  async execute(interaction: Interaction) {
    let { joke } = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single").then(
      (response: { json: () => string }) => response.json()
    );
    await interaction.reply(joke);
  },
};
