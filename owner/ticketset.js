const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const config = require('../config')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const cl = db.table("Color")
const p = db.table("Prefix")

module.exports = {
    name: 'ticketset',
    usage: 'ticketset',
    category: "owner",
    description: `Commande ticket set.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            let pf = p.fetch(`prefix_${message.guild.id}`)
            if (pf == null) pf = config.prefix

            message.delete()
            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select')
                        .setPlaceholder(`Cliquez pour ouvrir un ticket`)
                        .addOptions([
                            {
                                label: 'Ticket',
                                emoji: '998562005155860510',
                                description: `Cliquez ici si vous souhaitez ouvrir un ticket`,
                                value: 'open',
                            },
                            {
                                label: 'Annulé',
                                emoji: '988389407730040863',
                                description: "Annulé l'action",
                                value: 'rien',
                            },
                        ])
                );

            message.channel.send({
                embeds: [{
                    title: `__Support ${message.guild.name}__`,
                    description: `**Pour ouvrir un Ticket cliquez sur l'un des menus ci-dessous et choisissez l'option qui correspond à votre demande**`,
                    color: color,
                    footer: { text: `Tout troll sera verra etre sanctionner d'un bannissement` }
                }],
                components: [row]
            })
        }
    }
}