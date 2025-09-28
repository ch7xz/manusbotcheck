const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "Download",
  descricao: "Comando para fazer download",
  comandos: ["tiktokquery"],
  uso: `${prefix}tiktokquery lula`,

handle: async ({ from, lux, enviar, q, enviarVd2, reagir, selo, fetchJson}) => {
try {
var [q2, q3] = q.split("/");
if (!q2) return enviar(`Preciso do nome do vídeo para pider baixar ele`)
api = await fetchJson(`${DarkUrl}/api/download/tiktokQuery?query=${q2}&apikey=${DarkApikey}`)
lit = q3 || 0
Tyexto = `
${emoji}⃟ *Resultados*: _${api.resultado.length}_
✍️⃟ *Título*: _${api.resultado[lit].title}_
👀⃟ *Visualização*: _${api.resultado[lit].views}_
👍⃟ *Like*: _${api.resultado[lit].like}_
🗣️⃟ *Comentários:* _${api.resultado[lit].comentario}_
👥⃟ *Compartilhado:* _${api.resultado[lit].compartilhar}_
💌⃟ *Downloads:* _${api.resultado[lit].download}_
⌚⃟ *Data Post:* _${api.resultado[lit].hora_de_criacao}_
🔗⃟ *Link*: _${api.resultado[lit].link}_
🎶⃟ *Link música*: _${api.resultado[lit].musica.play}_\n
_*👑⃟ 𝘾𝙧𝙞𝙖𝙙𝙤𝙧: ch7xz charlin*_`
reagir("🟢")
lux.sendMessage(from, {image: {url: api.resultado[0].capa_origem}, caption: Tyexto }, {quoted: selo})
lux.sendMessage(from, {video: {url: api.resultado[0].sem_marcadagua}, mimetype: "video/mp4"}, {quoted: selo})
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};