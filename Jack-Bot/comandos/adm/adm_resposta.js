const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "adm",
  descricao: "Ativar ou desativar o auto resposta do bot",
  comandos: ["resposta", "auto-resposta"],
  uso: `${prefix}autoresposta nmr`,

handle: async ({ enviar, q, ModificaGrupo, ArquivosDosGrupos}) => {
if(!q) return enviar(`Para ativar ou desativar use assim: ${prefix}autoresposta 1\n>1 para ativar\n> 0 para desativar`)
try {
if (q == 1) {
if (ArquivosDosGrupos[0].autoResposta) return enviar("- *O auto resposta já está ativado nesse grupo*")
ArquivosDosGrupos[0].autoResposta = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O auto resposta foi ativado nesse grupo_*')
} else if (q == 0) {
if (!ArquivosDosGrupos[0].autoResposta) return enviar("- *O auto resposta já está ativado nesse grupo*")
ArquivosDosGrupos[0].autoResposta = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O auto resposta foi desativado nesse grupo_*')
}
} catch (e) {
console.log(e)
enviar("Deu erro....")
}
  },
};