const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")
const { travaZapImg } = require("../../lux/js/scraper.js")

module.exports = {
  nome: "travazap",
  descricao: "sla",
  comandos: ["travazapimg2"],
  uso: `${prefix}teavazapimg2`,

handle: async ({ enviar, q, enviarImg2, reagir}) => {
enviar("- *Enviando sua imagem...*")
try {
reagir(emoji)
dados = await travaZapImg2()
await enviarImg2(dados, `*Aqui está sua imagem estilo trava zap*`)
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};