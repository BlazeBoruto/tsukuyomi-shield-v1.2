const Discord = require("discord.js")
const config = require("../config")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const aa = db.table("Antiadmin")

module.exports = {
    name: 'antiadmin',
    usage: 'antiadmin',
    description: `Permet de config l'antiraid.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] == 'on') {
                aa.set(`config.${message.guild.id}.antiadmin`, true)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'anti admin** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else if (args[0] == 'off') {
                aa.set(`config.${message.guild.id}.antiadmin`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'anti admin** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètres invalide`)
            }
        }
    }
}