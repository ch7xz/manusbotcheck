const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "Sticker",
  descricao: "Envia uma sticker para o usuário",
  comandos: ["sticker3", "figuanime"],
  uso: `${prefix}sticker3`,

handle: async ({ lux, from, esperar, enviar, args, q, fetchJson, msg, reagir}) => {
if (!q) return enviar(msg.query)
try {
if (!Number(args[0]) || Number(q.trim()) > 10) return enviar("Digite a quantidade de figurinhas que deseja que eu envie.. não pode mais de 10..")
reagir(emoji)
enviar("*A noite sussurra... apenas aguarde, meu poder está se preparando.*")
async function sla3() {
lux.sendMessage(from, { sticker: { url: `${DarkUrl}/sticker/figu_anime?apikey=${DarkApikey}`} })}
for (i = 0; i < q; i++) {
await esperar(680)
sla3()
}
} catch (e) {
console.log(e)
enviar("Deu erro ao tentando consultar a api...")
}

},
};