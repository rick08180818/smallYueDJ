const {SlashCommandBuilder, Client} = require('discord.js')
const {joinVoiceChannel,createAudioPlayer,getVoiceConnection} = require('@discordjs/voice')
const {ytdl} = require('ytdl-core')

module.exports = {
    data : new SlashCommandBuilder()
    .setName('play')
    .setDescription('play music')
    .addStringOption(options => options
        .setName('url')
        .setDescription('youtuber URL')
        .setRequired(true)),
async execute(interaction) {
    const url = interaction.options.getString('url')
    const stream = ytdl(url,{filter:'audioonly'})
    const player = createAudioPlayer()
    const connection = getVoiceConnection()

        if(connection){
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.channel.guild.voiceAdapterCreator,
            })
            connection.subscribe(player)
            player.play(stream)
        }else{
            interaction.reply('請先使用join讓機器人加入語音頻道')
        }
    }
}