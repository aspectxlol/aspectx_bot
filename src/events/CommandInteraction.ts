import { CommandInteraction, GuildMember, Interaction, MessageEmbed } from "discord.js";
import bot from "../structures/bot";

export default async function onCommandInteractionCreate(Interaction: Interaction, client: bot) {
    if(Interaction.isCommand()) {
        const command = client.commands.get(Interaction.commandName)
        const member = Interaction.member as GuildMember
        if (!command) return;
        if (
            command.requiredPerms &&
            !member.permissions.has(command.requiredPerms)
        ) {
            const invalidPermissionsEmbed = new MessageEmbed()
                .setColor("RED")
                .setTitle("Command Failed")
                .setDescription("You Have Insufficient Permissions");
                // .addFields([
                //     {name: 'Needed Perms', value: `${command.requiredPerms.toLocaleString()}`}
                // ])
            Interaction.reply({
                embeds: [invalidPermissionsEmbed],
                ephemeral: true,
            });
            return;
        }

        const cmdInt = Interaction as CommandInteraction<"cached">

        try {
            command.execute(cmdInt, client)
        } catch (e) {
            console.error(e);

            const errorEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    "❌ An error occurred while executing the command."
                )

                if (Interaction.deferred || Interaction.replied) {
                    await Interaction.editReply({
                        content: " ",
                        embeds: [errorEmbed],
                    });
                } else {
                    await Interaction.reply({
                        content: " ",
                        embeds: [errorEmbed],
                        ephemeral: true,
                    });
                }
        }

    }

    
}