const Discord = require("discord.js")
const config = require("../config")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const al = db.table("AntiLink")

module.exports = {
    name: 'antilink',
    usage: 'antilink',
    description: `Permet de config l'antiraid.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] == 'all') {
                al.set(`config.${message.guild.id}.antilinkall`, true)
                al.set(`config.${message.guild.id}.antilinkinvite`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'Antilink** détécte maintenant **tous les liens**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })

            } else if (args[0] == 'invite') {
                al.set(`config.${message.guild.id}.antilinkinvite`, true)
                al.set(`config.${message.guild.id}.antilinkall`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'Antilink** détécte maintenant **les invitations de serveurs**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })

            } else if (args[0] == 'off') {
                al.set(`config.${message.guild.id}.antilinkinvite`, false)
                al.set(`config.${message.guild.id}.antilinkall`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'Antilink** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètres invalide`)
            }
        }
    }
}