const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  name: 'addList',
  async execute(queue, playlist, client) {
    const interaction = playlist.metadata.interaction;

    let title = '▶ Now playing';
    let description = `[${playlist.name}](${playlist.url})`;

    // If queue length > playlist length, means there are previously queued songs
    if (queue.songs.length > playlist.songs.length) {
      title = Constants.commands.music.PLAYLIST_QUEUED;
      description = `Queued ${playlist.songs.length} items`;
    }

    const embed = new Discord.EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(Constants.misc.embed.COLOR_ACCENT)
      .setThumbnail(playlist.thumbnail)
      .setTimestamp(Date.now())
      .addFields([
        {
          name: 'Duration',
          value: `${playlist.formattedDuration}`,
          inline: false,
        },
      ]);
    InteractionUtil.editReply(interaction, embed, InteractionUtil.ReplyType.EMBED);
  },
};
