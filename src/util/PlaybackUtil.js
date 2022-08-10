const Discord = require('discord.js');
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

exports.getControls = function(interaction, client) {
  const distube = client.distube;
  const queue = distube.getQueue(interaction) ?? null;

  // Now playing embed
  const embed = Constants.misc.embed.nowPlayingEmbed(queue.songs[0]);

  const playButton = new Discord.ButtonBuilder()
    .setCustomId('musicPlayPause')
    .setLabel('⏯  Play/Pause')
    .setStyle(Discord.ButtonStyle.Primary);
  const prevButton = new Discord.ButtonBuilder()
    .setCustomId('musicPrevious')
    .setLabel('⏮  Previous')
    .setStyle(Discord.ButtonStyle.Secondary);
  const nextButton = new Discord.ButtonBuilder()
    .setCustomId('musicSkip')
    .setLabel('⏭  Next')
    .setStyle(Discord.ButtonStyle.Secondary);

  const playerControls = new Discord.ActionRowBuilder()
    .addComponents(
      prevButton,
      playButton,
      nextButton,
    );

  return {
    embeds: [embed],
    components: [playerControls],
  };
};
