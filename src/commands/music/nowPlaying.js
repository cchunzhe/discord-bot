const Discord = require('discord.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Current item in queue'),

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

    const distube = client.distube;
    const queue = distube.getQueue(interaction) ?? null;

    if (!queue) {
      await interaction.editReply(Constants.commands.music.QUEUE_EMPTY);
      return;
    }

    const embed = Constants.misc.embed.nowPlayingEmbed(queue.songs[0]);
    await interaction.editReply({
      embeds: [embed],
    });
  },
};
