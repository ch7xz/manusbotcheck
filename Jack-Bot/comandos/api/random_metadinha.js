const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")
const { metadinha } = require("../../lux/js/scraper.js")

module.exports = {
  nome: "metadinha",
  descricao: "sla",
  comandos: ["metadinha"],
  uso: `${prefix}metadinha`,

handle: async ({ enviarAi, q, enviar, enviarImg2, reagir}) => {
enviar("- *Enviando as metadinhas...*")
try {
reagir(emoji)
dados = await metadinha()
await enviarImg2(dados.masculina, `*Aqui está sua metadinha "masculina" 🤵*`)
await enviarImg2(dados.feminina, `*Aqui está sua metadinha "feminina" 👸*`)
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};