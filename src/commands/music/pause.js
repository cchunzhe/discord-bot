const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses music!'),

  async execute(interaction, client) {
    // Immediately defer reply to prevent timeouts
    await interaction.deferReply();

    const user = interaction.user ?? null;
    const member = interaction.member ?? null;

    if (!user || !member) return new Error('user or member variable is unavailable!');

    // if user is NULL or user is the same BOT, return
    if (!user || user === client.user) return;

    if (!member.voice.channelId) {
      await interaction.editReply(Constants.commands.music.REQUIRE_VOICE_CHANNEL);
      return;
    }

    const distube = client.distube;

    // Try to pause playback
    try {
      distube.pause(interaction);
    } catch (err) {
      if (err.errorCode === 'PAUSED') {
        await interaction.editReply('⏸  Already paused!');
        return;
      } else {
        throw err;
      }
    }
    await interaction.editReply('⏸  Paused playback!');
  },
};
