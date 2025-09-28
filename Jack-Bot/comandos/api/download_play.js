const { prefix, botName, donoName, DarkApikey, DarkUrl } = require("../../dono/config.json")
const { ytMp3, ytVideosSearch } = require("../../lux/js/scraper.js")

module.exports = {
  nome: "play",
  descricao: "Baixa uma música pelo nome",
  comandos: ["play", "play-audio", "pl"],
  uso: `${prefix}play melo de perdida`,
  
handle: async ({ args, enviar, reagir, enviarAd, enviarImg2, selo, client, from, pushname, msg, q}) => {
if (!q) return enviar(msg.query)
reagir("⌛")
const query = args.join(" ")
const { resultado } = await ytVideosSearch(query)
const audio = `${DarkUrl}/api/download/youtube-audio?url=${resultado[0].url}&apikey=${DarkApikey}`
const texto = `          *⌬『 🎧 VEROBOT 𝐌𝐔𝐒𝐈𝐂 』⌬*

🔍 𝐑𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨𝐬: *${resultado.length}*
🎵 𝐓𝐢́𝐭𝐮𝐥𝐨: *${resultado[0].title}*
⏱️ 𝐃𝐮𝐫𝐚𝐜̧𝐚̃𝐨: *${resultado[0].timestamp}*
📺 𝐂𝐚𝐧𝐚𝐥: *${resultado[0].author.name}*
📝 𝐃𝐞𝐬𝐜𝐫𝐢𝐜̧𝐚̃𝐨: *${resultado[0].description || "Sem descrição disponível"}*

👤 𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐩𝐞𝐝𝐢𝐝𝐨 𝐩𝐨𝐫: *${pushname}*`
await enviarImg2(resultado[0].image, texto)
reagir("✅")
await enviarAd(audio)
  },
};