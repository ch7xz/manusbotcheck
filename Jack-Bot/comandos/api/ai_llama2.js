const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")
const { multiAi } = require("../../lux/js/scraper.js")

module.exports = {
  nome: "inteligência",
  descricao: "Gere uma resposta inteligête usando inteligência artificial",
  comandos: ["llama2", "metallama2"],
  uso: `${prefix}llama2 bom dia`,

handle: async ({ enviarAi, q, enviarImg2, reagir}) => {
if (!q) return enviar("Cade o prompt para a sua pergunta?")
try {
reagir(emoji)
dados = await multiAi("llama2", q, prompt2 = null)
enviarAi(dados)
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};