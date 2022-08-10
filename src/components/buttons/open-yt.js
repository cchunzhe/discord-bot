module.exports = {
  data: {
    name: 'open-yt',
  },

  async execute(interaction, client) {
    await interaction.deferReply();
    await interaction.editReply({
      content: 'https://youtube.com',
    });
  },
};
