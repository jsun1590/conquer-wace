import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction } from "../../interfaces";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test the bot's latency."),
  async execute(interaction: Interaction) {
    console.log(`${interaction.member.displayName} pinged!`);

    // little trolling (yix).
    let isYix = interaction.member.id === "291151071806750720";
    let ping = Math.round(interaction.client.ws.ping).toString();
    await interaction.reply(
      `:ping_pong: Pong! Latency: ${isYix ? ping + "0" : ping}ms`
    );
  },
};
