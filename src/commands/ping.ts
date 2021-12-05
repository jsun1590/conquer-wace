import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test the bot's latency."),
  async execute(interaction: {
    member: { displayName: string };
    reply: (arg0: string) => any;
    client: { ws: { ping: number } };
  }) {
    console.log(interaction.member.displayName + " pinged!")
    // little trolling.
    if (interaction.member.displayName == "yxz") {
      await interaction.reply(
        `:ping_pong: Pong! Latency: ${Math.round(interaction.client.ws.ping)}0 s`
      );
    } else {
      await interaction.reply(
        `:ping_pong: Pong! Latency: ${Math.round(interaction.client.ws.ping)}ms`
      );
    }
  },
};
