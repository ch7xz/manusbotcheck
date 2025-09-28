const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../dono/config.json")
const axios = require("axios");

module.exports = {
  nome: "login",
  descricao: "Fazer registro no bot",
  comandos: ["login", "registro"],
  uso: `${prefix}login`,

  handle: async ({ enviar, q, selo, sender, client, from, data, hora, registrarUsuario1, pushname, isDono}) => {
let vip; let saldo;
if (isDono) { vip = true; saldo = 500000; } else { vip = false; saldo: 0; }
try { slaw = await client.profilePictureUrl(`${sender.split('@')[0]}@c.us`, 'image'); shortpc = await axios.get(`https://tinyurl.com/api-create.php?url=${slaw}`); foto = shortpc.data; } catch(e) { foto = 'https://telegra.ph/file/9c472f0ed2499de52e2f5.jpg' }
try { bio = (await client.fetchStatus(sender)).status } catch { status = "CharliinTralha mata Jacaré �����" }
registrarUsuario1(sender, pushname, saldo, vip, bio, foto)
enviar("- *Parabéns! Seu Registro foi feito com sucesso 😃👌*")
  },
};