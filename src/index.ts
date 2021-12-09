export {};
import chalk from 'chalk';
const glob = require("glob");
const { Client, Collection, Intents } = require("discord.js");
require("dotenv").config();

const token = process.env.token;
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});


client.commands = new Collection();

const commandFiles = glob.sync("**/*.ts", { cwd: "src/commands" });
const commands = [];
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  command["path"] = file;
  client.commands.set(command.data.name, command);
}

client.on(
  "interactionCreate",
  async (interaction: {
    isCommand: () => any;
    commandName: any;
    member: { roles: { cache: any } };
    reply: (arg0: any) => any;
  }) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    // if (!command) return;

    try {
      if (command.path.startsWith("admin/")) {
        let rolesData = interaction.member.roles.cache;
        let rolesArray: string[] = [];

        for (let role of rolesData) {
          rolesArray.push(role[1]["name"]);
        }

        if (rolesArray.includes("Guardians")) {
          await command.execute(interaction);
        } else {
          await interaction.reply(
            "You need to be a Guardian to use this command."
          );
        }
      } else {
        await command.execute(interaction);
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command.",
        ephemeral: true,
      });
    }
  }
);

client.once("ready", () => {
  console.log("✅ " + chalk.green("Bot ready!"));
});

client.login(token);
