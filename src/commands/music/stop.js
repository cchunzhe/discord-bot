const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops music and disconnects'),

  async execute(interaction, client) {
    const user = interaction.user ?? null;
    const member = interaction.member ?? null;

    if (!user || !member) return new Error('user or member variable is unavailable!');

    // if user is NULL or user is the same BOT, return
    if (!user || user === client.user) return;

    // check if member is in the same voice channel
    if (!member.voice.channelId) {
      InteractionUtil.reply(interaction, Constants.commands.music.REQUIRE_SAME_VOICE_CHANNEL, InteractionUtil.ReplyType.STRING);
      return;
    }

    const distube = client.distube;

    try {
      distube.stop(interaction);
    } catch (error) {
      if (error.errorCode === 'NO_QUEUE') {
        InteractionUtil.reply(interaction, Constants.commands.music.QUEUE_EMPTY, InteractionUtil.ReplyType.STRING);
        return;
      } else {
        throw error;
      }
    }

    const embed = new Discord.EmbedBuilder()
      .setTitle(Constants.commands.music.SONG_STOPPED)
      .setColor(Constants.misc.embed.COLOR_ACCENT);

    InteractionUtil.reply(interaction, embed, InteractionUtil.ReplyType.EMBED);
  },
};
