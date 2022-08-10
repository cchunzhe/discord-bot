const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays music!')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('URL or YouTube search result')
        .setRequired(false)),

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

    const voiceChannel = member.voice.channel;
    const args = interaction.options.getString('input') ?? null;

    // If no args passed, resume playback (if paused)
    if (!args) {
      try {
        distube.resume(interaction);
      } catch (err) {
        if (err.errorCode === 'RESUMED') {
          await interaction.editReply('▶  Already playing!');
          return;
        } else {
          throw err;
        }
      }
      await interaction.editReply('▶  Resumed playback!');
      return;
    }

    // Include interaction in metadata to be used in events
    distube.play(voiceChannel, args, {
      metadata: {
        interaction: interaction,
      },
    });
  },
};
