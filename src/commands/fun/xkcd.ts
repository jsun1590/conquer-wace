import { SlashCommandBuilder } from "@discordjs/builders";
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xkcd")
    .setDescription("Gets a random xkcd comic."),

  async execute(interaction: { reply: (arg0: any) => any }) {
    let { title, url } = await fetch("https://random-xkcd-img.herokuapp.com").then(
      (response: { json: () => string }) => response.json()
    );
    await interaction.reply(title + "\n" + url);
  },
};
