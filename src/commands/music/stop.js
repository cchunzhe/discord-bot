const Discord = require('discord.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops music and disconnects'),

  async execute(interaction, client) {
    await interaction.deferReply();
    const user = interaction.user ?? null;
    const member = interaction.member ?? null;

    if (!user || !member) return new Error('user or member variable is unavailable!');

    // if user is NULL or user is the same BOT, return
    if (!user || user === client.user) return;

    // check if member is in the same voice channel
    if (!member.voice.channelId) {
      await interaction.editReply(Constants.commands.music.REQUIRE_SAME_VOICE_CHANNEL);
      return;
    }

    const distube = client.distube;

    try {
      distube.stop(interaction);
    } catch (error) {
      if (error.errorCode === 'NO_QUEUE') {
        await interaction.editReply(Constants.commands.music.QUEUE_EMPTY);
        return;
      } else {
        throw error;
      }
    }

    await interaction.editReply(Constants.commands.music.SONG_STOPPED);
  },
};
