import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test the bot's latency."),
  async execute(interaction: {
    member: { displayName: string; id: string };
    reply: (arg0: string) => any;
    client: { ws: { ping: number } };
  }) {
    console.log(interaction.member.displayName + " pinged!");
    // little trolling (yix).
    if (interaction.member.id == "291151071806750720") {
      await interaction.reply(
        `:ping_pong: Pong! Latency: ${Math.round(
          interaction.client.ws.ping
        )}0ms`
      );
    } else {
      await interaction.reply(
        `:ping_pong: Pong! Latency: ${Math.round(interaction.client.ws.ping)}ms`
      );
    }
  },
};
