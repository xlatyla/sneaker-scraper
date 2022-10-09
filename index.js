const { GatewayIntentBits, Client, EmbedBuilder, CommandInteractionOptionResolver } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const CONFIG = require(`${process.cwd()}/config.json`);
const SKNR = require("./sknrs_app/sknrs_app.js")
SKNR.sneakrs;

require('colors');
client.on('ready', () => {
    console.log('Ok encendido'.green);
   
})

client.login(CONFIG.token);
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild || message.channel.type === 'dm') return;
    var prefix = CONFIG.prefix
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const data_json = require(`${process.cwd()}/sknrs_app/json/data.json`);
    const command = args.shift().toLowerCase();
    if (command === 'releases') {
        for (let i = 0; i < data_json.length; i++) {
            const embed = new EmbedBuilder()
                .setTitle("SKNRS RELEASES")
                .setURL(data_json[i].URL_sneakr)
                .addFields(
                    { name: "Nombre", value: data_json[i].name},
                    { name: "Modelo", value: data_json[i].model},
                    { name: "Fecha", value: data_json[i].drop_date },
                    { name: 'Precio', value: data_json[i].price },
                    { name: 'SKU', value: data_json[i].sku },
                    { name: 'Enlace', value: data_json[i].url_sneakr },
                )
                .setThumbnail(data_json[i].img)
                .setColor(0xff0000)
                .setTimestamp()
                .setFooter({ text: 'SKNRS APP', iconURL: 'https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/37/be/85/37be85d2-031c-6dfa-1bb2-e0289e855778/source/200x200bb.jpg' });
            message.channel.send({ embeds: [embed] })
        }
    }
})
