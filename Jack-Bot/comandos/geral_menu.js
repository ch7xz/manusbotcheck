const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../dono/config.json")


module.exports = {
  nome: "menu",
  descricao: "menu de comandos",
  comandos: ["menu", "help"],
  uso: `${prefix}menu`,

handle: async ({ enviar, fotomenu, reagir, menu, selo, client, sender, from, data, hora, enviarAd2, pastaLux, pushname, isDono}) => {
reagir(emoji)
await enviarAd2(pastaLux + "audio/menu.ogg")
await client.sendMessage(from, {image: {url: fotomenu}, caption: `╭═══════════════════⪩
╰╮⟪ *VeroBot* ⟫
╭┤➤ ⋟ Nick: ${pushname}
┃│➤ ⋟ Numero: @${sender.split("@")[0]}
┃│➤ ⋟ Data: ${data}
┃│➤ ⋟ Hora: ${hora}
┃│➤ ⋟ Status: ${isDono ? "Dono" : "Membro"}
┃╰══════════════════⪨
Eu te amo, Verônica. <3
╰╦══════════════════⪨
╭┤⟪ *MENUS* ⟫
┃│░⃟⃛${emoji}༘݊➮ ${prefix}menu
┃│░⃟⃛${emoji}༘݊➮ ${prefix}menudono
┃│░⃟⃛${emoji}༘݊➮ ${prefix}menuadm
┃│░⃟⃛${emoji}༘݊➮ ${prefix}menujogos
┃╰══════════════════⪨
╰╦══════════════════⪨
╭┤⟪ *DOWNLOADS* ⟫
┃│░⃟⃛${emoji}༘݊➮ ${prefix}play (nome)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}playvd (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}tuna (pesquisa)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}tiktokquery (pesquisa)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}tiktok (url)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}insta (url)
┃╰══════════════════⪨
╰╦══════════════════⪨
╭┤⟪ *PESQUISA* ⟫
┃│░⃟⃛${emoji}༘݊➮ ${prefix}ytsearch (pesquisa)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}filme (pesquisa)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}serie (pesquisa)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}signo (pesquisa)
┃╰══════════════════⪨
╰╦══════════════════⪨
╭┤⟪ *INTELIGÊNCIAS* ⟫
┃│░⃟⃛${emoji}༘݊➮ ${prefix}gemini (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}llama (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}llama2 (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}sqlcode (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}mistral (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}deepseek (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}deepseek-code (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}dalle (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}dalle2 (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}imagine (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}ghibli (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}fantasia (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}3d (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}tattoo (prompt)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}cartoon (prompt)
┃╰══════════════════⪨
╰╦══════════════════⪨
╭┤⟪ *RANDOM* ⟫
┃│░⃟⃛${emoji}༘݊➮ ${prefix}clima (query)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}tradutor (query)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}cuttly (link)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}bitly (link)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}metadinha
┃│░⃟⃛${emoji}༘݊➮ ${prefix}metadinha2
┃│░⃟⃛${emoji}༘݊➮ ${prefix}travazapimg
┃│░⃟⃛${emoji}༘݊➮ ${prefix}travazapimg2
┃╰══════════════════⪨
╰╦══════════════════⪨
╭┤⟪ *STICKER* ⟫
┃│░⃟⃛${emoji}༘݊➮ ${prefix}s (imagem/video/gif)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}toimg <-- marcando uma figurinha, se transforma em foto/vídeo
┃│░⃟⃛${emoji}༘݊➮ ${prefix}fignome (nome do pack) | (autor)  OU "${prefix}fignome resetar " para voltar ao padrão
┃│░⃟⃛${emoji}༘݊➮ ${prefix}stickerai (Query)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}attp (Query)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}attp2 (Query)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}attp3 (Query)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}attp4 (Query)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}attp5 (Query)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}among (Query)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}figubebe (Num)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}figucoreana (Num)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}figuanime (Num)
┃│░⃟⃛${emoji}༘݊➮ ${prefix}figurinhas (Num)
┃╰══════════════════⪨
╰═══════════════════⪨` }, {quoted: selo})
  },
};