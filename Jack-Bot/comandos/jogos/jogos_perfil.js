const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")
const axios = require('axios');

module.exports = {
  nome: "perfil",
  descricao: "Perfil do usuário",
  comandos: ["perfil", "perfill"],
  uso: `${prefix}perfil`,

  handle: async ({ enviar, enviarImg2, pushname, isDono, infoUser, selo, client, sender, from, data, hora}) => {
 try {
slaw = await client.profilePictureUrl(`${sender.split('@')[0]}@c.us`, 'image');
shortpc = await axios.get(`https://tinyurl.com/api-create.php?url=${slaw}`);
ppimg = shortpc.data
} catch(e) {
ppimg = 'https://telegra.ph/file/9c472f0ed2499de52e2f5.jpg'
}
textoPerfil = `▧⃯⃟৴ํฺ͘.•🛸￫ _Nome_: *${pushname}*
▧⃯⃟৴ํฺ͘.•🛸￫ _Número_: *${sender.split('@')[0]}*
▧⃯⃟৴ํฺ͘.•🛸￫ _Vip:_ *${infoUser.vip ? "Sim" : "Não"}*
▧⃯⃟৴ํฺ͘.•🛸￫ _Status_: *${isDono ? "Dono" : "Membro"}*
▧⃯⃟৴ํฺ͘.•🛸￫ _Mensagem Enviada:_ *${infoUser.mensagemEnviada}*
▧⃯⃟৴ํฺ͘.•🛸￫ _Figurinha Enviada_: *${infoUser.figurinhaEnviada}*
▧⃯⃟৴ํฺ͘.•🛸￫ _Comandos Usados:_ *${infoUser.comandosUsados}*`
await enviarImg2(ppimg, textoPerfil);
  },
};