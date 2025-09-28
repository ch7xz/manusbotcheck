const { prefix, botName, donoName, DarkApikey, DarkUrl } = require("../../dono/config.json")
const { gemini } = require("../../lux/js/scraper.js")

module.exports = {
  nome: "gemini",
  descricao: "manda uma mensagem para a Ai Gemini",
  comandos: ["gemini", "ia"],
  uso: `${prefix}gemini bom dia`,

  handle: async ({ args, enviar, selo, client, from}) => {
const query = args.join(" ")
const gem = await gemini(query)
  client.sendMessage(from, {text: gem}, {quoted: selo})
  },
};