const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")
const { ytVideosSearch } = require("../../lux/js/scraper.js")

module.exports = {
  nome: "YouTube",
  descricao: "Comando para fazer uma pesquisa",
  comandos: ["ytsearch"],
  uso: `${prefix}ytsearch`,

handle: async ({ enviar, q, enviarImg2, reagir}) => {
if (!q) return enviar("Cade o tema da pesquisa após o comando??")
try {
reagir(emoji)
const { resultado } = await ytVideosSearch(q)
textopesquisa = `*lıl.ılı.lıll「🎶 *PESQUISA* 🎶」llı.ıllı.ılı*
    
*১°᳝ꯥ‧ٓ🛸⸱￫ 𝙴𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚍𝚘:* *_${resultado.length}_* 
*১°᳝ꯥ‧ٓ🛸⸱￫ 𝚃𝚒𝚝𝚞𝚕𝚘:* *_${resultado[0].title}_*
*১°᳝ꯥ‧ٓ🛸⸱￫ 𝙳𝚞𝚛𝚊𝚌𝚊𝚘:* _*${resultado[0].timestamp}*_
*১°᳝ꯥ‧ٓ🛸⸱￫ 𝙲𝚊𝚗𝚊𝚕:* _*${resultado[0].author.name}*_
*১°᳝ꯥ‧ٓ🛸⸱￫ Url:* _*${resultado[0].url}*_
*১°᳝ꯥ‧ٓ🛸⸱￫ 𝙳𝚎𝚜𝚌𝚛𝚒𝚌𝚊𝚘:* _*${resultado[0].description}*_\n
*১°᳝ꯥ‧ٓ🛸⸱￫ 𝙲𝚛𝚒𝚊𝚍𝚘𝚛:* _*Pedrozz Mods*_`
await enviarImg2(resultado[0].image, textopesquisa)
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};