// import the required modules
DiscordJS = require('discord.js');
const dotenv = require('dotenv').config();
const { intents } = DiscordJS;

// create a new bot instance & declare intents
const bot = new DiscordJS.Client({
    intents: [
        DiscordJS.Intents.FLAGS.GUILDS,
        DiscordJS.Intents.FLAGS.GUILD_MESSAGES
    ]
})

// run when client is ready
bot.on("ready", () => {
    console.log(`logged in as ${bot.user.tag}`);

    const guildID = "924047719306260500";
    const guild = bot.guilds.cache.get(guildID);
    let commands;

    // fetch required command based on value of guild 
    if (guild) {
        commands = guild.commands;
    } else {
        commands = bot.application?.commands;
    }

    // construct addition slash command
    commands?.create({
        name: "add",
        description: "adds two values",
        options: [{
            name: "num1",
            description: "first number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "num2",
            description: "second number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }]
    })
    // construct subtraction slash command
    commands?.create({
        name: "subtract",
        description: "subtracts two numbers",
        options: [{
            name: "num1",
            description: "first number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "num2",
            description: "second number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER 
        }]
    })
    
})

bot.on("interactionCreate", async interaction => {
    // return if interaction is not a command
    if (!interaction.isCommand) {
        return;
    }

    // implement slash commands
    const { commandName, options } = interaction;

    if (commandName === "add") {
        const num1 = await options.getNumber("num1")
        const num2 = await options.getNumber("num2") 
        interaction.reply({
            content: `the sum is ${num1 + num2}`,
            ephemeral: false
        })
    } else if (commandName === "subtract") {
        await interaction.reply({
            contesnt: `the difference is ${num1 - num2}`,
            ephemeral: false
        })
    }
})
// login to discord using the bot token
bot.login(process.env.TOKEN);