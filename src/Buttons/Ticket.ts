import { MessageButton, Modal, TextInputComponent } from "discord.js";
import { ButtonFile } from "../types";
import TicketModal from '../Modals/Ticket'

const Button: ButtonFile = {
    data: new MessageButton()
        .setCustomId('Ticket')
        .setLabel('Open Ticket')
        .setStyle('SUCCESS'),
    async execute(interaction, client) {
        interaction.showModal(TicketModal.data)
    }
        
}

export default Button;