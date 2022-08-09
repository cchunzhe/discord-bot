const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');

module.exports = {
  name: 'addSong',
  async execute(queue, song, client) {
    const interaction = song.metadata.interaction;
    let title = '✅ Queued song';
    const description = `[${song.name}](${song.url})`;

    // If queued song is first song
    if (queue.songs.length === 1) {
      title = '▶ Now playing';
    }

    const embed = new Discord.EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(0x696969)
      .setThumbnail(song.thumbnail)
      .setTimestamp(Date.now())
      .addFields([
        {
          name: 'Duration',
          value: `${song.formattedDuration}`,
          inline: false,
        },
      ]);
    InteractionUtil.reply(interaction, embed, InteractionUtil.ReplyType.EMBED);
  },
};
