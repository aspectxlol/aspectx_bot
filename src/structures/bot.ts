import { CategoryChannel, Client, ClientOptions, Collection, ModalSubmitInteraction } from "discord.js";
import { BotCommand, ButtonFile, ModalFile } from "../types";



export default class bot extends Client {
    guildSettings: guildSettings;
    ticket: ticketSystem;

    commands: Collection<String, BotCommand>
    Buttons: Collection<String, ButtonFile>
    modals: Collection<String, ModalFile>

    constructor(options: ClientOptions) {
        super(options)
        this.commands = new Collection()
        this.Buttons = new Collection()
        this.modals = new Collection()

        this.guildSettings = new guildSettings();
        this.ticket = new ticketSystem(this)
    }
}


class guildSettings {
    ticketCategory: CategoryChannel | undefined

    setTicketCategory(Category: CategoryChannel) {
        this.ticketCategory = Category
    }
}

class ticketSystem {
    private client: bot;
    constructor(client: bot) {
        this.client = client
    }

    createTicket(interaction: ModalSubmitInteraction) {
        if(!this.client.guildSettings.ticketCategory) {
            return interaction.reply({content: 'Tickets are not enabled Here', ephemeral: true})
        }
        const subject = interaction.fields.getTextInputValue('subject')
        this.client.guildSettings.ticketCategory.createChannel('Ticket', {
            type: 'GUILD_TEXT',
            nsfw: true,
            topic: subject,
            permissionOverwrites: [
                {
                    id: `${interaction.user.id}`,
                    allow: 'VIEW_CHANNEL'
                },
                {
                    id: `${interaction.guild?.id}`,
                    deny: 'VIEW_CHANNEL'
                }
            ]
        }).then((ticket) => {
            return interaction.reply({content: `Ticket Created <#${ticket.id}>`, ephemeral: true})
        })
    }
}