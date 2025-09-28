const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")
const { ytMp4, ytVideosSearch } = require("../../lux/js/scraper.js")

module.exports = {
  nome: "playvd",
  descricao: "baixa um vídeo pelo nome",
  comandos: ["playvd", "plv"],
  uso: `${prefix}playvd`,

handle: async ({ pastaLux, enviar, q, selo, client, from, data, hora}) => {
try {
reagir("⌛")
const query = args.join(" ")
const { resultado } = await ytVideosSearch(query)
const video = await ytMp4(resultado[0].url)
const texto = `          *⌬『 🎧 VEROBOT 𝐌𝐔𝐒𝐈𝐂 』⌬*

🔍 𝐑𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨𝐬: *${resultado.length}*
🎵 𝐓𝐢́𝐭𝐮𝐥𝐨: *${resultado[0].title}*
⏱️ 𝐃𝐮𝐫𝐚𝐜̧𝐚̃𝐨: *${resultado[0].timestamp}*
📺 𝐂𝐚𝐧𝐚𝐥: *${resultado[0].author.name}*
📝 𝐃𝐞𝐬𝐜𝐫𝐢𝐜̧𝐚̃𝐨: *${resultado[0].description || "Sem descrição disponível"}*

👤 𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐩𝐞𝐝𝐢𝐝𝐨 𝐩𝐨𝐫: *${pushname}*`
await enviarImg2(resultado[0].image, texto)
reagir("✅")
await enviarVd(video)
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};