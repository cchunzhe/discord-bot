const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Show current song'),

  async execute(interaction, client) {
    const user = interaction.user || null;
    const member = interaction.member || null;

    if (!user || !member) return new Error('user or member variable is unavailable!');

    // if user is NULL or user is the same BOT, return
    if (!user || user === client.user) return;

    if (!member.voice.channelId) {
      InteractionUtil.reply(interaction, Constants.commands.music.REQUIRE_VOICE_CHANNEL, true);
      return;
    }

    const distube = client.distube;
    const queue = distube.getQueue(interaction) || null;

    if (!queue) {
      InteractionUtil.reply(interaction, Constants.commands.music.QUEUE_EMPTY, InteractionUtil.ReplyType.STRING);
      return;
    }

    const song = queue.songs[0];
    const embed = new Discord.EmbedBuilder()
      .setTitle(Constants.commands.music.SONG_NOW_PLAYING)
      .setColor(Constants.misc.embed.COLOR_ACCENT)
      .setThumbnail(song.thumbnail)
      .setTimestamp(Date.now())
      .addFields([
        {
          name: 'Title',
          value: `[${song.name}](${song.url})`,
          inline: false,
        },
        {
          name: 'Duration',
          value: `${song.formattedDuration}`,
          inline: false,
        },
      ]);
    InteractionUtil.reply(interaction, embed, InteractionUtil.ReplyType.EMBED);
  },
};
