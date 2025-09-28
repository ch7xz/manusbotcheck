const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "ban",
  descricao: "Banir membro do grupo",
  comandos: ["banir", "ban", "kit"],
  uso: `${prefix}ban`,

handle: async ({ enviar, q, selo, client, from, groupMembers, numeroBot, dono, menc}) => {

try {
if(!menc) return enviar("Marque a mensagem do usuário ou marque o @ dele.., lembre de só marcar um usuário...")
if(!JSON.stringify(groupMembers).includes(menc)) return enviar("Esse usuário já ta banido ou saiu do grupo")
if(numeroBot.includes(menc)) return enviar('ox!!! pq tá tendo me dar ban?')
if(dono.includes(menc)) return enviar('*Tentando dar ban em meu mestre?*')
client.groupParticipantsUpdate(from, [menc], "remove") 
client.sendMessage(from, {text: `*Segura esse ban ai meu nobre kkkk*`, mentions: [menc]}) 
} catch (e) {
console.log(e)
}
},
};