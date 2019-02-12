const Discord = require("discord.js");
const Enmap = require("enmap");
const Music = require("discord-js-music-addon")
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
/**
 * Events FS Read
 */
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});
/**
 * Client Commands
 */
client.commands = new Enmap();
/**
 * Commands FS READ
 */
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});
/**
 * Music Add On
 */
Music.start(client, {
  youtubeKey: "AIzaSyCeyPKzWAuk0gAfDm6coXR9h5Lu-ZeMZCw"
});
client.login(config.token);