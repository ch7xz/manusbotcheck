const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "Sticker",
  descricao: "Envia uma sticker para o usuário",
  comandos: ["stickerai", "iasticker"],
  uso: `${prefix}stickerai`,

handle: async ({ lux, from, esperar, enviar, q, msg, reagir}) => {
if (!q) return enviar(msg.query)
if (!q.trim()) return enviar(`*_❕Escreva o que você deseja gerar no sticker* \n- *🧑‍🏫 Exemplo:* ${prefix + comando} a girl playing with her dog`);
enviar('*🎨 Criando seu sticker com inteligência artificial...*');
try {
lux.sendMessage(from, {sticker: {url: `${DarkUrl}/api/ai/sticker/generation?prompt=${encodeURIComponent(q)}&apikey=${DarkApikey}`}})
} catch (e) {
console.log(e)
enviar("erro ao criar a figurinha")
}

},
};