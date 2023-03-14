const {SlashCommandBuilder, GuildNSFWLevel} = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
    .setName('roll_check')
    .setDescription('Roll COC skill check')
    .addNumberOption(option => option
        .setName('skill_levels')
        .setDescription('PC skill leves')
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('skill_name')
        .setDescription('skill name')
    )
    .addNumberOption(option => option
        .setName('bonus_dice')
        .setDescription('Number of bonus dice')),

    async execute(interaction){
        const skill = interaction.options.getNumber('skill_levels')
        const diceRolls = []
        const bonusDices = []
        const skillname = interaction.options.getString('skill_name')
        const bonusDice = interaction.options.getNumber('bonus_dice')

        let resultMessage
        
        for (let i = 0; i < 1 ; i++) {
            diceRolls.push(Math.floor(Math.random() * 100) + 1);
        }

        if(bonusDice){
        for (let i = 0; i < bonusDice; i++) {
            let bonusDiceRoll = (Math.floor(Math.random() * 10) + 1) * 10 + diceRolls[0]
            if(bonusDiceRoll > 100){
                bonusDiceRoll = bonusDiceRoll - 100
                bonusDices.push(bonusDiceRoll)
            }else{
                bonusDices.push(bonusDiceRoll)
            }
            }

        }  

        const loss = diceRolls.filter(roll => roll > skill).length
        const regularSuccess = diceRolls.filter(roll => roll <= skill & roll > Math.floor(skill / 2)).length
        const hardSuccess = diceRolls.filter(roll => roll <= Math.floor(skill / 2) & roll > Math.floor(skill / 5)).length
        const extremeSuccess = diceRolls.filter(roll => roll <= Math.floor(skill / 5) & roll > 5).length
        const bigSuccess = diceRolls.filter(roll => roll <= 5 & roll <= skill).length
        const fumble = diceRolls.filter(roll => roll >= 96 & roll > skill).length
        const bonusDicesloss = bonusDices.filter(roll => roll > skill).length
        const bonusDicesSuccess = bonusDices.filter(roll => roll <= skill).length
        
        if(skillname){
            if(bonusDice){resultMessage = `🎲${interaction.member}進行了“${skillname}”檢定(技能值 ${skill}):${diceRolls.join(', ')}, ${bonusDices.join(', ')}\n`}else{resultMessage = `🎲${interaction.member}進行了“${skillname}”檢定(技能值 ${skill}):${diceRolls.join(', ')}\n`}
        }else{
            if(bonusDice){resultMessage = `🎲${interaction.member}進行了檢定(值 ${skill}):${diceRolls.join(', ')}, ${bonusDices.join(', ')}\n`}else{resultMessage = `🎲${interaction.member}進行了檢定(技能值 ${skill}):${diceRolls.join(', ')}\n`}
        }

        if (regularSuccess > 0 | bonusDicesSuccess > 0) {
            interaction.reply(resultMessage + `普通成功`)
        }
        if (hardSuccess > 0) {
            interaction.reply(resultMessage + `困難成功`)
        }
        if (extremeSuccess > 0) {
            interaction.reply(resultMessage + `哦～極限成功`)
        }
        if (bigSuccess > 0) {
            interaction.reply(resultMessage + `誒！噔噔噔～大成功！`)
        }
        if (loss > 0 & bonusDicesloss > 0) {
            interaction.reply(resultMessage + `怎麼有人有獎勵骰還能失敗啊～大失敗！`)
        }
        if(fumble > 0){
            interaction.reply(resultMessage + `噔噔咚～，大失敗`)
        }
        if (loss > 0 & bonusDice == null){
            interaction.reply(resultMessage + "ㄨㄚˊ～失敗")
        }
    }
}