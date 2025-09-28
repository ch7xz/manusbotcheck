const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")


module.exports = {
  nome: "menudono",
  descricao: "menu de comandos do dono",
  comandos: ["menudono", "donim"],
  uso: `${prefix}menudono`,

handle: async ({ enviar, fotomenu, reagir, menu, selo, client, sender, from, data, hora}) => {
reagir(emoji)
client.sendMessage(from, {image: {url: fotomenu}, caption: `╭═══════════════════⪩
╰╮⟪ *${botName}* ⟫
╭┤➤ ⋟ Usuário: @${sender.split("@")[0]}
┃╰══════════════════⪨
╰╦══════════════════⪨
╭┤⟪ *COMANDOS DE DONO* ⟫
┃│░⃟⃛${emoji}༘݊➮ ${prefix}ping
╰═══════════════════⪨` }, {quoted: selo})
  },
};