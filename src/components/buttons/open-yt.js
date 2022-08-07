module.exports = {
  data: {
    name: 'open-yt',
  },

  async execute(interaction, client) {
    await interaction.reply({
      content: 'https://youtube.com',
    });
  },
};