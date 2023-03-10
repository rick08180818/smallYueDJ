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
            if(bonusDice){resultMessage = `????${interaction.member}????????????${skillname}?????????(????????? ${skill}):${diceRolls.join(', ')}, ${bonusDices.join(', ')}\n`}else{resultMessage = `????${interaction.member}????????????${skillname}?????????(????????? ${skill}):${diceRolls.join(', ')}\n`}
        }else{
            if(bonusDice){resultMessage = `????${interaction.member}???????????????(??? ${skill}):${diceRolls.join(', ')}, ${bonusDices.join(', ')}\n`}else{resultMessage = `????${interaction.member}???????????????(????????? ${skill}):${diceRolls.join(', ')}\n`}
        }

        if (regularSuccess > 0 | bonusDicesSuccess > 0) {
            interaction.reply(resultMessage + `????????????`)
        }
        if (hardSuccess > 0) {
            interaction.reply(resultMessage + `????????????`)
        }
        if (extremeSuccess > 0) {
            interaction.reply(resultMessage + `??????????????????`)
        }
        if (bigSuccess > 0) {
            interaction.reply(resultMessage + `??????????????????????????????`)
        }
        if (loss > 0 & bonusDicesloss > 0) {
            interaction.reply(resultMessage + `??????????????????????????????????????????????????????`)
        }
        if(fumble > 0){
            interaction.reply(resultMessage + `????????????????????????`)
        }
        if (loss > 0 & bonusDice == null){
            interaction.reply(resultMessage + "?????????????????")
        }
    }
}