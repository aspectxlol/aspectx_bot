import { ButtonInteraction, Interaction, MessageEmbed } from "discord.js";
import bot from "../structures/bot";

export default async function onButtonInteractionCreate(Interaction: Interaction, client: bot) {
    if(!Interaction.isButton()) return;
    const btnInt = Interaction as ButtonInteraction<"cached">
    const button = client.Buttons.get(btnInt.customId)

    try {
        button?.execute(btnInt, client)
    } catch (e) {
        console.error(e);

        const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(
                "❌ An error occurred while executing the command."
        )

        if (btnInt.deferred || btnInt.replied) {
            await btnInt.editReply({
                content: " ",
                embeds: [errorEmbed],
            });
        } else {
            await btnInt.reply({
                content: " ",
                embeds: [errorEmbed],
                ephemeral: true,
            });
        }
    }
}