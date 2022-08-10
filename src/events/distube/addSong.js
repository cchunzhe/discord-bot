const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  name: 'addSong',
  async execute(queue, song, client) {
    const interaction = song.metadata.interaction;

    // If queued song is first song
    const title = queue.songs.length === 1 ?
      Constants.commands.music.SONG_NOW_PLAYING : Constants.commands.music.SONG_QUEUED;

    const embed = new Discord.EmbedBuilder()
      .setTitle(title)
      .setColor(Constants.misc.embed.COLOR_ACCENT)
      .setThumbnail(song.thumbnail)
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
    InteractionUtil.editReply(interaction, embed, InteractionUtil.ReplyType.EMBED);
  },
};
