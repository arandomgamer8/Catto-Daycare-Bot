const durations = [
    { name: "1 minute", value: 60 * 1000 },
    { name: "5 minutes", value: 5 * 60 * 1000 },
    { name: "10 minutes", value: 10 * 60 * 1000 },
    { name: "30 minutes", value: 30 * 60 * 1000 },
    { name: "1 hour", value: 60 * 60 * 1000 },
    { name: "1 day", value: 24 * 60 * 60 * 1000 },
    { name: "1 week", value: 7 * 24 * 60 * 60 * 1000 },
]

const run = async (client, interaction) => {
    let member = interaction.options.getMember("user")
    let duration = interaction.options.getNumber("duration")
    let reason = interaction.options.getString("reason") || "No reason provided"

    if (!member) {
        interaction.reply("You must specify a user.")
        return
    }

    try {
        await member.timeout(duration, reason)
        interaction.reply(`Timed out ${member.user.tag} for ${durations.find(d=> duration === d.value)?.name} for the reason of ${reason}.`)
    }

    catch(err){
        if (err){
            console.error(err)
            return interaction.reply("Failed to timeout.")
        }
    }
}

module.exports = {
    name: 'timeout',
    description: 'Timeout a user for a specified amount of time.',
    perm: 'MODERATE_MEMBERS',
    options: [
        {
            name: 'user', description: 'The user to timeout.',
            type: 'USER', required: true
        },
        {
            name: 'time', description: 'The amount of time to timeout the user for.',
            type: 'NUMBER', required: true,
            choices: durations,
        },
        {
            name: 'reason', description: 'The reason for the timeout.',
            type: 'STRING', required: false
        }
    ],
    run
}