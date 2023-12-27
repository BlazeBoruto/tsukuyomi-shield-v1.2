const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const cl = db.table("Color")
const owner = db.table("Owner")
const config = require("../config")
const fs = require('fs')
const moment = require('moment')

module.exports = {
    name: 'find',
    usage: 'find',
    description: `Permet de chercher un membre en vocal dans le serveur`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let embed = new Discord.MessageEmbed()
            .setTitle("Recherche vocal")
            .setColor(color)
            .addField(
                `Le membre est en vocal:`,
                member.voice.channel
                    ? `<#${member.voice.channel.id}>`
                    : `Le membre n'est pas en vocal.`,
                true
            )
        message.channel.send({ embeds: [embed] })
    }
}