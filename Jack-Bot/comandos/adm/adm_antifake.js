const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "adm",
  descricao: "Ativar ou desativar o antifake do bot",
  comandos: ["antifake", "antiddd"],
  uso: `${prefix}antifake 1/0`,

handle: async ({ enviar, q, ModificaGrupo, ArquivosDosGrupos}) => {
if(!q) return enviar(`Para ativar ou desativar use assim: ${prefix}antifake 1\n>1 para ativar\n> 0 para desativar`)
try {
if (q == 1) {
if (ArquivosDosGrupos[0].fake) return enviar("- *O antifake já está ativado nesse grupo*")
ArquivosDosGrupos[0].fake = true
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O antifake foi ativado nesse grupo_*')
} else if (q == 0) {
if (!ArquivosDosGrupos[0].fake) return enviar("- *O antifake já está ativado nesse grupo*")
ArquivosDosGrupos[0].fake = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_O antifake foi desativado nesse grupo_*')
}
} catch (e) {
console.log(e)
enviar("Deu erro....")
}
  },
};