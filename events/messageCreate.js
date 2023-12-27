const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require('../config')
const Discord = require('discord.js')
const rlog = db.table("raidlog")
const wl = db.table("Whitelist")
const p = db.table("Prefix")

module.exports = {
    name: "messageCreate",

    async execute(client, message) {

        if (message.author.bot) return
        if (message.channel.type == "DM") return

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        const args = message.content.slice(pf.length).trim().split(' ')
        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(commandName)

        if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)))
            message.channel.send(`Mon prefix sur le serveur est : \`${pf}\``)

        if (!message.content.startsWith(pf) || message.author.bot) return
        if (!command) return

        try {
            command.execute(client, message, args)

        } catch (error) {
            message.channel.send({ content: `Erreur dans l'exécution du code.` })
        }
    }
}