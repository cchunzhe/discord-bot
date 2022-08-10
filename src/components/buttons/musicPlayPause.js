const PlaybackUtil = require('../../util/PlaybackUtil.js');

module.exports = {
  data: {
    name: 'musicPlayPause',
  },

  async execute(interaction, client) {

    const distube = client.distube;
    try {
      distube.resume(interaction);
    } catch (err) {
      if (err.errorCode === 'RESUMED') {
        distube.pause(interaction);
      } else {
        throw err;
      }
    }

    const newControls = PlaybackUtil.getControls(interaction, client);
    interaction.update(newControls);
  },
};
