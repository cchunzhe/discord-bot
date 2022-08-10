const Discord = require('discord.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('embed')
    .setDescription('Returns an embed.'),

  async execute(interaction, client) {
    await interaction.deferReply();
    const embed = new Discord.EmbedBuilder()
      .setTitle('This is an EMBED!')
      .setDescription('This is a very cool description!!!')
      .setColor(Constants.misc.embed.COLOR_ACCENT)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: 'https://youtube.com',
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL('https://google.com')
      .addFields([
        {
          name: 'Field 1',
          value: 'Field value 1',
          inline: true,
        },
        {
          name: 'Field 2',
          value: 'Field value 2',
          inline: true,
        },
      ]);

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
