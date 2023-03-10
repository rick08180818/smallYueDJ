const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
    .setName('roll_check')
    .setDescription('Roll COC skill check')
    .addNumberOption(option => option
        .setName('skill_leves')
        .setDescription('PC skill leves')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('skill_name')
        .setDescription('skill name')
    ),
    async execute(interaction){
        const skill = interaction.options.getNumber('skill_leves')
        const diceRolls = []
        const skillname = interaction.options.getString('skill_name')
        let resultMessage
        
        for (let i = 0; i < 1; i++) {
            diceRolls.push(Math.floor(Math.random() * 100) + 1);
        }

        const loss = diceRolls.filter(roll => roll > skill).length
        const regularSuccess = diceRolls.filter(roll => roll <= skill && roll > Math.floor(skill / 2)).length
        const hardSuccess = diceRolls.filter(roll => roll <= Math.floor(skill / 2) && roll > Math.floor(skill / 5)).length
        const extremeSuccess = diceRolls.filter(roll => roll <= Math.floor(skill / 5) && roll > 5).length
        const bigSuccess = diceRolls.filter(roll => roll <= 5).length
        const fumble = diceRolls.filter(roll => roll >= 96 && roll > skill).length
        
        if(skillname){
        resultMessage = `🎲${interaction.member}進行了“${skillname}”檢定(技能值 ${skill}):${diceRolls.join(', ')}\n`
        }else{
        resultMessage = `🎲${interaction.member}進行了檢定(值 ${skill}):${diceRolls.join(', ')}\n`
        }

        if (regularSuccess > 0) {
            interaction.reply(resultMessage + `普通成功`)
        }
        if (hardSuccess > 0) {
            interaction.reply(resultMessage + `困難成功`)
        }
        if (extremeSuccess > 0) {
            interaction.reply(resultMessage + `哦～極限成功`)
        }
        if (bigSuccess > 0) {
            interaction.reply(resultMessage + `噔噔噔～大成功`)
        }
        if (fumble > 0) {
            interaction.reply(resultMessage + `噔噔咚，大失敗`)
        }
        if (loss > 0){
            interaction.reply(resultMessage + "ㄨㄚˊ～失敗")
        }
        
    }
}