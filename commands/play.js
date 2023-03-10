const {SlashCommandBuilder} = require('discord.js')
const {joinVoiceChannel,createAudioPlayer} = require('@discordjs/voice')
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
    const stream = ytdl(interaction.options.getString('url'),{filter:'audioonly'})
    const player = createAudioPlayer()

        if(interaction.member.voice.channel){
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.channel.guild.voiceAdapterCreator,
            })
            connection.subscribe(player)
            player.play(stream)
        }else{
            interaction.reply('請先使用join讓機器人加入語音頻道')
        }
    }
}