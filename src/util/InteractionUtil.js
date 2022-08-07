module.exports = {
  ReplyType: {
    STRING: 0,
    EMBED: 1,
  },

  // Simple reply and editReply utility methods
  reply: async function(interaction, content, ReplyType, ephemeral = false) {
    const reply = this._createReply(interaction, content, ReplyType, ephemeral);
    await interaction.reply(reply);
  },

  editReply: async function(interaction, content, ReplyType, ephemeral = false) {
    const reply = this._createReply(interaction, content, ReplyType, ephemeral);
    await interaction.editReply(reply);
  },

  _createReply: function(interaction, content, replyType, ephemeral) {
    let reply = null;
    switch (replyType) {
    case this.ReplyType.STRING:
      reply = {
        content: content,
        ephemeral: ephemeral,
      };
      break;
    case this.ReplyType.EMBED:
      reply = {
        embeds: [content],
        ephemeral: ephemeral,
      };
      break;
    default:
      throw new Error('Please enter a valid message type!');
    }
    return reply;
  },
};
