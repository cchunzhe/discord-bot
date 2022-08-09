const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops music and disconnects'),

  async execute(interaction, client) {
    const user = interaction.user || null;
    const member = interaction.member || null;

    if (!user || !member) return new Error('user or member variable is unavailable!');

    // if user is NULL or user is the same BOT, return
    if (!user || user === client.user) return;

    // check if member is in the same voice channel
    if (!member.voice.channelId) {
      const sameChannelMessage = '🙁 You must be in the same voice channel to stop music!';
      InteractionUtil.reply(interaction, sameChannelMessage, InteractionUtil.ReplyType.STRING);
      return;
    }

    const distube = client.distube;

    try {
      distube.stop(interaction);
    } catch (error) {
      if (error.errorCode === 'NO_QUEUE') {
        const notPlayingMusic = '😒 I am not playing music';
        InteractionUtil.reply(interaction, notPlayingMusic, InteractionUtil.ReplyType.STRING);
        return;
      } else {
        throw error;
      }
    }

    const stopMessage = 'Music stopped';
    const embed = new Discord.EmbedBuilder()
      .setTitle(stopMessage)
      .setColor(0x696969)
      .setTimestamp(Date.now());

    InteractionUtil.reply(interaction, embed, InteractionUtil.ReplyType.EMBED);
  },
};
