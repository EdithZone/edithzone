module.exports = (client) =>{
    console.log(`On and ready at server: "${client.guilds.get("536631229206757409").name}" with ${client.guilds.get("536631229206757409").memberCount} members`)
    client.user.setPresence('with plants');
}