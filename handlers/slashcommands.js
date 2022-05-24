const fs = require('fs')

const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(f=>f.endsWith(ending))
}

module.exports = (bot, reload) => {
    const { client } = bot

    let slashCommands = getFiles("./slashcommands/", ".js")

    if (slashCommands.length === 0) 
        console.log("No slash commands found.")
    
    slashCommands.forEach(f => {
        if (reload) delete require.chache[require.resolve(`../slashcommands/${f}`)]
        const slashcmd = require(`../slashcommands/${f}`)
        client.slashcommands.set(slashcmd.name, slashcmd)
    })
}