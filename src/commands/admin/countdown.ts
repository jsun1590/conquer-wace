import { SlashCommandBuilder } from "@discordjs/builders";


function diff_calc(end: any) {
  const diff = end - now
  var date = new Date(diff * 1000);
  date
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  return diff
}

const now = Date.now()
const wace_2022 = diff_calc(new Date(2021, 12, 20))
wace_2022

const embedData = {
    title: "ATAR Results Countdown",
    description: "[WACE Exam Schedule](https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/724827/2021-ATAR-course-written-examinations-timetable.pdf)\nTime correct as of {now.strftime('%I %p %d/%m/%Y').lstrip('0')}.",
    color: 16711680,
    fields: [
        {
            name: "Time Until ATAR Results",
            value: "{wace[0]} days and {wace[1]+1} hours."
        }
    ],
    "footer": {
        icon_url: "http://cdn.shopify.com/s/files/1/1061/1924/products/Praying_Emoji_ios10_020ec88e-ee33-496d-a95a-df23243cebf4_grande.png?v=1571606092"
    }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("countdown")
    .setDescription("Get the link to the source code"),
  async execute(interaction: { reply: (arg0: string) => any; }) {
    console.log(wace_2022)
    },
};
