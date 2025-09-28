const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "Download",
  descricao: "Comando para fazer download",
  comandos: ["tuna"],
  uso: `${prefix}tuna lula`,

handle: async ({ from, lux, enviar, q, enviarAd, reagir, selo, fetchJson}) => {
if (!q) return enviar("Cade o tema da pesquisa após o comando??")
try {
reagir("👌")
bla = await fetchJson(`${DarkUrl}/api/download/tuna?apikey=${DarkApikey}&query=${encodeURIComponent(q)}`)
galinha = bla.resultado[Math.floor(Math.random() * bla.resultado.length)];
enviarAd(galinha)
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};