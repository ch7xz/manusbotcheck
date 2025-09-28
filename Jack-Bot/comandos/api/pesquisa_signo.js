const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "Pesquisa",
  descricao: "Comando para fazer uma pesquisa",
  comandos: ["signo"],
  uso: `${prefix}signo gêmeos`,

handle: async ({ from, lux, enviar, q, enviarImg2, reagir, selo, fetchJson}) => {
if (!q) return enviar("Cade o tema da pesquisa após o comando??")
try {
reagir(emoji)
api = await fetchJson(`${DarkUrl}/api/pesquisa/horoscopo?apikey=${DarkApikey}&signo=${encodeURIComponent(q)}`)
lux.sendMessage(from, {image: {url: api.reaultado.imagem}, caption: 
`➤ ⋟ *Título:* ${api.resultado.tituloPrincipal}
➤ ⋟ *Subtítulo:* ${api.resultado.subtitulo}
➤ ⋟ *Período:* ${api.resultado.periodo}
➤ ⋟ *Horoscopo:*
${api.resultado.horoscopo}`}, {quoted: selo}).catch(e => {
console.log(e)
enviar(`nao achei o signo ${q}`)
})
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};