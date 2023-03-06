const {SlashCommandBuilder, Client} = require('discord.js')
const { execute } = require('./test')

module.exports={
    data:new SlashCommandBuilder()
        .setName('join')
        .setDescription('bot join voice channel'),
    async execute(interaction){
       if (interaction.member.voice.channel !== null) {
        this.connection[interaction.guild.id] = await Client.member.voice.channel.join()
        }
       else{
        interaction.channel.reply('請先進入語音頻道')
        }
    }
}