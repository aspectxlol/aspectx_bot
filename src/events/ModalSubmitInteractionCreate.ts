import { Interaction, ModalSubmitInteraction, MessageEmbed } from "discord.js";
import bot from "../structures/bot";

export default async function onModalSubmitInteractionCreate(interaction:Interaction, client: bot) {
    if(!interaction.isModalSubmit()) return;
    const modalInt = interaction as ModalSubmitInteraction
    const modal = client.modals.get(modalInt.customId)
    
    try {
        modal?.execute(modalInt, client)
    } catch (e) {
        console.error(e);

        const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(
                "❌ An error occurred while executing the command."
        )

        if (modalInt.deferred || modalInt.replied) {
            await modalInt.editReply({
                content: " ",
                embeds: [errorEmbed],
            });
        } else {
            await modalInt.reply({
                content: " ",
                embeds: [errorEmbed],
                ephemeral: true,
            });
        }
    }
}