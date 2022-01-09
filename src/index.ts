import chalk from "chalk";
import { Channel, Interaction, Message } from "./interfaces";
const glob = require("glob");
const { Client, Collection, Intents } = require("discord.js");
const { newLog, updateLog, deleteLog } = require("./utils/logging");
const { limitEmbed } = require("./utils/limit-embeds-listener");
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
  client.commands.set(command.data?.name, command);
}

client.on("interactionCreate", async (interaction: Interaction) => {
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
});

// Logging
client.on("messageCreate", async (message: Message) => {
  newLog(client, message);
  if (message.embeds.length != 0) {
    limitEmbed(client, message);
  }
});

client.on("messageDelete", async (message: Message) => {
  deleteLog(client, message);
});

client.on("messageUpdate", async (oldMessage: Message, newMessage: Message) => {
  updateLog(client, oldMessage, newMessage);
});

client.once("ready", () => {
  console.log("✅ " + chalk.green("Bot ready!"));
});

client.login(token);
