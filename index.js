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

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload)

client.loadEvents(bot, false)

module.exports = bot

client.login(process.env.TOKEN)
//Invite URL https://discord.com/api/oauth2/authorize?client_id=975168776700067910&permissions=412384349248&scope=bot%20applications.commands