const Discord = module.require("discord.js");
module.exports.run = async(client, message, args, block, errorblock) => {
    const m = await message.channel.send(`<:loading:591835623124631552>Calculando a latência`)
    m.edit(`**<:server:588856726149922830>Pong!**, ${message.author}
╠═**>**Latência: ${block}${m.createdTimestamp - message.createdTimestamp}ms${block}
╚═**>**Latência Da Api: ${block}${Math.round(client.ping)}ms${block}
`)
    
}

module.exports.help = {
    name: "ping",
    description: "Comando para ver a sua latencia e a da api"
}