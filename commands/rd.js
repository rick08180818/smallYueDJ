const {SlashCommandBuilder} = require('discord.js')
const { Options } = require('distube')

module.exports = {
    data : new SlashCommandBuilder()
    .setName('roll_dice')
    .setDescription('Roll Dice')
    .addNumberOption(option => option
        .setName('dice')
        .setDescription('Number of dice')
        .setRequired(true)
    )
    .addNumberOption(option => option
            .setName('sides')
            .setDescription('Number of sides')
            .setRequired(true)
    )
    .addStringOption(option => option
            .setName('type')
            .setDescription('擲骰項目')),
    async execute(interaction){
        const numDice = interaction.options.getNumber('dice')
        const numSides = interaction.options.getNumber('sides')
        const type = interaction.options.getString('type')

        if (isNaN(numDice) || isNaN(numSides)) {
            return interaction.reply(`You need to enter valid numbers!`);
        }

        const results = []
        let total = 0

        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * numSides) + 1;
            results.push(roll);
            total += roll;
        }
        if(type){
            interaction.reply(`🎲${interaction.member}進行了“${type}”擲骰，擲出了(${results.join(', ')}):(${total})`)
        }else{
            interaction.reply(`🎲${interaction.member}進行了擲骰，擲出了(${results.join(', ')}):(${total})`)

        }
    }
}