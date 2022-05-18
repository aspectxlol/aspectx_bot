import { Intents } from "discord.js";
import onReady from "./events/ReadyEvent";
import bot from "./structures/bot";
import { readdirSync } from 'node:fs'
import { BotCommand, ButtonFile, ModalFile } from "./types";
import onCommandInteractionCreate from "./events/CommandInteraction";
import onButtonInteractionCreate from "./events/ButtonInteractionCreate";
import onModalSubmitInteractionCreate from "./events/ModalSubmitInteractionCreate";

require('dotenv').config();
const client = new bot({
    intents: new Intents(32767)
})

client.on('ready', () => {onReady(client)})
client.on('interactionCreate', (interaction) => {onCommandInteractionCreate(interaction, client)})
client.on('interactionCreate', (interaction) => {onButtonInteractionCreate(interaction, client)})
client.on('interactionCreate', (interaction) => {onModalSubmitInteractionCreate(interaction, client)})

client.login(process.env.TOKEN)