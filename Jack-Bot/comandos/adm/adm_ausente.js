const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "adm",
  descricao: "bot",
  comandos: ["ausente", "afk"],
  uso: `${prefix}afk 1/0`,

handle: async ({ enviar, q, reagir, sender, ModificaGrupo, ArquivosDosGrupos}) => {
if(!q) return enviar(`Para ativar ou desativar use assim: ${prefix}antilink 1\n>1 para ativar\n> 0 para desativar`)
try {
if (!q) return enviar("Falta a mensagem de ausência...")
let jaAusente = ArquivosDosGrupos[0].ausente.find(u => u.numero === sender && u.ativo)
if (jaAusente) return enviar("Você já está com a ausência ativa")
if (q === "preset") {
reagir(emoji)
return enviar(`*PRESETS DE AUSÊNCIA*\n\n%data% = Data de hoje\n%hora% = Hora de agora`)
}
reagir("✅")
ArquivosDosGrupos[0].ausente.push({ ativo: true, numero: sender.split('@s.whatsapp.net')[0], mensagem: q })
ModificaGrupo(ArquivosDosGrupos)
enviar('*_Mensagem de ausência adicionada com sucesso ✅_*.')
} catch (e) {
console.log(e)
enviar("Deu erro....")
}
  },
};