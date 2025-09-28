const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "adm",
  descricao: "Ativar ou desativar o antilink do bot",
  comandos: ["antilink", "antil"],
  uso: `${prefix}antilink 1/0`,

handle: async ({ enviar, q, ModificaGrupo, ArquivosDosGrupos}) => {
if(!q) return enviar(`Para ativar ou desativar use assim: ${prefix}antilink 1\n>1 para ativar\n> 0 para desativar`)
try {
if (q == 1) {
if (ArquivosDosGrupos[0].antilink) return enviar("- *O antilink já está ativado nesse grupo*")
ArquivosDosGrupos[0].antilink = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O antilink foi ativado nesse grupo_*')
} else if (q == 0) {
if (!ArquivosDosGrupos[0].antilink) return enviar("- *O antilink já está ativado nesse grupo*")
ArquivosDosGrupos[0].antilink = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O antilink foi desativado nesse grupo_*')
}
} catch (e) {
console.log(e)
enviar("Deu erro....")
}
  },
};