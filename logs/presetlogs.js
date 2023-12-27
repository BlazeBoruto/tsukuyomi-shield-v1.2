const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config")
const owner = db.table("Owner")
const boostlog = db.table("boostlog")
const embedlog = db.table("embedlog")
const msglog = db.table("msglog")
const raidlog = db.table("raidlog")
const modlog = db.table("modlog")
const ticketlog = db.table("ticketlog")
const alertefunny = db.table("AlertePerm")
const cl = db.table("Color")
const footer = config.app.footer


module.exports = {
    name: 'presetlogs',
    usage: 'presetlogs',
    description: `Permet de créer automatiquement la catégorie des logs.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            message.channel.send(`<a:loading:957097853694664746> Création de la **catégorie des logs** en cours...`).then(msge => {
                message.guild.channels.create('LOGS', {
                    type: 'GUILD_CATEGORY',
                    permissionsOverwrites: [{
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL']
                    }]
                }).then(c => {
                    //alerte
                    c.guild.channels.create(`⚡・alerte-perm`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        alertefunny.set(`${message.guild.id}.alerteperm`, logs.id)
                    })
                    //messagelog
                    c.guild.channels.create(`📁・logs-message`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        msglog.set(`${message.guild.id}.messagelog`, logs.id)
                    })
                    //logs raid
                    c.guild.channels.create(`📁・logs-raid`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        raidlog.set(`${message.guild.id}.raidlog`, logs.id)
                    })
                    //modlog
                    c.guild.channels.create(`📁・logs-mod`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        modlog.set(`${message.guild.id}.modlog`, logs.id)
                    })
                    //boostlog
                    c.guild.channels.create(`📁・logs-boost`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        boostlog.set(`${message.guild.id}.boostlog`, logs.id)
                    })
                    //ticketlog
                    c.guild.channels.create(`📁・logs-ticket`, {
                        type: 'text',
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        ticketlog.set(`${message.guild.id}.ticketlog`, logs.id)
                    })

                    msge.edit(`<:valid:972648521255768095> Création de la **catégorie des logs** effectué avec succès.`)

                }
                )
            }
            )
        }
    }
}