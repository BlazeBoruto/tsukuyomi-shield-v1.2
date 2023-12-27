const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const cl = db.table("Color")
const p = db.table("Prefix")
const config = require("../config")

module.exports = {
    name: 'prefix',
    usage: 'prefix',
    description: `Permet de changer le prefix du bot sur un serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            let pf = p.fetch(`prefix_${message.guild.id}`)
            if (pf == null) pf = config.app.px

            const newprefix = args[0]

            if (!newprefix) return message.reply("Merci d'indiquer le prefix que vous souhaitez")

            if (newprefix.length > 5) return message.reply("Merci de choisir un prefix qui contient maximum 5 carractère")

            message.channel.send(`Mon est prefix est désormais \`${newprefix}\``)
            p.set(`prefix_${message.guild.id}`, newprefix)

        }
    }
}