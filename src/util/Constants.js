const Discord = require('discord.js');

module.exports = {
  commands: {
    music: {
      CONTROLS_TITLE: 'Control playback with the controls below! 👇',

      PLAYLIST_QUEUED: '✅  Queued playlist',

      QUEUE_EMPTY: '😞 No songs in queue',
      QUEUE_TITLE: '↪  Queue',

      REQUIRE_GUILD: '🙁 This command can only be used in a guild!',
      REQUIRE_SAME_VOICE_CHANNEL: '🙁 You must be in the same voice channel to stop music!',
      REQUIRE_VOICE_CHANNEL: '🙁 You must be in a voice channel to play music!',

      SONG_NOW_PLAYING: '▶  Now Playing',
      SONG_QUEUED: '✅  Queued',
      SONG_STOPPED: '⏹  Stopped',
    },
  },

  misc: {
    embed: {
      COLOR_ACCENT: 0x696969,

      nowPlayingEmbed: function(song) {
        const playlist = song.playlist ?? null;
        const embed = new Discord.EmbedBuilder()
          .setTitle('▶  Now Playing')
          .setColor(0x696969)
          .setThumbnail(song.thumbnail)
          .addFields([
            {
              name: 'Title',
              value: `[${song.name}](${song.url})`,
              inline: true,
            },
            {
              name: 'Duration',
              value: `${song.formattedDuration}`,
              inline: false,
            },
          ]);

        // If the song is added through a playlist
        if (playlist) {
          embed.addFields([
            {
              name: 'Playlist',
              value: `[${playlist.name}](${playlist.url})`,
              inline: false,
            },
          ]);
        }
        return embed;
      },
    },
  },
};
