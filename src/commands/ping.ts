import { SlashCommandBuilder } from "@discordjs/builders"
import { BotCommand } from "../types"

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Cool Command"),
    requiredPerms: ["BAN_MEMBERS", "KICK_MEMBERS"],
    async execute(interaction, Client) {
        return interaction.reply({content: ``, ephemeral: true})
    }
}

export default command