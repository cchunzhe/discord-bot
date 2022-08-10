const PlaybackUtil = require('../../util/PlaybackUtil.js');

module.exports = {
  data: {
    name: 'musicPrevious',
  },

  async execute(interaction, client) {

    const distube = client.distube;
    await distube.jump(interaction, -1);

    const newControls = PlaybackUtil.getControls(interaction, client);
    interaction.update(newControls);
  },
};
