const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "Download",
  descricao: "Comando para fazer download",
  comandos: ["tiktok"],
  uso: `${prefix}tiktok lula`,

handle: async ({ from, lux, enviar, q, enviarVd2, reagir, selo, fetchJson}) => {
try {
if (!q) return enviar(`Falta o link do vídeo do tiktok\n*EXEMPLO:*\n${prefix}tiktok https://www.tiktok.com/@melissaseabra/video/7434923210119859511`)
api = await fetchJson(`${DarkUrl}/api/download/tiktokV2?url=${q}&apikey=${DarkApikey}`)
Tyexto = `${emoji}⃟ *Título*: ${api.resultado.title}
${emoji}⃟ *Link Vídeo*: ${api.resultado.link}
${emoji}⃟ *Link Musica*: ${api.resultado.musica}
${emoji}⃟ *Tamanho*: ${api.resultado.sem_tamanho_wm}
${emoji}⃟ *Hd*: ${api.resultado.tamanho_hd}
${emoji}⃟ *Visualização*: ${api.resultado.views}
${emoji}⃟ *Comentarios*: ${api.resultado.comentario}
${emoji}⃟ *Compartilhado*: ${api.resultado.compartilhar}
${emoji}⃟ *Download:* ${api.resultado.download}
${emoji}⃟ *Saves:* ${api.resultado.save}
${emoji}⃟ *Hora do post*: ${api.resultado.hora_de_criacao}`
reagir("🟢")
lux.sendMessage(from, {video: {url: api.resultado.sem_marcadagua}, caption: Tyexto, mimetype: "video/mp4"}, {quoted: selo})
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};