const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "adm",
  descricao: "Comando Adm",
  comandos: ["citar", "hidetag", "totag"],
  uso: `${prefix}citar`,

  handle: async ({ q, selo, lux, from, reagir, enviar, msg, pushname }) => {
if (!q) return enviar(msg.query);
reagir(emoji)
let metadata = await lux.groupMetadata(from);
let participants = metadata.participants;
await lux.sendMessage(from, { text : `Citação do adm: ${pushname}\n\n` + q, mentions: participants.map(a => a.id)}, { quoted: selo });//SIMPLES NÉ KKK
  },
};