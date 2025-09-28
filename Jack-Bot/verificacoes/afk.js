module.exports = async ({ info, isGroup, body, reagir, enviar, data, hora, client, from, sender, isAdm, ArquivosDosGrupos }) => {
const menc2 = [...body.matchAll(/@(\d{5,})/g)].map(match => match[1]);
try {
const grupo = isGroup ? ArquivosDosGrupos[0] : undefined;
if (!menc2 || menc2.length === 0) return;
for (let jid of menc2) {
const userAusente = grupo.ausente?.find(u => u.numero === jid && u.ativo);
if (userAusente) {
let textin = userAusente.mensagem
.replace('%hora%', hora)
.replace('%data%', data);

textin2 = `👑 *O adm ${userAusente.numero} está ausente e deixou a seguinte mensagem:*\n"${textin}"`
reagir("😴")
client.sendMessage(from, { text: textin2 }, { quoted: { key: { fromMe: false, participant: '0@s.whatsapp.net' }, message: { extendedTextMessage: { text: ` 💤 🇦‌🇺‌🇸‌🇪‌🇳‌🇹‌🇪‌ 💤`, title: null, thumbnailUrl: null } } } });
}
}
} catch (e) {
console.error("Erro no afk:", e);
return false;
}
};