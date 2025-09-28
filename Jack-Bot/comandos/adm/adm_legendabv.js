const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "adm",
  descricao: "",
  comandos: ["legendabv"],
  uso: `${prefix}legendabv 1/0`,

handle: async ({ enviar, q, ModificaGrupo, ArquivosDosGrupos}) => {
if(!q) return enviar(`- *Me informe a legenda para os boas vindas*`)
try {
if (!ArquivosDosGrupos[0].bemvindo) return enviar("- *Ative primeiro o bemvindo*")
ArquivosDosGrupos[0].bv[0].entrou = q
ModificaGrupo(ArquivosDosGrupos)
enviar(`*_A legenda foi atualizada com sucesso ${emoji}_*`)
} catch (e) {
console.log(e)
enviar("Deu erro....")
}
  },
};