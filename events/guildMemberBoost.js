const { QuickDB } = require("quick.db");
const db = new QuickDB();
const boostlog = db.table("boostlog")

module.exports = {
    name: 'guildMemberBoost',
    once: false,

    async execute(client, member) {

        const chan = `${boostlog.fetch(`${member.guild.id}.boostlog`)}`
        if (chan == null) return
        const channel = message.guild.channels.cache.get(chan)
        if (channel == null) return

        channel.send({ content: `${member.user.tag} vient de boost le serveur !` })

    }
}