export {};
const glob = require("glob");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const dotenv = require("dotenv");

dotenv.config();
const token = process.env.token;
const clientId = process.env.client_id;
const guildId = process.env.guild_id;

const commandFiles = glob.sync("**/*.ts", { cwd: "src/commands" });
const commands = [];
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (file.startsWith("admin/")) {
    command.data["description"] = "[Admin Only] " + command.data["description"];
  }
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
