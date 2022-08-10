const Discord = require('discord.js');
const InteractionUtil = require('../../util/InteractionUtil.js');
const Constants = require('../../util/Constants.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns bot latency'),

  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${
      message.createdTimestamp - interaction.createdTimestamp
    }`;

    const embed = new Discord.EmbedBuilder()
      .setTitle('Latency')
      .setColor(Constants.misc.embed.COLOR_ACCENT)
      .setTimestamp(Date.now())
      .addFields([
        {
          name: 'API',
          value: `${client.ws.ping}ms`,
          inline: true,
        },
        {
          name: 'Client',
          value: `${message.createdTimestamp - interaction.createdTimestamp}ms`,
          inline: true,
        },
      ]);

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
