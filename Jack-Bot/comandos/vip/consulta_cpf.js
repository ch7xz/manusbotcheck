const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")
const { consultas } = require("../../lux/js/scraper.js")

module.exports = {
  nome: "cpf",
  descricao: "Fazer uma consulta usando nome",
  comandos: ["consulta_cpf", "cpf"],
  uso: `${prefix}cpf`,

handle: async ({ pastaLux, enviarImg2, enviar, reagir, q, selo, client, from, data, hora}) => {
if (!q) return enviar("Cade o dado da Consulta apos o comando?")
reagir("👀")
try {

enviar("- *Fazendo a sua consulta.....*")
dados = await consultas("cpf", q)
enviarImg2(pastaLux + "imagem/pux.png", dados)
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};