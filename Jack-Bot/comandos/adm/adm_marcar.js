const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "Adm",
  descricao: "Comando Adm",
  comandos: ["marcar", "mar"],
  uso: `${prefix}marcar`,

  handle: async ({ enviar, fotomenu, info, lux, from, reagir, q}) => {
reagir("📣")
let metadata = await lux.groupMetadata(from);
let participantes = metadata.participants;
let listaMembros = participantes.map(mem => `┃  ⃟${emoji}๋࿆.• @${mem.id.split('@')[0]}๋࿆.•`).join('\n');
let mensagem = `╭─〔 *๋࿆.•${q || "MARCANDO OS MEMBROS"}๋࿆.•* 〕─╮
${listaMembros}
╰━━━━━━━━━━━━━━━━━━━╯`;
await lux.sendMessage(from, { image: { url: fotomenu }, caption: mensagem, mentions: participantes.map(a => a.id) }, { quoted: info });
 
  },
};