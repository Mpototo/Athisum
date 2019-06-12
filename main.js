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
    const errorblock = '```';

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
        let server_icon = message.guild.iconURL || "https://cdn.discordapp.com/emojis/588492643063955470.png?v=1"
        const embed = new Discord.RichEmbed()
        .setTitle(`**Server info**`)
        .setColor(`#bc42f4`)
        .setAuthor(`${message.guild.name}`, `${server_icon}`)
        .addField(`**<:member:588187238261587997>Total de membros**`, `**${block}${message.guild.memberCount}${block} membros**`, true)
        .addField(`**<:chats:588187612288909312>Numero de canais**`, `**${block}${message.guild.channels.size}${block} canais**`, true)
        .addField(`**<:cargos:588189237371994112>Numero de cargos**`, `**${block}${message.guild.roles.size}${block} cargos**`, true)
        .addField(`<:region:588191122384486414>**Região**`, `${region[message.guild.region]}`, true)
        .addField(`**<:people:588502135185080335>Dono**`, `${message.guild.owner}`, true)
        .setFooter(`Athisum`, `${message.client.user.avatarURL}`)
        message.channel.send(embed) .catch(err => message.channel.send(`**<:error:588492643063955470>Um erro aconteceu!**\n**${errorblock}js\n${err}${errorblock}**`))
    }
})

client.login(`${config.token}`); 