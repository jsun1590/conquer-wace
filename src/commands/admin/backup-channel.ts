import { SlashCommandBuilder } from "@discordjs/builders";
import { URLSearchParams } from "url";
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

let raw_date = new Date();
let dd = String(raw_date.getDate()).padStart(2, "0");
let mm = String(raw_date.getMonth() + 1).padStart(2, "0");
let yyyy = raw_date.getFullYear();
let date = dd + "/" + mm + "/" + yyyy;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("backup-channel")
    .setDescription("Backs up a channel to Pastebin.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel that you want to back up.")
        .setRequired(true)
    ),

  async execute(interaction: {
    options: { getChannel: (arg0: string) => any };
    member: { roles: { cache: any } };
    reply: (arg0: string) => any;
  }) {
    const channel = interaction.options.getChannel("channel");

    const allMessages = await channel.messages
      .fetch({ limit: 100 })
      .then((messages: { content: string }[]) => {
        let allMessages = "";
        messages.forEach((message) => {
          if (!message.content) return;
          allMessages += message.content + "\n\n";
        });
        return allMessages;
      });

    const form = new URLSearchParams();
    //TODO REMOVE API KEY
    form.append("api_dev_key", process.env.api_dev_key!);
    form.append("api_option", "paste");
    form.append("api_paste_code", allMessages);
    form.append("api_paste_private", "1");
    form.append("api_paste_name", date);
    form.append("api_paste_expire_date", "N");

    const response = await fetch("https://pastebin.com/api/api_post.php", {
      method: "POST",
      body: form,
      charset: "UTF-8",
    });

    const data = await response.text();

    await interaction.reply(data);
  },
};
