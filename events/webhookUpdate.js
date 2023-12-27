const Discord = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const rlog = db.table("raidlog")
const punish = db.table("Punition")
const wl = db.table("Whitelist")
const aw = db.table("antiwebhook")
const config = require('../config')

module.exports = {
    name: 'webhookUpdate',
    once: false,

    async execute(client, channel) {

        const audit = (await channel.guild.fetchAuditLogs("WEBHOOK_CREATE")).entries.first()
        if (audit?.executor?.id == client.user.id) return

        if (aw.fetch(`config.${channel.guild.id}.antiwebhook`) == true) {

            if (owner.get(`owners.${audit.executor.id}`) || config.app.owners === audit.executor.id === true || client.user.id === audit.executor.id === true) return

            if ((audit.action == "WEBHOOK_CREATE")) {

                channel.clone({ position: channel.rawPosition })
                channel.delete()

                channel.guild.fetchWebhooks().then(webhooks => {
                    webhooks.forEach(wh =>
                        wh.delete({ reason: 'Anti-Webhook' })
                    )
                })

                if (punish.get(`sanction_${channel.guild.id}`) === "ban") {
                    channel.guild.members.ban(audit.executor.id, { reason: `Anti Webhook` })

                } else if (punish.get(`sanction_${channel.guild.id}`) === "derank") {

                    channel.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            channel.guild.members.resolve(audit.executor).roles.remove(role).catch(err => { throw err })
                        }
                    })

                } else if (punish.get(`sanction_${channel.guild.id}`) === "kick") {

                    channel.guild.members.kick(audit.executor.id, { reason: `Anti Webhook` })
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a tenté de créer un \`webhook\`, il a été sanctionné`)
                    .setTimestamp()
                client.channels.cache.get(rlog.fetch(`${channel.guild.id}.raidlog`)).send({ embeds: [embed] }).catch(console.error)
            }
        }
    }
}