const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const config = require("../config")
const logticket = db.table("ticketlog")
const lograid = db.table("raidlog")
const logembed = db.table("embedlog")
const logmod = db.table("modlog")
const loggw = db.table("giveaway")
const logboost = db.table("boostlog")
const msglog = db.table("msglog")
const alertelog = db.table("AlertePerm")
const p = db.table("Prefix")
const cl = db.table("Color")
const ct = db.table("CategorieTicket")
const mstatut = db.table("MsgStatut")
const rstatut = db.table("RoleStatut")

module.exports = {
    name: 'config',
    usage: 'config',
    description: `Permet de voir la configuration du bot sur le serveur`,
    async execute(client, message, args) {

        const e = `<:CircleSearch:984992107158728734>`

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        let alerte = alertelog.get(`${message.guild.id}.alerteperm`)
        if (alerte == null) alerte = "Non configuré"

        let ticket = ct.get(`${message.guild.id}.categorie`)
        if (ticket == null) ticket = "Non configuré"

        let role = db.get(`role_${message.guild.id}`)
        if (role == null) role = "Non configuré"

        let ticketlog = `<#${logticket.get(`${message.guild.id}.ticketlog`)}>`
        if (ticketlog == null) ticketlog = "Non configuré"

        let raidlog = `<#${lograid.get(`${message.guild.id}.raidlog`)}>`
        if (raidlog == null) raidlog = "Non configuré"

        let embedlog = `<#${logembed.get(`${message.guild.id}.embedlog`)}>`
        if (embedlog == null) embedlog = "Non configuré"

        let messagelog = `<#${msglog.get(`${message.guild.id}.messagelog`)}>`
        if (messagelog == null) messagelog = "Non configuré"

        let modlog = `<#${logmod.get(`${message.guild.id}.modlog`)}>`
        if (modlog == null) modlog = "Non configuré"

        let boostlog = `<#${logboost.get(`${message.guild.id}.boostlog`)}>`
        if (boostlog == null) boostlog = "Non configuré"

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const embed = new Discord.MessageEmbed()
                .addField(`Configuration du serveur`, `<a:alert:957097615147810956> | Salon d'alerte : <#${alerte}> \n<a:aping:986073143145816134> | Role alerte : ${role}\n📧 | Catégorie tickets : \`${ticket}\`\n<a:raimbowheart:986835160521654282> | Thème : ${color}`)
                .addField(`Configuration Logs`, `${e} | Logs Messages : ${messagelog}\n${e} | Logs Mods : ${modlog}\n${e} | Logs Boosts : ${boostlog}\n${e} | Logs Tickets : ${ticketlog} \n${e} | Logs Embeds : ${embedlog}\n${e} | Logs Raid : ${raidlog}`)
                .addField(`Prefix : \`${pf}\``, `\`${pf}help\` pour obtenir la liste des commandes`)
                .addField(`Latence du bot`, `<a:typingstatus:959943382736699432> | Ping : **${client.ws.ping}ms**`)
                .addField(`Info :`, `<:badgedeveloper:975416210600624128> | Développeur : <@844105338386776094>, <@886649065352364103>\n<a:sa_blackcrown:959184987071053835> | Propriètaire : <@${config.app.owners}>\n[Support](https://discord.gg/FAZgBcCj3t)`)
                .setColor(color)

            message.channel.send({ embeds: [embed] })
        }
    }
}