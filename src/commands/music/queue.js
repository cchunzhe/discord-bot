const Discord = require('discord.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('queue')
    .setDescription('View queued songs'),

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
    const queue = distube.getQueue(interaction)?.songs ?? null;
    const MAX_QUEUE_DISPLAY = 11;

    // If queue exist
    if (queue) {
      let description =
        `**Currently playing**\n[${queue[0].name}](${queue[0].url}) - \`${queue[0].formattedDuration}\``;

      // Show Up next if queue.length > 1 songs
      if (queue.length > 1) {
        description += '\n\n**Up next**\n';
        // Display first 10 songs in queue
        description +=
          queue
            .slice(1, MAX_QUEUE_DISPLAY)
            .map((song, id) =>
              `**${id + 1}** [${song.name}](${song.url}) - \`${song.formattedDuration}\``,
            )
            .join('\n');
      } else {
        description += '\n\n**Up next**\n😔  No songs';
      }

      // If queue length is more than 10, show note below
      if (queue.length > 10) {
        description += `\n*Showing 10 of ${queue.length - 1} items in queue*`;
      }

      const embed = new Discord.EmbedBuilder()
        .setTitle(Constants.commands.music.QUEUE_TITLE)
        .setDescription(description)
        .setThumbnail(queue[0].thumbnail)
        .setColor(Constants.misc.embed.COLOR_ACCENT);

      await interaction.editReply({
        embeds: [embed],
      });
    } else {
      await interaction.editReply(Constants.commands.music.QUEUE_EMPTY);
    }
  },
};
