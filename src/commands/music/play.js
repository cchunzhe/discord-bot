const Discord = require('discord.js');
const DiscordVoice = require('@discordjs/voice');
const Queue = require('../../util/Queue.js');
const Stack = require('../../util/Stack.js');
const InteractionUtil = require('../../util/InteractionUtil.js');

module.exports = {
  playQueue: new Queue(),

  playNext: new Stack(),

  data: new Discord.SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays music!')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('URL or YouTube search result')
        .setRequired(true)),

  async execute(interaction, client) {
    const user = interaction.user || null;
    const member = interaction.member || null;

    if (!user || !member) return new Error('user or member variable is unavailable!');

    // if user is NULL or user is the same BOT, return
    if (!user || user === client.user) return;

    console.log('channelId: ' + member.voice.channelId);

    if (!member.voice.channelId) {
      const requireChannelMessage = ':slight_frown: You must be in a voice channel to play music!';
      InteractionUtil.reply(interaction, requireChannelMessage, true);
      return;
    }

    const message = 'Playing music!';
    const embed = new Discord.EmbedBuilder()
      .setTitle(message)
      // .setDescription('This is a very cool description!!!')
      .setColor(0x696969)
      // .setImage(client.user.displayAvatarURL())
      // .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now());
      // .setAuthor({
      //   url: 'https://youtube.com',
      //   iconURL: interaction.user.displayAvatarURL(),
      //   name: interaction.user.tag,
      // })
      // .setFooter({
      //   iconURL: client.user.displayAvatarURL(),
      //   text: client.user.tag,
      // })
      // .setURL('https://google.com')
      // .addFields([
      //   {
      //     name: 'Field 1',
      //     value: 'Field value 1',
      //     inline: true,
      //   },
      //   {
      //     name: 'Field 2',
      //     value: 'Field value 2',
      //     inline: true,
      //   },
      // ]);

    const connection = DiscordVoice.joinVoiceChannel({
      channelId: member.voice.channelId,
      guildId: member.guild.id,
      adapterCreator: member.guild.voiceAdapterCreator,
    });

    InteractionUtil.reply(interaction, embed, InteractionUtil.ReplyType.EMBED);

    const player = DiscordVoice.createAudioPlayer();
    const subscription = connection.subscribe(player);

    const resource = DiscordVoice.createAudioResource('./music.mp3', {
      metadata: {
        title: 'A good song!',
      },
    });

    player.play(resource);

    player.on('error', error => {
      console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
      player.play(DiscordVoice.getNextResource());
    });

    player.on(DiscordVoice.AudioPlayerStatus.Idle, () => {
      const newResource = this.getNextResource();
      if (!newResource) {
        connection.destroy();
        return;
      }
      player.play(newResource);
    });

  },

  getNextResource() {
    return this.playNext.size() ? this.playNext.pop() : this.playQueue.dequeue();
  },
};
