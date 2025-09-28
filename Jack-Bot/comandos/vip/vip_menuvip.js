const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")


module.exports = {
  nome: "menuvip",
  descricao: "menu de comandos vip",
  comandos: ["menuvip", "vip"],
  uso: `${prefix}menuvip`,

handle: async ({ enviar, fotomenu, reagir, menu, selo, client, sender, from, data, hora, pushname, isDono}) => {
reagir(emoji)
client.sendMessage(from, {image: {url: fotomenu}, caption: `╭═══════════════════⪩
╰╮⟪ *${botName}* ⟫
╭┤➤ ⋟ Nick: ${pushname}
┃│➤ ⋟ Numero: @${sender.split("@")[0]}
┃│➤ ⋟ Data: ${data}
┃│➤ ⋟ Hora: ${hora}
┃│➤ ⋟ Status: ${isDono ? "Dono" : "Membro"}
┃╰══════════════════⪨
╰╦══════════════════⪨
╭┤⟪ *COMANDOS VIP* ⟫
┃│░⃟⃛${emoji}༘݊➮ ${prefix}COMANDO
┃╰══════════════════⪨
╰╦══════════════════⪨
╭┤⟪ *CONSULTAS* ⟫
┃│░⃟⃛${emoji}༘݊➮ ${prefix}nome (nome)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}nome2 (nome)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}nome_mae (nome)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}telefone (numero)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}titulo_eleitor (titulo)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}cpf (cpf)
┃╰══════════════════⪨
╰═══════════════════⪨` }, {quoted: selo})
  },
};