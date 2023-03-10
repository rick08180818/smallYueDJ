const {SlashCommandBuilder} = require('discord.js')
const images = require('../picture.json').images

module.exports = {
    data : new SlashCommandBuilder()
    .setName('throw')
    .setDescription('throw a luck number')
    .addNumberOption(option => option
        .setName('lucknumber')
        .setDescription('user luck number')
        .setRequired(true)),
async execute(interaction){
    const computernumber = Math.floor(Math.random() * 100) + 1
    const usernumber = interaction.options.getNumber('lucknumber')
    const imagesurl = getRandomImageUrl()

    function getRandomImageUrl() {
        return images[Math.floor(Math.random() * images.length)];
    }      

    if(usernumber == computernumber){
        interaction.reply("你獲得了一張色圖，淦死變態\n"+(imagesurl))
    }else{
        interaction.reply(`${interaction.member}，我的數字是${computernumber}，真可惜～`)
    }

    }   
}