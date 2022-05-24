//requirments:
const Discord = require('discord.js')

require("dotenv").config()

const client = new Discord.Client({
    intents: ["GUILDS"]
})

let bot = {
    client,
}

const guildID = "923382859237052516"

client.slashcommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload)
client.loadSlashCommands(bot, false)

client.on('ready', async () => {
    const guild = client.guilds.cache.get(guildID)
    if (!guild)
        return console.error('Guild not found')

    await guild.commands.set([...client.slashcommands.values()])
    console.log(`Loaded ${client.slashcommands.size} commands`)
    process.exit(0)

})

client.login(process.env.TOKEN)