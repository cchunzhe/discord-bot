const Discord = require('discord.js');
const Constants = require('../../util/Constants.js');
const PlaybackUtil = require('../../util/PlaybackUtil');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('controls')
    .setDescription('Show playback controls'),

  async execute(interaction, client) {
    // Immediately defer reply to prevent timeouts
    await interaction.deferReply();

    const user = interaction.user ?? null;
    const member = interaction.member ?? null;

    if (!user || !member) return new Error('user or member variable is unavailable!');

    // if user is NULL or user is the same BOT, return
    if (!user || user === client.user) return;

    if (!interaction.inGuild()) {
      await interaction.editReply(Constants.commands.music.REQUIRE_GUILD);
      return;
    }

    if (!member.voice.channelId) {
      await interaction.editReply(Constants.commands.music.REQUIRE_VOICE_CHANNEL);
      return;
    }

    const distube = client.distube;
    const queue = distube.getQueue(interaction) ?? null;

    // Check if is playing
    if (!queue) {
      await interaction.editReply(Constants.commands.music.QUEUE_EMPTY);
      return;
    }

    await interaction.editReply(Constants.commands.music.CONTROLS_TITLE);
    const controls = PlaybackUtil.getControls(interaction, client);

    // Get interaction's text channel to send message
    const channel = client.channels.cache.get(interaction.channelId);
    await channel.send(controls);
  },
};
