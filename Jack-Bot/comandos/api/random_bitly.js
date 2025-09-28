const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "Random",
  descricao: "sla",
  comandos: ["encurtador", "bitly"],
  uso: `${prefix}bitly https://speedhosting.cloud`,

handle: async ({ enviar, q, fetchJson, msg, reagir}) => {
if (!q) return enviar(msg.query)
try {
reagir(emoji)
enviar(msg.epera)
api = await fetchJson(`${DarkUrl}/api/outros/bitly?link=${q}&apikey=${DarkApikey}`)
await enviar(`*Seu link encurtado: ${api.result}*`);
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};