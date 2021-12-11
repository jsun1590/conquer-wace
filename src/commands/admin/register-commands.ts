import { SlashCommandBuilder } from "@discordjs/builders";
const glob = require("glob");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const dotenv = require("dotenv").config();

const token = process.env.token;
const clientId = process.env.client_id;
const guildId = process.env.guild_id;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register-commands")
    .setDescription("Register slash commands with the Discord API."),
  async execute(interaction: {
    member: { roles: { cache: any } };
    reply: (arg0: string) => any;
  }) {
    const rest = new REST({ version: "9" }).setToken(token);

    const commandFiles = glob.sync("**/*.ts", { cwd: "src/commands" });
    const commands = [];
    for (const file of commandFiles) {
      const command = require(`../${file}`);
      if (file.startsWith("admin/")) {
        command.data["description"] = "[Admin Only] " + command.data["description"];
      }
      commands.push(command.data.toJSON());
    }

    await rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      })
      .then(() =>
        interaction.reply("Successfully registered application commands.")
      )
      .catch(console.error);
  },
};
