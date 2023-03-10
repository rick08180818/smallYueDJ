const { joinVoiceChannel } = require('@discordjs/voice');
const {SlashCommandBuilder,VoiceState,GuildMember, Options} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
      .setName('join')
      .setDescription('join voice channel'),
    async execute(interaction) {
        const voiceChannel = '1007638917408894986'
        if(voiceChannel){
        const connection = joinVoiceChannel({
            channelId: voiceChannel,
            guildId: interaction.guildId,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator,
        });
        interaction.reply('成功加入語音頻道')
        console.log(voiceChannel)

      }else{
        interaction.reply('請先加入語音頻道')
        console.log(voiceChannel)
      }
    }
}