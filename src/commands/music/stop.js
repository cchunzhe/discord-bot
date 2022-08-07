const Discord = require('discord.js');
const { joinVoiceChannel, VoiceConnectionStatus, entersState, getVoiceConnection } = require('@discordjs/voice');
const InteractionUtil = require('../../util/InteractionUtil.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops music and disconnects'),

  async execute(interaction, client) {
    const user = interaction.user || null;
    const member = interaction.member || null;
    const connection = getVoiceConnection(interaction.guild.id);

    // prevent 'Cannot read properties of undefined' error
    // if undefined, means bot is not in a channel
    try {
      typeof connection.joinConfig;
    } catch (error) {
      const notInChannelMessage = '😒 I am not in a channel';
      InteractionUtil.reply(interaction, notInChannelMessage, InteractionUtil.ReplyType.STRING);
      return;
    }

    if (!user || !member) return new Error('user or member variable is unavailable!');

    // if user is NULL or user is the same BOT, return
    if (!user || user === client.user) return;

    // check if member is in the same voice channel
    if (!member.voice.channelId || member.voice.channelId !== connection.joinConfig.channelId) {
      const sameChannelMessage = '🙁 You must be in the same voice channel to stop music!';
      InteractionUtil.reply(interaction, sameChannelMessage, InteractionUtil.ReplyType.STRING);
      return;
    }

    console.log('member.voice.channelId: ' + member.voice.channelId);
    console.log('interaction.guiildId: ' + interaction.guild.id);

    connection.destroy();

    const stopMessage = 'Music stopped and disconnected from voice';
    const embed = new Discord.EmbedBuilder()
      .setTitle(stopMessage)
      .setColor(0x696969)
      .setTimestamp(Date.now());

    InteractionUtil.reply(interaction, embed, InteractionUtil.ReplyType.EMBED);
  },
};
