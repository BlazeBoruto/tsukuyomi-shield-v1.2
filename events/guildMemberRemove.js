const Discord = require('discord.js')
const config = require('../config')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const cl = db.table("Color")
const owner = db.table("Owner")
const rlog = db.table("raidlog")
const punish = db.table("Punition")
const ab = db.table("Antiban")


module.exports = {
    name: 'guildMemberRemove',
    once: false,

    async execute(client, guild) {

        if (ab.get(`config.${guild.guild.id}.antiban`) === true) {

            const action = await guild.guild.fetchAuditLogs({ limit: 1, type: "KICK_MEMBERS" }).then(async (audit) => audit.entries.first());

            let perm = config.app.owners == action.executor.id || config.app.funny == action.executor.id || owner.get(`owners.${action.executor.id}`) || client.user.id == action.executor.id
            if (!perm) {

                guild.guild.members.resolve(action.executor).roles.cache.forEach(role => {
                    if (role.name !== '@everyone') {
                        guild.guild.members.resolve(action.executor).roles.remove(role).catch(`catch`)
                    }
                })

            }
        }
    }
}