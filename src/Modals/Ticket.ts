import { MessageActionRow, Modal, ModalActionRowComponent, TextInputComponent } from "discord.js";
import { ModalFile } from "../types";

const input = new TextInputComponent()
    .setRequired(true)
    .setCustomId('subject')
    .setLabel('What is the Subject of this Ticket')
    .setStyle('SHORT');


const row = new MessageActionRow<ModalActionRowComponent>().addComponents(input)

const modals: ModalFile = {
    data: new Modal()
        .setCustomId('ticket')
        .setTitle('Ticket')
        .addComponents(row),

    async execute(interaction, client) {
        client.ticket.createTicket(interaction)
    }
}

export default modals