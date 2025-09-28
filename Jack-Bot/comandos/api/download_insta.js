const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "Download",
  descricao: "Comando para fazer download",
  comandos: ["insta", "instagram", "instav"],
  uso: `${prefix}insta link`,

handle: async ({ from, lux, enviar, q, enviarVd2, reagir, selo, fetchJson}) => {
try {
if (!q) return enviar(`Falta o link do vídeo do Instagram\n*EXEMPLO:*\n${prefix}insta https://www.instagram.com/reel/DAJ1fawB1Rs/?igsh=d2dsbno5ZXB6YnRw=`)
api = await fetchJson(`${DarkUrl}/api/download/instagramV2?url=${q}&apikey=${DarkApikey}`)
Tyexto = `${emoji}⃟ *Descrição*: ${api.resultado.metadata.caption}
${emoji}⃟ *User*: ${api.resultado.metadata.username}
${emoji}⃟ *Like*: ${api.resultado.metadata.like}
${emoji}⃟ *Comentários*: ${api.resultado.metadata.comment}`
reagir("🟢")
lux.sendMessage(from, {video: {url: api.resultado.url[0]}, caption: Tyexto, mimetype: "video/mp4"}, {quoted: selo})
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};