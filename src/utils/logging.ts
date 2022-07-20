import { Client, Channel, Message } from "../interfaces";

module.exports = {
  newLog: function (client: Client, message: Message) {
    client.channels
      .fetch("918489544570077225")
      .then((channel: Channel) => {
        if (message.member === null) return; else
          if (message.member.id === "915125691463401474") return;
        channel.send(
          `\`Type:\` 🆕 New message
\`Time created:\` ${message.createdAt}
\`Username:\` ${message.member.displayName}
\`User ID:\` ${message.member.id}
\`Channel:\` ${message.channel}
\`Message:\` ${message.content}
\`Attachments:\` ${message.attachments.map((obj: { url: any; }) => obj.url).join('\r\n')}
_ _`
        );
      })
      .catch(console.error);
  },

  deleteLog: function (client: Client, message: Message) {
    client.channels
      .fetch("918489544570077225")
      .then((channel: Channel) => {
        if (message.member.id === "915125691463401474") return;
        channel.send(
          `\`Type:\` 🗑️ Deleted message
\`Time deleted:\` ${message.createdAt}
\`Username:\` ${message.member.displayName}
\`User ID:\` ${message.member.id}
\`Channel:\` ${message.channel}
\`Message:\` ${message.content}
\`Attachments:\` ${message.attachments.map((obj: { url: any; }) => obj.url)}
_ _`
        );
      })
      .catch(console.error);
  },

  updateLog: function (
    client: Client,
    oldMessage: Message,
    newMessage: Message
  ) {
    client.channels
      .fetch("918489544570077225")
      .then((channel: Channel) => {
        if (newMessage.member.id === "915125691463401474") return;

        channel.send(
          `\`Type:\` 📝 Modified message
\`Time modified:\` ${newMessage.editedAt}
\`Username:\` ${newMessage.member.displayName}
\`User ID:\` ${newMessage.member.id}
\`Channel:\` ${newMessage.channel}
\`Original message:\` ${oldMessage.content}
\`Original Attachments:\` ${oldMessage.attachments.map((obj: { url: any; }) => obj.url)}
\`Updated message:\` ${newMessage.content}
\`Updated Attachments:\` ${newMessage.attachments.map((obj: { url: any; }) => obj.url)}
_ _`
        );
      })
      .catch(console.error);
  },
};
