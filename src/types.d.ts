import Bot from './structures/bot'
import { SlashCommandBuilder } from "@discordjs/builders";
import { ButtonInteraction, CommandInteraction, MessageButton, Modal, ModalSubmitInteraction, PermissionResolvable, Snowflake } from "discord.js";

export interface BotCommand {
    data:
        | SlashCommandBuilder
        | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    requiredPerms?: PermissionResolvable;
    execute: (
        interaction: CommandInteraction<"cached">,
        client: Bot
    ) => unknown;
}

export interface ButtonFile {
    data: 
        | MessageButton;
    execute: (
        interaction: ButtonInteraction,
        client: Bot
    ) => unknown;    
}

export interface BotConfig {
    GuildID: Snowflake;
    ClientID?: Snowflake
    Token: string 
}

export interface ModalFile {
    data: 
        | Modal;
    execute: (
        interaction: ModalSubmitInteraction,
        client: Bot
    ) => unknown;    
}