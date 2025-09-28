const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "Random",
  descricao: "sla",
  comandos: ["clima", "tempo"],
  uso: `${prefix}clima sao paulo`,

handle: async ({ enviar, q, fetchJson, msg, reagir}) => {
if (!q) return enviar(msg.query)
try {
reagir(emoji)
enviar(msg.epera)
api = await fetchJson(`${DarkUrl}/api/tempo?city=${encodeURIComponent(q)}&apikey=${DarkApikey}`)
await enviar(`🌤️ *Clima Atual da Sua Cidade* 🌡️

📍 *Cidade:* ${api.resultado.cidade}
🌡️ *Temperatura:* ${api.resultado.temperatura}
🔺 *Máxima:* ${api.resultado.temperatura_max}
🔻 *Mínima:* ${api.resultado.temperatura_min}
🌥️ *Clima:* ${api.resultado.clima}
💧 *Umidade:* ${api.resultado.umidade}
🌬️ *Ventos:* ${api.resultado.ventos}
`);
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};