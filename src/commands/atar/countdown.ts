import { SlashCommandBuilder } from "@discordjs/builders";
const moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

function diff_calc(start: any, end: any) {
  let diff = moment
    .duration(end.diff(start))
    .format("D [day], H [hour and] m [min]");
  return diff;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("countdown")
    .setDescription("Get ATAR countdowns."),
  async execute(interaction: { reply: (arg0: object) => void }) {
    let now: any = new moment();
    let wace_2022 = diff_calc(now, new moment("2022-11-01"));
    let results_2022 = diff_calc(now, new moment("2021-12-19"));

    let embedData: object = {
      embeds: [
        {
          title: "ATAR Countdowns",
          description: "2022 WACE exam schedules not yet released.",
          color: 16711680,
          fields: [
            {
              name: "Time Until 2021 ATAR Results",
              value: results_2022,
            },
            ,
            {
              name: "Time Until 2022 WACE Exams",
              value: wace_2022,
            },
          ],
          footer: {
            text: "In OT Lee we trust.",
            icon_url:
              "http://cdn.shopify.com/s/files/1/1061/1924/products/Praying_Emoji_ios10_020ec88e-ee33-496d-a95a-df23243cebf4_grande.png?v=1571606092",
          },
        },
      ],
    };
    interaction.reply(embedData);
  },
};
