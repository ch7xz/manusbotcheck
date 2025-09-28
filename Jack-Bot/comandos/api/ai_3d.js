const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")
const { dalle } = require("../../lux/js/scraper.js")

module.exports = {
  nome: "ai",
  descricao: "Cria uma imagem usando inteligência artificial",
  comandos: ["ia_3d", "3d"],
  uso: `${prefix}3d cat`,

handle: async ({ enviar, q, enviarImg2, reagir}) => {
if (!q) return enviar("Cade o prompt da imagem?")
try {
reagir(emoji)
enviar("- *Gerando imagem...*")
dados = await dalle(q, "3d")
enviarImg2(dados, "*Imagem gerada por inteligência artificial*")
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};