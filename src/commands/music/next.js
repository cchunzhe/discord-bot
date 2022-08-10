const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('next')
    .setDescription('Plays next item in queue'),

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
    let embed = null;

    distube.skip(interaction).then((song) => {
      embed = Constants.misc.embed.nowPlayingEmbed(song);
      interaction.editReply({
        embeds: [embed],
      });
    }).catch((err) => {
      console.log('Something went wrong in going to next song...');
      console.err(err);
    });
  },
};
