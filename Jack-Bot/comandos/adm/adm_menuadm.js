const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")


module.exports = {
  nome: "menuadm",
  descricao: "menu de comandos administrativo",
  comandos: ["menuadm"],
  uso: `${prefix}menuadm`,

handle: async ({ enviar, fotomenu, reagir, menu, selo, client, sender, from, data, hora}) => {
reagir(emoji)
client.sendMessage(from, {image: {url: fotomenu}, caption: `╭═══════════════════⪩
╰╮⟪ *${botName}* ⟫
╭┤➤ ⋟ Usuário: @${sender.split("@")[0]}
┃╰══════════════════⪨
╰╦══════════════════⪨
╭┤⟪ *COMANDOS ADM* ⟫
┃│░⃟⃛${emoji}༘݊➮ ${prefix}abrirgp
┃│░⃟⃛${emoji}༘݊➮ ${prefix}fechargp
┃│░⃟⃛${emoji}༘݊➮ ${prefix}marcar
┃│░⃟⃛${emoji}༘݊➮ ${prefix}citar (Query)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}ban (@)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}menujogos
┃│░⃟⃛${emoji}༘݊➮ ${prefix}auto-resposta 1/0
┃│░⃟⃛${emoji}༘݊➮ ${prefix}antifake 1/0
┃│░⃟⃛${emoji}༘݊➮ ${prefix}antilink 1/0
┃│░⃟⃛${emoji}༘݊➮ ${prefix}bemvindo 1/0
┃│░⃟⃛${emoji}༘݊➮ ${prefix}legendabv (legenda)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}legendasaiu (legenda)
╰═══════════════════⪨` }, {quoted: selo})
  },
};