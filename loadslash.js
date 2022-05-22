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

const guildID = 923382859237052516

client.slashcommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload)
client.loadSlashCommands(bot, false)

client.on('ready', () => {
    const client.guild = client.guilds.cache.get(guildID)
    if (!guild)
        return console.log('Guild not found')
        
})

client.login(process.env.TOKEN)