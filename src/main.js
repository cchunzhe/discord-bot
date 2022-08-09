require('dotenv').config();
const DisTube = require('distube');
const Discord = require('discord.js');
const fs = require('fs');

// Create new Discord client instance
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildVoiceStates,
  ],
});

// Create new DisTube instance
client.distube = new DisTube.DisTube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  leaveOnFinish: false,
  leaveOnStop: true,
  savePreviousSongs: true,
  searchSongs: 5,
  emptyCooldown: 60,
  nsfw: true,
});

// Declare client variables
client.commands = new Discord.Collection();
client.buttons = new Discord.Collection();
client.commandArray = [];

// register .js files in functions folder as callable functions
const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith('.js'));

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

// Handle automatic registration
client.handleEvents();
client.handleCommands();
client.handleComponents();

// Authenticate bot with Discord
client.login(process.env.token);
