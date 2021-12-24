import { channelMention } from "@discordjs/builders";
import chalk from "chalk";
import { Interaction } from "./interfaces";
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
  async (interaction: Interaction) => {
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

// Logging

client.on(
  "messageDelete",
  async (message: {
    member: { id: string; displayName: any };
    createdAt: any;
    channel: any;
    content: any;
  }) => {
    client.channels
      .fetch("918489544570077225")
      .then((channel: { send: (arg0: string) => any }) => {
        if (message.member.id == "915125691463401474") return;
        channel.send(
`\`Type:\` 🗑️ Deleted message
\`Time deleted:\` ${message.createdAt}
\`Username:\` ${message.member.displayName}
\`ID:\` ${message.member.id}
\`Channel:\` ${message.channel}
\`Message:\` ${message.content}
_ _`
        );
      })
      .catch(console.error);
  }
);

client.on(
  "messageUpdate",
  async (
    oldMessage: { content: any },
    newMessage: {
      member: { id: string; displayName: any };
      editedAt: any;
      channel: any;
      content: any;
    }
  ) => {
    client.channels
      .fetch("918489544570077225")
      .then((channel: { send: (arg0: string) => any }) => {
        if (newMessage.member.id == "915125691463401474") return;

        channel.send(
`\`Type:\` 📝 Modified message
\`Time modified:\` ${newMessage.editedAt}
\`Username:\` ${newMessage.member.displayName}
\`ID:\` ${newMessage.member.id}
\`Channel:\` ${newMessage.channel}
\`Original message:\` ${oldMessage.content}
\`Updated message:\` ${newMessage.content}
_ _`
        );
      })
      .catch(console.error);
  }
);

client.once("ready", () => {
  console.log("✅ " + chalk.green("Bot ready!"));
});

client.login(token);
