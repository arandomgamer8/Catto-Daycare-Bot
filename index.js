//requirments:
const Discord = require('discord.js')
require("dotenv").config()

//intents:
const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_MEMBERS',
    ]
})

let bot = {
    client,
    prefix: 'cd.',
    owners: ['470249639845560320'],
}

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity('with cats', { type: 'PLAYING' })
})

module.exports = bot

client.slashcommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload)
client.loadSlashCommands(bot, false)

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return
    if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server.")

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if (!slashcmd) return interaction.reply("Invalid command.")

    if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perms))
        return interaction.reply("You do not have permission to use this command.")

    slashcmd.run(client, interaction)
})

client.login(process.env.TOKEN)
//Invite URL https://discord.com/api/oauth2/authorize?client_id=975168776700067910&permissions=412384349248&scope=bot%20applications.commands