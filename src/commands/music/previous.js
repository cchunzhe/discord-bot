const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('previous')
    .setDescription('Plays previous item in queue'),

  async execute(interaction, client) {
    const user = interaction.user ?? null;
    const member = interaction.member ?? null;

    if (!user || !member) return new Error('user or member variable is unavailable!');

    // if user is NULL or user is the same BOT, return
    if (!user || user === client.user) return;

    if (!member.voice.channelId) {
      InteractionUtil.reply(interaction, Constants.commands.music.REQUIRE_VOICE_CHANNEL, true);
      return;
    }

    const distube = client.distube;
    let embed = null;

    distube.previous(interaction).then((song) => {
      embed = Constants.misc.embed.nowPlayingEmbed(song);
      InteractionUtil.reply(interaction, embed, InteractionUtil.ReplyType.EMBED);
    }).catch((err) => {
      console.log('Something went wrong in going to previous song...');
      console.err(err);
    });
  },
};
