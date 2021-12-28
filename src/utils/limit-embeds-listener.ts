import { Client, Channel, Message } from "../interfaces";
import fs from "fs";
const ta = require("time-ago");

module.exports = {
  limitEmbed: function (client: Client, message: Message) {
    let file = "src/data/users.json";
    if (!fs.existsSync(file)) {
      fs.writeFileSync("src/data/users.json", "[]");
    }

    let content = JSON.parse(fs.readFileSync(file, "utf-8"));

    let user = content.find(
      (user: { userId: string }) => user.userId === message.author.id
    );

    if (user == null) {
      return;
    }

    if (!user.expiry || user.expiry < Date.now()) {
      user.expiry = message.createdTimestamp + ta.timefriendly(user.frequency);
      console.log(message.createdTimestamp, ta.timefriendly(user.frequency))

      let data = JSON.stringify(content, null, 2);
      fs.writeFileSync("src/data/users.json", data);
    }

    else {
      message.delete();
      message.channel.send(`${message.author} can only use embeds once every ${user.frequency}. You can use embeds again ${ta.ago(user.expiry)}.`)
    }
  },
};
