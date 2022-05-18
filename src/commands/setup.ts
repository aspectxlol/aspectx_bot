import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { CategoryChannel, Guild, MessageActionRow, PermissionOverwrites } from "discord.js";
import { BotCommand } from "../types";
import Ticket from '../Buttons/Ticket'
import { ChannelType } from "discord-api-types/v10";

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('a Ticket Setup Command for aspectx bot')
        .addChannelOption(op => op
                .addChannelTypes(ChannelType.GuildCategory)
                .setName('ticket')
                .setDescription("the category of tickets")
                .setRequired(true)
            ),
    requiredPerms:['ADMINISTRATOR'],
    async execute(interaction, client) {    
        const ticketCategory = interaction.options.getChannel('ticket') as CategoryChannel
        client.guildSettings.setTicketCategory(ticketCategory)

        const row = new MessageActionRow()  
            .addComponents(Ticket.data);

        interaction.reply({components: [row]})
    }
}

export default command
