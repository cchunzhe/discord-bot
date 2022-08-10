const Discord = require('discord.js');
const Constants = require('../../util/Constants.js');
const PlaybackUtil = require('../../util/PlaybackUtil.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip number of songs')
    .addIntegerOption(option =>
      option.setName('num')
        .setDescription('Number in queue to skip to')
        .setRequired(false)),

  async execute(interaction, client) {
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

    const rawArgs = interaction.options.getInteger('num') ?? 1;
    const args = rawArgs === 0 ? 1 : Math.abs(rawArgs);

    PlaybackUtil.jumpSong(interaction, client, args);
  },
};
