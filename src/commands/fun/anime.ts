import { SlashCommandBuilder } from "@discordjs/builders";
const fetch = require("node-fetch");
import { Interaction } from "../../interfaces"

const sample = (array: Array<string>) => array[Math.floor(Math.random() * array.length)];
const tags = ["baka",
    "cry",
    "poke",
    "smug",
    "slap",
    "tickle",
    "pat",
    "laugh",
    "feed"]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("anime")
        .setDescription("Get random anime pictures. Probably SFW ones.")
        .addNumberOption((option) =>
            option
                .setName("amount")
                .setDescription("Number of anime pics. Max 5.")
                .setRequired(false)
        ),
    async execute(interaction: Interaction) {
        let amount = interaction.options.getNumber("amount");
        if (!amount || amount < 1) {
            amount = 1;
        } else
            if (amount > 5) {
                await interaction.reply("heck off nougat!");
                return;
            }
        // TODO Make give min/max limits to
        let out = "";
        for (let i = 0; i < amount; i++) {
            let { image } = await fetch(`http://api.nekos.fun:8080/api/${sample(tags)}`).then(
                (response: { json: () => string }) => response.json()
            ).catch((error: any) => {
                console.error("anime boomed");
            })
            out += image + "\n";
        }

        await interaction.reply(out);
    },
};
