import bot from "../structures/bot";
import { readdirSync } from 'node:fs'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { BotCommand } from "../types";
require('dotenv').config()

export default async function onReady(client: bot) {
    console.clear()
    console.log(`
    

    
        ${client.user?.username!} is Ready on ${client.guilds.cache.size} Servers
        
        
        
    `)
        
    const commandFiles = readdirSync("./src/commands").filter(file => file.endsWith('.ts'));
    const ButtonFiles = readdirSync("./src/Buttons").filter(file => file.endsWith('.ts'));
    const ModalFiles = readdirSync("./src/Modals").filter(file => file.endsWith('.ts'));

    const commands = [];

    for (const file of commandFiles) {
        const command = (await import(`../commands/${file}`)).default as BotCommand;
        if (!command) {
            console.error(
                `File at path ${file} seems to incorrectly be exporting a command.`
                );
                continue;
            }
            commands.push(command.data)
        }

    const rest = new REST({
        version: '9'
    }).setToken(process.env.TOKEN!);

    rest.put(Routes.applicationGuildCommands(client.user?.id!, process.env.GUILD_ID!), {
            body: commands
        })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);

    const addModal = async (file: string) => {
        const modal = (await import(`../Modals/${file}`)).default 
        client.modals.set(modal.data.customId!, modal)
        console.log(`       |Modal ${file}.ts registered`)
    }
    
    const addCommand = async (file: string) => {
        const command = (await import(`../commands/${file}`)).default //as BotCommand
        client.commands.set(command.data.name!, command)
        console.log(`       |Command ${file}.ts registered`)
    }
    
    const addButton = async (file: string) => {
        const button = (await import(`../Buttons/${file}`)).default //as ButtonFile
        client.Buttons.set(button.data.customId!, button)
        console.log(`       |Button ${file}.ts registered`)
    }
    
    for (const file of commandFiles) {
        addCommand(file)
    }
    
    for (const file of ButtonFiles) {
        addButton(file)
    }
    
    for (const file of ModalFiles) {
        addModal(file)
    }

}