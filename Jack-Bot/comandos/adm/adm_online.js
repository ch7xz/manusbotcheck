const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "adm",
  descricao: "bot",
  comandos: ["online", "on"],
  uso: `${prefix}on 1/0`,

handle: async ({ enviar, q, sender, ModificaGrupo, ArquivosDosGrupos}) => {
try {
let usuario = ArquivosDosGrupos[0].ausente.find(u => u.numero === sender.split('@s.whatsapp.net')[0] && u.ativo)
if (!usuario) return enviar('Você não tem ausência ativa ❌')
usuario.ativo = false
ModificaGrupo(ArquivosDosGrupos)
enviar('*_Mensagem de ausência retirada com sucesso ✅_*.')
} catch (e) {
console.log(e)
enviar("Deu erro....")
}
  },
};