import { SlashCommandBuilder } from "@discordjs/builders";
import { User } from "discord.js";
import { Interaction } from "../../interfaces";
const ta = require("time-ago");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("limit-embeds")
    .setDescription("Limit the frequency of embeds a user can send.")
    .addUserOption((option) =>
      option.setName("user").setDescription("Target user.").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("frequency")
        .setDescription("Frequency of embeds.")
        .setRequired(true)
    ),

  async execute(interaction: Interaction) {
    const targetUser = interaction.options.getUser("user");
    const userId = targetUser.id;
    const userName = targetUser.username;

    try {
      var frequency = interaction.options.getString("frequency");
      var frequencyMs: number = ta.timefriendly(frequency);
    } catch {
      await interaction.reply("Invalid frequency.");
      return;
    }
    let file = "src/data/users.json";
    if (!fs.existsSync(file)) {
      fs.writeFileSync("src/data/users.json", "[]");
    }

    let content = JSON.parse(fs.readFileSync(file, "utf-8"));

    let user = content.find(
      (user: { userId: string }) => user.userId === userId
    );

    if (user != null) {
      user.frequency = frequency;
      user.expiry = "";
      
      let data = JSON.stringify(content, null, 2);
      fs.writeFileSync("src/data/users.json", data);

      await interaction.reply(`Updated ${userName}'s limit to 1 embed every ${frequency}.`);
      return;
    }

    let userObject = {
      userId: userId,
      frequency: frequency,
      expiry: ""
    };
    
    content.push(userObject);
    let data = JSON.stringify(content, null, 2);
    fs.writeFileSync("src/data/users.json", data);
    await interaction.reply(`${userName} has been limited to 1 embed every ${frequency}`);
  },
};
