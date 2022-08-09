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
        .setRequired(true)),

  async execute(interaction, client) {
    // Immediately defer reply to prevent timeouts
    await interaction.deferReply();

    const user = interaction.user || null;
    const member = interaction.member || null;

    if (!user || !member) return new Error('user or member variable is unavailable!');

    // if user is NULL or user is the same BOT, return
    if (!user || user === client.user) return;

    if (!member.voice.channelId) {
      InteractionUtil.reply(interaction, Constants.commands.music.REQUIRE_VOICE_CHANNEL, true);
      return;
    }

    const distube = client.distube;

    const voiceChannel = member.voice.channel;
    const args = interaction.options.getString('input');

    // Include interaction in metadata to be used in events
    distube.play(voiceChannel, args, {
      metadata: {
        interaction: interaction,
      },
    });
  },
};
