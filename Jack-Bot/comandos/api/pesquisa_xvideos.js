const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "Pesquisa",
  descricao: "Comando para fazer uma pesquisa",
  comandos: ["xvideos"],
  uso: `${prefix}xvideos novinha`,

handle: async ({ from, lux, enviar, q, enviarImg2, reagir, selo, fetchJson}) => {
if (!q) return enviar("Cade o tema da pesquisa após o comando??")
try {
reagir(emoji)
api = await fetchJson(`${DarkUrl}/api/pesquisa/xvideos?apikey=${DarkApikey}&query=${encodeURIComponent(q)}`)
lux.sendMessage(from, {image: {url: `https://logos-world.net/wp-content/uploads/2023/01/XVideos-Logo-500x281.png`}, caption: 
`➤ ⋟ *Título:* ${api.resultado[0].title}
➤ ⋟ *Duração:* ${api.resultado[0].duration}
➤ ⋟ *Views:* ${api.resultado[0].views || "Sem informação"}
➤ ⋟ *Link:* ${api.resultado[0].link}`}, {quoted: selo})
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};