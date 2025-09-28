const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "adm",
  descricao: "",
  comandos: ["legendasaiu"],
  uso: `${prefix}legendasaiu 1/0`,

handle: async ({ enviar, q, ModificaGrupo, ArquivosDosGrupos}) => {
if(!q) return enviar(`- *Me informe a legenda para os membros que sai do gp*`)
try {
if (!ArquivosDosGrupos[0].bemvindo) return enviar("- *Ative primeiro o bemvindo*")
ArquivosDosGrupos[0].bv[0].saiu = q
ModificaGrupo(ArquivosDosGrupos)
enviar(`*_A legenda foi atualizada com sucesso ${emoji}_*`)
} catch (e) {
console.log(e)
enviar("Deu erro....")
}
  },
};