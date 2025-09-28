module.exports = async ({ info, body, enviar, client, from, sender, isAdm }) => {
try {
const UrlLinks = ["https://", "wa.me", "http://"];
const content = body || info.message?.conversation || "";
for (let link of UrlLinks) {
if (content.includes(link)) {

if (!isAdm) {
await enviar(`- *Links não são permitidos aqui, ${sender.split('@')[0]}!*`);
await client.sendMessage(from, { delete: { remoteJid: from, id: info.key.id, participant: sender } });
await new Promise(r => setTimeout(r, 1000));
await client.groupParticipantsUpdate(from, [sender], "remove");
} else {
enviar(`- *Você eu deixo passar...*`)
}

return true;
}
}

return false;
} catch (e) {
console.error("Erro no antilink:", e);
return false;
}
};