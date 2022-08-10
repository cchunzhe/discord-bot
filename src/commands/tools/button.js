const Discord = require('discord.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('button')
    .setDescription('Returns a button!'),

  async execute(interaction, client) {
    await interaction.deferReply();
    const button = new Discord.ButtonBuilder()
      .setCustomId('open-yt')
      .setLabel('Click me!')
      .setStyle(Discord.ButtonStyle.Primary);

    await interaction.editReply({
      components: [new Discord.ActionRowBuilder().addComponents(button)],
    });
  },
};
