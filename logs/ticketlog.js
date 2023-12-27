const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config")
const owner = db.table("Owner")
const cl = db.table("Color")
const ticketlog = db.table("ticketlog")
const footer = config.app.footer


module.exports = {
    name: 'ticketlog',
    usage: 'ticketlog <id>',
    description: `Permet de changer le salon des logs ticket.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
            if (args[0] == undefined) args[0] = `<#${message.channel.id}>`
            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
            if (ticketlog.get(`${message.guild.id}.ticketlog`) === newChannel) return message.channel.send(`✉️・__Nouveau salon des logs Tickets :__ \`${ticketlog.get(`${message.guild.id}.ticketlog`)}\``)
            else {
                ticketlog.set(`${message.guild.id}.ticketlog`, newChannel.id)
                message.channel.send(`✉️・__Nouveau salon des logs Tickets :__ ${args[0]}`)

                const logs = ticketlog.get(`${message.guild.id}.ticketlog`)

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`${message.author.tag} à défini ce salon commme salon des logs Ticket`)
                    .setDescription(`✉️ | Ce salon est désormais utilisé pour __toutes__ les **logs Tickets** du serveur\n Executeur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `${footer}` })
                client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error)
            }
        }
    }
}