const Constants = require('./Constants.js');

exports.jumpSong = function(interaction, client, args) {
  const distube = client.distube;
  distube.jump(interaction, args).then((song) => {
    const numOfSongs = Math.abs(args);
    const message = `Skipped ${numOfSongs} song${numOfSongs > 1 ? 's' : ''} ${args > 0 ? 'forward' : 'backward'}`;
    const embed = Constants.misc.embed.nowPlayingEmbed(song);
    interaction.editReply({
      content: message,
      embeds: [embed],
    });
  }).catch((err) => {
    console.log('Something went wrong in going to jumping to song...');
    console.log(err);
  });
};
