const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = config.prefix;

client.once("ready", () => {
    console.log(`${client.user.tag} Rodando!`);
})

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const comando = args.shift().toLowerCase();
    const block = "`";

    if(message.content.startsWith(prefix + `serverinfo`)) {
        let region = {
            "brazil": ":flag_br: Brazil",
            "eu-central": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
            "vip-us-east": ":flag_us: VIP U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
            "southafrica": ":flag_za:  South Africa"
        };
    
        
        const embed = new Discord.RichEmbed()
        .setTitle(`**Server info**`)
        .setColor(`#bc42f4`)
        .setAuthor(`${message.guild.name}`, `${message.guild.iconURL}`)
        .addField(`**<:member:588187238261587997>Total de membros**`, `**${block}${message.guild.memberCount}${block} membros**`, true)
        .addField(`**<:chats:588187612288909312>Numero de canais**`, `**${block}${message.guild.channels.size}${block} canais**`, true)
        .addField(`**<:cargos:588189237371994112>Numero de cargos**`, `**${block}${message.guild.roles.size}${block} cargos**`, true)
        .addField(`<:region:588191122384486414>**Região**`, `${region[message.guild.region]}`, true)
        message.channel.send(embed)
    }


})

client.login(`${config.token}`);