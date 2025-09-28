const { prefix, version, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "ping",
  descricao: "ping do boteco",
  comandos: ["ping", "velocidade"],
  uso: `${prefix}ping`,

handle: async ({ latensi, uptimeBot, enviar, enviarImg2, pushname, isDono, data, hora, sender }) => {
try { slaw = await client.profilePictureUrl(`${sender.split('@')[0]}@c.us`, 'image'); shortpc = await axios.get(`https://tinyurl.com/api-create.php?url=${slaw}`); foto = shortpc.data; } catch(e) { foto = 'https://telegra.ph/file/9c472f0ed2499de52e2f5.jpg' }
textoPing = `╭═══════════════════⪩
╰╮⟪ *PINGO DO BOT* ⟫
╭┤➤ ⋟ Usuário: *${pushname}*
┃│░⃟⃛🕸️༘݊➮ Bot: ${botName}
┃│░⃟⃛🕸️༘݊➮ Data: ${data}
┃│░⃟⃛🕸️༘݊➮ Hora: ${hora}
┃│░⃟⃛🕸️༘݊➮ Status: ${isDono ? "Dono" : "Membro"}
┃│░⃟⃛🕸️༘݊➮ Tempo de resposta: ${latensi.toFixed(4)}
┃│░⃟⃛🕸️༘݊➮ Tempo online: ${uptimeBot}
┃│░⃟⃛🕸️༘݊➮ Versão do bot: ${version}
┃╰══════════════════⪨
╰═══════════════════⪨`
await enviar("Pong 🏓")
await enviarImg2(`${DarkUrl}/api/canva/bem-vindo2?titulo=Jack Bot&avatar=${foto}&fundo=https://files.catbox.moe/6uwejj.jpg&nome=Ping Do Bot:&desc=${latensi.toFixed(4)}ms`, textoPing)
  },
};