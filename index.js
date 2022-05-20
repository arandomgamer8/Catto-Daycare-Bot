const Discord = require('discord.js');
require("dotenv").config();

const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
    ]
});

client.on('ready', () => {
    console.log(`I am ready! Logged in as ${client.user.tag}`);
})

client.on("messageCreate", (message) => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});

client.login(process.env.TOKEN);
//Invite URL https://discord.com/api/oauth2/authorize?client_id=975168776700067910&permissions=412384349248&scope=bot%20applications.commands