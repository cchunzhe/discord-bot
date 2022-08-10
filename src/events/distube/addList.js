const Discord = require('discord.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  name: 'addList',
  async execute(queue, playlist, client) {
    const interaction = playlist.metadata.interaction;

    const song = queue.songs[0];
    const embed = new Discord.EmbedBuilder();

    let title = Constants.commands.music.SONG_NOW_PLAYING;

    // If queue length > playlist length, means there are previously queued songs
    if (queue.songs.length > playlist.songs.length) {
      title = Constants.commands.music.PLAYLIST_QUEUED;
      embed.setDescription(`\nQueued ${playlist.songs.length} items`);
    } else {
      // No songs in queue before this
      // Show first song in playlist as Now playing
      embed.addFields([
        {
          name: 'Title',
          value: `[${song.name}](${song.url})`,
          inline: true,
        },
        {
          name: 'Duration',
          value: `${song.formattedDuration}`,
          inline: true,
        },
      ]);
    }

    embed
      .setTitle(title)
      .setColor(Constants.misc.embed.COLOR_ACCENT)
      .setThumbnail(playlist.thumbnail)
      .addFields([
        {
          name: 'Playlist',
          value: `[${playlist.name}](${playlist.url})`,
          inline: false,
        },
        {
          name: 'Playlist duration',
          value: `${playlist.formattedDuration}`,
          inline: false,
        },
      ]);
    await interaction.editReply({
      embeds: [embed],
    });
  },
};
