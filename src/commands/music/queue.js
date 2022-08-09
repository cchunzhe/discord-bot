const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('queue')
    .setDescription('View queued songs'),

  async execute(interaction, client) {
    const user = interaction.user || null;
    const member = interaction.member || null;

    if (!user || !member) return new Error('user or member variable is unavailable!');

    // if user is NULL or user is the same BOT, return
    if (!user || user === client.user) return;

    if (!member.voice.channelId) {
      const requireChannelMessage = ':slight_frown: You must be in a voice channel to view queue!';
      InteractionUtil.reply(interaction, requireChannelMessage, true);
      return;
    }

    const distube = client.distube;
    const queue = distube.getQueue(interaction) || null;
    const MAX_QUEUE_DISPLAY = 10;

    // If queue exist
    if (queue) {
      // Display first 10 songs in queue
      const fields =
        queue.songs
          .slice(0, MAX_QUEUE_DISPLAY)
          .map((song, id) => {
            return {
              name: `**${id + 1}**`,
              value: `[${song.name}](${song.url}) - \`${song.formattedDuration}\``,
              inline: false,
            };
          });

      const embed = new Discord.EmbedBuilder()
        .setTitle('⏯ Up next')
        .setDescription('Showing next 10 in queue')
        .setColor(0x696969)
        .setTimestamp(Date.now())
        .addFields(fields);

      InteractionUtil.reply(interaction, embed, InteractionUtil.ReplyType.EMBED);
    } else {
      InteractionUtil.reply(interaction, '😞 No songs in queue', InteractionUtil.ReplyType.STRING, true);
    }
  },
};
