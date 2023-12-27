const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const p = db.table("Prefix")
const config = require("../config")
const footer = config.app.footer

module.exports = {
    name: 'catsay',
    usage: 'catsay',
    description: `jeux`,
    async execute(client, message, args) {

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        message.delete()

        const msg = args.join(" ")
        if (!msg) {
            return message.channel.send("Quel message veux tu que le chat dise ?")
        }
        message.channel.send({
            files: [
                {
                    attachment: `https://cataas.com/cat/cute/says/${msg}`,
                    name: "catsay.png",
                }
            ]
        })
    }
}