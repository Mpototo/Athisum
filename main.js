const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = config.prefix;

const fs = require("fs");
client.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsFile = files.filter(f => f.split(".").pop() === "js");
    if(jsFile.length <= 0) {
        console.log("[!] Nenhum comando para carregar!");
        return;
    }

    console.log(`Carregando ${jsFile.length} comandos`);
    
    jsFile.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`[Commands] ${i + 1}: ${f} Carregado!`);
        client.commands.set(props.help.name, props);
    });
});



client.once("ready", () => {
    console.log(`${client.user.tag} Rodando!`);
    client.user.setActivity(`a!help`, { type:"LISTENING" });
});

client.on("message", async message => {
    
    var uptime = `${client.uptime}`;
    var seg = Math.floor(uptime / 1000) % 60;
    var min = Math.floor(uptime / (1000 * 60)) % 60;
    var horas = Math.floor(uptime / (1000 * 60 * 60)) % 24;
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const comando = args.shift().toLowerCase();
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    const block = "`";
    const errorblock = '```';

    let cmd = client.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(client, message, args, block, errorblock);


});
client.login(`${config.token}`);