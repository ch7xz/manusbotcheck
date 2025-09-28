const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "serie",
  descricao: "Comando para fazer uma pesquisa",
  comandos: ["serie"],
  uso: `${prefix}serie wandinha`,

handle: async ({ from, lux, enviar, q, enviarImg2, reagir, selo, fetchJson}) => {
if (!q) return enviar("Cade o tema da pesquisa após o comando??")
try {
reagir(emoji)
api = await fetchJson(`${DarkUrl}/api/serie?nome=${q}&apikey=${DarkApikey}`)
lux.sendMessage(from, {image: {url: api.imagem}, caption: 
`➤ ⋟ *Nome:* ${api.Nome}
➤ ⋟ *Nome Original:* ${api.Nome_original}
➤ ⋟ *Data de Lançamento:* ${api.Lançamento}
➤ ⋟ *Avaliação:** ${api.Avaliações}
➤ ⋟ *Conteúdo Adulto?:* ${api.Classificação_adulta}
➤ ⋟ *Linguagem Original:* ${api.Linguagem_oficial}
➤ ⋟ *Sinopse:*
${api.Sinopse}`}, {quoted: selo}).catch(e => {
console.log(e)
enviar(`nao achei a serie ${q}`)
})
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};