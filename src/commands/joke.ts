import { SlashCommandBuilder } from "@discordjs/builders";
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Gets a random joke."),

  async execute(interaction: { reply: (arg0: any) => any }) {
    let { joke } = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single").then(
      (response: { json: () => string }) => response.json()
    );
    await interaction.reply(joke);
  },
};
