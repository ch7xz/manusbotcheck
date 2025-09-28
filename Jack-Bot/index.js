//=========CRÉDITOS=============\\
/*
CRÉDITOS: PEDROZZ MODS

Essa base foi criada por Pedrozz Mods, então se você for divulgar, repostar ou compartilhar em qualquer lugar, dá aquela moral e mantém os créditos, fechou? 😅

Ela é totalmente **gratuita**, ou seja, se algum espertinho aí tiver vendendo, já sabe que tá feio hein... 👀
*/
//===========BAILEYS==========\\
const { 
default: makeWASocket, downloadContentFromMessage,emitGroupParticipantsUpdate,emitGroupUpdate,makeInMemoryStore,prepareWAMessageMedia, MediaType,WAMessageStatus, AuthenticationState, GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions,useMultiFileAuthState, BufferJSON,WAMessageProto,MessageOptions, PHONENUMBER_MCC,	 WAFlag,WANode,	 WAMetric,	 ChatModification,MessageTypeProto,WALocationMessage, ReconnectMode,WAContextInfo,proto,	 WAGroupMetadata,ProxyAgent,	 waChatKey,MimetypeMap,MediaPathMap,WAContactMessage,WAContactsArrayMessage,WAGroupInviteMessage,WATextMessage,WAMessageContent,WAMessage,BaileysError,WA_MESSAGE_STATUS_TYPE,MediaConnInfo, generateWAMessageContent, URL_REGEX,Contact, WAUrlInfo,WA_DEFAULT_EPHEMERAL,WAMediaUpload,mentionedJid,processTime,	 Browser, makeCacheableSignalKeyStore ,MessageType,Presence,WA_MESSAGE_STUB_TYPES,Mimetype,relayWAMessage,	 Browsers,GroupSettingChange,delay,DisconnectReason,WASocket,getStream,WAProto,isBaileys,AnyMessageContent,generateWAMessageFromContent, fetchLatestBaileysVersion,processMessage,processingMutex
} = require('@whiskeysockets/baileys');
const baileys = require('@whiskeysockets/baileys');
//=========MODULOS===========\\
let pino = require('pino')
const fs = require('fs')
const path = require("path");
const axios = require('axios');
const chalk = require('chalk')
const Pino = require('pino')
const speed = require('performance-now');
const comandos = new Map();
const comandosDir = path.join(__dirname, 'comandos');
const date = new Date();
const data = new Intl.DateTimeFormat('pt-BR').format(date);
const hora = date.toLocaleTimeString('pt-BR', { hour12: false });

const NodeCache = require("node-cache")
const readline = require("readline")
const PhoneNumber = require('awesome-phonenumber')
let phoneNumber = "557792142954"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
//============CONFIG==========\\
const { prefix, botName, donoNumero } = require("./dono/config.json")
const verMsg = true; //True = ativo, False = desativado.

//const { menu } = require("./lux/js/menu.js");
const fotomenu = "./lux/imagem/menu.png";
const pastaLux = "./lux/";
const { catBoxUpload } = require("./lux/js/upload.js")
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lux/js/lib/exif')
const { imageToWebp2, videoToWebp2, writeExifImg2, writeExifVid2 } = require('./lux/js/lib/exif2')
//=======INICIO DO BOTECO=======\\
async function ligarbot() {

const { state, saveCreds } = await useMultiFileAuthState('./dono/jack-qr')
const { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetryCounterCache = new NodeCache()
const lux = makeWASocket({
version,
auth: {
 creds: state.creds,
 keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
},
logger: pino({ level: 'silent' }),
printQRInTerminal: !process.argv.includes("--code"),
mobile: false,
browser: ['Ubuntu','Edge','125.0.0.0'],
generateHighQualityLinkPreview: true,
msgRetryCounterCache,
connectTimeoutMs: 60000,
defaultQueryTimeoutMs: 0,
keepAliveIntervalMs: 20000,
patchMessageBeforeSending: (message) => {
 const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
 if (requiresPatch) {
message = {
 viewOnceMessage: {
message: {
 messageContextInfo: {
deviceListMetadataVersion: 2,
deviceListMetadata: {},
 },
 ...message,
},
 },
};
 }
 return message;
},
 });

//======CONEXÃO POR CODE=========\\
if (!lux.authState.creds.registered) {
 console.clear();
 console.log(chalk.red('\n═══════════════════════════════════════════════════════'));
 console.log(chalk.bgRed.white(' INÍCIO DO EMPARELHAMENTO '));
 console.log(chalk.red('═══════════════════════════════════════════════════════\n'));

 rl.question(chalk.hex('#ff0044')('📱 Número do bot: '), async (phoneNumber) => {
if (!phoneNumber) {
 console.log('\n❌ Nenhum número inserido. Ritual cancelado.');
 rl.close();
 process.exit(1);
}

const NumeroLimpo = phoneNumber.replace(/[^0-9]/g, '');
console.log('\n🔮 Invocando código...');
const code = await lux.requestPairingCode(NumeroLimpo);

console.log(chalk.green('\n✅ Código de emparelhamento: ') + chalk.bold.white(code));
rl.close();
 });
}

//=======CLIENTES=======\\
var astaroth = lux;
var laura = lux;
var suc = lux;
//*==================*\\
lux.ev.on('chats.set', () => { console.log('setando conversas...'); })
lux.ev.on('contacts.set', () => { console.log('setando contatos...'); })
lux.ev.on('creds.update', saveCreds)

// === Carregar verificações ===
let verificacoes = {};
const pastaVerif = path.join(__dirname, "verificacoes");

function loadVerificacoes() {
verificacoes = {};
fs.readdirSync(pastaVerif).forEach(file => {
if (file.endsWith(".js")) {
const fullPath = path.join(pastaVerif, file);
delete require.cache[require.resolve(fullPath)];

try {
const nome = file.replace(".js", "");
verificacoes[nome] = require(fullPath);
} catch (err) {
console.error(`[✘] Erro ao carregar ${file}:`, err);
}
}
});
}

function watchVerificacoes() {
fs.watch(pastaVerif, (eventType, filename) => {
if (filename && filename.endsWith(".js")) {
loadVerificacoes();
}
});
}
loadVerificacoes();
watchVerificacoes();

// === Carrega todos os plugins ===
const comandos = new Map()
function loadComandos() {
comandos.clear()
const comandosRoot = path.join(__dirname, 'comandos')

function percorrer(dir) {
fs.readdirSync(dir).forEach(file => {
const fullPath = path.join(dir, file)
if (fs.lstatSync(fullPath).isDirectory()) {
percorrer(fullPath)
} else if (file.endsWith('.js')) {
delete require.cache[require.resolve(fullPath)]
const comando = require(fullPath)

const relative = path.relative(comandosRoot, fullPath)
const parts = relative.split(path.sep)
let permissao = 'geral'
if (parts.length > 1) {
if (parts[0].toLowerCase() === 'dono') permissao = 'dono'
else if (parts[0].toLowerCase() === 'adm') permissao = 'adm'
else if (parts[0].toLowerCase() === 'vip') permissao = 'vip'
}
comando.permissao = permissao
if (Array.isArray(comando.comandos)) {
  comando.comandos.forEach(cmd => comandos.set(cmd, comando));
} else if (typeof comando.command === "string") {
  comandos.set(comando.command, comando);
}

}
})
}

percorrer(comandosRoot)
}
loadComandos()

function restPgj() {
const comandosRoot = path.join(__dirname, 'comandos')
function seiQueV(dir) {
fs.readdirSync(dir).forEach(file => {
const fullPath = path.join(dir, file)
if (fs.lstatSync(fullPath).isDirectory()) {
seiQueV(fullPath)
} else if (file.endsWith('.js')) {
fs.watchFile(fullPath, () => {
console.log(`Arquivo ${file} modificado. Reload...`)
loadComandos()
})
}
})
}
seiQueV(comandosRoot)
}

restPgj()
const dono = [`${donoNumero}@s.whatsapp.net`]

lux.ev.on('group-participants.update', async (bemVindo) => {
const { id, action } = bemVindo;
const from = id;
const isGroup = from.endsWith('@g.us');
const groupMetadata = isGroup ? await lux.groupMetadata(from): ""
const groupName = isGroup  ? groupMetadata.subject: ""
const sender = bemVindo.participants[0];
const PastaDeGrupos2 = `./lux/json/grupos/${from}.json`
const ArquivosDosGrupos2 = isGroup ? JSON.parse(fs.readFileSync(PastaDeGrupos2)) : undefined;

if (ArquivosDosGrupos2[0].bemvindo){
if (action === "add") {
textin = ArquivosDosGrupos2[0].bv[0].entrou
.replace('%numero%', bemVindo.participants[0].split('@')[0])
.replace('%nomeGrupo%', groupName)
lux.sendMessage(from, {text: textin})
} else if (action === "remove"){
textin = ArquivosDosGrupos2[0].bv[0].saiu
.replace('%numero%', bemVindo.participants[0].split('@')[0])
.replace('%nomeGrupo%', groupName)
lux.sendMessage(from, {text: textin})
}
}

if (ArquivosDosGrupos2[0].fake){
if (!sender.startsWith("55")) {
await enviar(`⚠️ Número ${sender.split('@')[0]} bloqueado (não permitido neste grupo).`);
await new Promise(r => setTimeout(r, 1000));
await lux.groupParticipantsUpdate(from, [sender], "remove");
}}

});

lux.ev.on('messages.upsert', async ({ messages }) => {
try {
const info = messages[0]
const from = info.key.remoteJid;
const type = baileys.getContentType(info.message);
const body = (type === 'conversation') ?
info.message.conversation : 
(type === 'extendedTextMessage') ?
info.message.extendedTextMessage.text : '';

const isGroup = from.endsWith('@g.us');
const semPrefixo = body.slice(1).trim()
const partes = semPrefixo.split(/ +/)
const comandoNome = partes.shift().toLowerCase()
const isCmd = body.startsWith(prefix)
const comando2 = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = partes
const q = partes.join(" ")
const text = q
const menc = q.replace("@", "") + "@s.whatsapp.net";
const sender = info.key.participant || from
const pushname = info.pushName ? info.pushName : ""
const isDono = dono.includes(sender)
const metadata = isGroup ? await lux.groupMetadata(from) : "";
const participante = isGroup ? metadata.participants.find(p => p.id === sender) : "";
const numeroBot = lux.user.id.split(":")[0]+"@s.whatsapp.net"
const groupMembers = metadata ? metadata.participants : [];
const isAdm = participante?.admin !== undefined || isDono

const Dispositivo = info.key.id.length > 21 ? '📱 Android' : info.key.id.substring(0, 2) == '3A' ? '🍏 iPhone' : '💻 WhatsApp Web';

//=======>PING<========//
let timestamp = speed();
let latensi = speed() - timestamp;
function formatTime(seconds) {
 const days = Math.floor(seconds / (3600 * 24));
 const hours = Math.floor((seconds % (3600 * 24)) / 3600);
 const minutes = Math.floor((seconds % 3600) / 60);
 const secs = Math.floor(seconds % 60);
 return `${days}d ${hours}h ${minutes}m ${secs}s`;
}


///////////////////////////////////////
//USUÁRIO 
const { registrarUsuario1, infoUser1, modificarsaldo, registrarAposta, modificarUsuario, carregarDadosUsuarios } = require("./lux/js/usuario.js")
const infoUser = infoUser1(sender)
const isPremium = infoUser1(sender)?.vip === true;

if (infoUser && isCmd) { modificarUsuario(sender, parseInt(infoUser.comandosUsados) + 1, "comandosUsados") }
if (infoUser && type === 'stickerMessage') { modificarUsuario(sender, parseInt(infoUser.figurinhaEnviada) + 1, "figurinhaEnviada") }
if (infoUser && body) { modificarUsuario(sender, parseInt(infoUser.mensagemEnviada) + 1, "mensagemEnviada") }

// Verificação de registro
const isLogin = false
if (isLogin && !infoUser && comandoNome !== "login" && isCmd) {
 return enviar(`⚠️ Acesso negado. Use *${prefix}login* para selar seu vínculo comigo.`);
} else {
let vip; let saldo;
if (isDono) { vip = true; saldo = 500000; } else { vip = false; saldo: 0; }
try { slaw = await lux.profilePictureUrl(`${sender.split('@')[0]}@c.us`, 'image'); shortpc = await axios.get(`https://tinyurl.com/api-create.php?url=${slaw}`); foto = shortpc.data; } catch(e) { foto = 'https://telegra.ph/file/9c472f0ed2499de52e2f5.jpg' }
try { bio = (await lux.fetchStatus(sender)).status } catch { bio = "Charliin é Menor Quente" }
registrarUsuario1(sender, pushname, saldo, vip, bio, foto)
}

// Identificação do tipo de mensagem recebida
const tipoMensagem = 
 type === 'audioMessage' ? 'Áudio' :
 type === 'stickerMessage'? 'Figurinha' :
 type === 'imageMessage' ? 'Imagem' :
 type === 'videoMessage' ? 'Vídeo' :
 type === 'documentMessage' ? 'Documento' :
 type === 'contactMessage'? 'Contato' :
 type === 'locationMessage' ? 'Localização' : 'Texto';

// Identificação do nome do chat
let nomeChat = '[Privado]';
if (isGroup) {
 try {
const metadata = await lux.groupMetadata(from);
nomeChat = `[Grupo: ${metadata.subject}]`;
 } catch {
nomeChat = '[Grupo: Desconhecido]';
 }
}

// Logs
if (isCmd) {
console.log( chalk.hex('#ff0044')(`${chalk.bold(pushname)} executou`) + ' ' + chalk.bgHex('#ff0044').black(` ${prefix}${comandoNome} `) + ' ' + chalk.hex('#ff0044')(`em ${nomeChat}`) );
} 
else if (tipoMensagem === 'Imagem') {
 console.log(
chalk.hex('#8a2be2')(`${chalk.bold(pushname)} enviou uma Imagem em ${nomeChat}`)
 );
} 
else if (tipoMensagem === 'Áudio') {
 console.log(
chalk.hex('#00ced1')(`${chalk.bold(pushname)} enviou um Áudio em ${nomeChat}`)
 );
} 
else if (tipoMensagem === 'Vídeo') {
 console.log(
chalk.hex('#ff8c00')(`${chalk.bold(pushname)} enviou um Vídeo em ${nomeChat}`)
 );
}
else if (tipoMensagem === 'Figurinha') {
 console.log(
chalk.hex('#ff69b4')(`${chalk.bold(pushname)} enviou uma Figurinha em ${nomeChat}`)
 );
}
else if (isGroup){
 console.log(
chalk.hex('#cccccc')(`${chalk.bold(pushname)} enviou uma Mensagem em ${nomeChat}`) +
chalk.dim(` → "${body?.slice(0, 50) || '...'}"`)
 );
}
else {
console.log(
chalk.hex('#cccccc')(`${chalk.bold(pushname)} enviou uma Mensagem em ${nomeChat}`) +
chalk.dim(` → "${body?.slice(0, 50) || '...'}"`)
 );
}
//=======SELOS=======\\
const selo = {key: {fromMe: false, participant: '0@s.whatsapp.net'}, message: { "extendedTextMessage": {"text": `*A noite brilha novamente*`,"title": null,'thumbnailUrl': null}}}
const seloMeta = {key: {fromMe: false,participant: '13135550002@s.whatsapp.net',},message: {contactMessage: {displayName: 'Meta IA',vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' +`FN:Meta IA\n` + `ORG:Meta IA;\n` + `TEL;type=MSG;type=CELL;type=VOICE;waid=13135550002:+13135550002\n` + 'END:VCARD'},},};
///
var texto_exato = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''
const texto = texto_exato.slice(0).trim().split(/ +/).shift().toLowerCase()
//==========ENVIAR=======\\
//SIMULA ESCRITA
async function escrever (texto) {await lux.sendPresenceUpdate('composing', from); await esperar(1000); lux.sendMessage(from, { text: texto }, {quoted: info})}
//ENVIA UMA MENSAGEM 
async function enviar (texto) {lux.sendMessage(from, { text: texto }, {quoted: info})}
async function enviarAi (texto) {lux.sendMessage(from, { text: texto }, {quoted: seloMeta})}
const reply = (texto) => {lux.sendMessage(from, { text: texto }, {quoted: info})}
//ENVIA UMA IMAGEM SIMPLES 
const enviarImg = async (link) => {await lux.sendMessage(from, {image: {url: link}}, {quoted: info})}
//ENVIA UMA IMAGEM COM TEXTO 
const enviarImg2 = async (link, texto) => {await lux.sendMessage(from, {image: {url: link}, caption: texto}, {quoted: info})}
//ENVIA UM GIF SIMPLES 
const enviarGif = async (link) => {await lux.sendMessage(from, { video: {url: link}, gifPlayback: true}, { quoted: info })}
const enviarGif2 = async (link, texto) => {await lux.sendMessage(from, { video: {url: link}, caption: texto, gifPlayback: true}, { quoted: info })}
//ENVIA UM VÍDEO SIMPLES 
const enviarVd = async (link) => {await lux.sendMessage(from, {video: {url: link }, mimetype: "video/mp4", fileName: "video.mp4"}, {quoted: info})}
//ENVIA UM VIDEO COM TEXTO
const enviarVd2 = async (link, texto) => {await lux.sendMessage(from, {video: {url: link }, caption: texto, mimetype: "video/mp4", fileName: "video.mp4"}, {quoted: info})}
//ENVIA UM ÁUDIO
const enviarAd = async (link) => {await lux.sendMessage(from, {audio: {url: link }, mimetype: "audio/mpeg"}, {quoted: info})}

const enviarAd2 = async (link) => {await lux.sendMessage(from, {audio: {url: link }, mimetype: "audio/mpeg", ptt: true}, {quoted: selo})}
//CAUSA UM DELAY ENTRE FUNÇÃO 
const esperar = async (tempo) => {return new Promise(funcao => setTimeout(funcao, tempo));}
//REAGE A UMA MENSAGEM
const reagir = (reassao) => {lux.sendMessage(from, {react: {text: reassao, key: info.key}})}

async function fetchJson(url, options) {try {
options ? options : {}
const res = await axios({method: 'GET',url: url,headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'},...options }); return res.data} catch (err) {return err}
}
const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})

//============[ FAZER STICKER ]========//
const sendImageAsSticker = async (lux, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options);
} else {
buffer = await imageToWebp(buff);
}

await lux.sendMessage(jid, {sticker: {url: buffer}, ...options}, {quoted})
return buffer;
};

const sendVideoAsSticker = async (lux, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options);
} else {
buffer = await videoToWebp(buff);
}

await lux.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer;
}

const sendImageAsSticker2 = async (lux, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifImg2(buff, options);
} else {
buffer = await imageToWebp2(buff);
}

await lux.sendMessage(jid, {sticker: {url: buffer}, ...options}, {quoted})
return buffer;
};

const sendVideoAsSticker2 = async (lux, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
 let buffer;
 if (options && (options.packname || options.author)) {
buffer = await writeExifVid2(buff, options);
} else {
buffer = await videoToWebp2(buff);
}

await lux.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer;
}

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

//ARMAZENAR GRUPO
const pastinhaDosGrupos = './lux/json/grupos/';
if (!fs.existsSync(pastinhaDosGrupos)){
fs.mkdirSync(pastinhaDosGrupos, { recursive: true });
}

const PastaDeGrupos = `${pastinhaDosGrupos}${from}.json`;
if (isGroup && !fs.existsSync(PastaDeGrupos)) {
var datea = [{
name: metadata.subject, antilink: false, afk: true, fake: false, bemvindo: false, bv: [{entrou: "Seja bem vindo as trevas", saiu: null}], autoResposta: false, 
ausente: []
}];
fs.writeFileSync(PastaDeGrupos, JSON.stringify(datea, null, 2) + '\n');
}

const ArquivosDosGrupos = isGroup && fs.existsSync(PastaDeGrupos) 
? JSON.parse(fs.readFileSync(PastaDeGrupos)) 
: undefined;

function ModificaGrupo(index) {
fs.writeFileSync(PastaDeGrupos, JSON.stringify(index, null, 2) + '\n');
}

//
const isResposta = isGroup ? ArquivosDosGrupos[0].autoResposta : undefined
//=====//
const autoResposta = require("./lux/json/semprefixo.json")
if (isResposta) {
const texto = body.toLowerCase();
for (const resposta of autoResposta) {
for (const chave of resposta.chave) {
const chaveMin = chave.toLowerCase();
if (texto.includes(chaveMin)) {
switch (resposta.tipo) {
case "audio":
enviarAd(resposta.link);
break;
case "video":
enviarVd(resposta.link);
break;
case "imagem":
enviarImg(resposta.link);
break;
case "imagem2":
enviarImg2(resposta.link, resposta.mensagem);
break;
case "gif":
enviarGif(resposta.link);
break;
case "reagir":
reagir(resposta.mensagem);
break;
}
break;
}}}}

//MENSAGENS RÁPIDAS
const msg = {
 espera: "- *calma irmãozin, ta carregando... *",
 dono: "- *Você não me parece com o Charliin tralha... ��*",
 query: "- *Procurei essa bomba que tu disse, mas não achei nada..*",
 adm: "- *Só os ADM que pode, sai fora ivamembro *",
 admBot: "- *To sem poderes, me da adm pra ativar as funções :(*",
 vip: "- *Apenas V.I.P's podem usar isso, você não é um. *",
}


if (isGroup && ArquivosDosGrupos) {
const configGrupo = ArquivosDosGrupos[0];
for (let [nome, funcao] of Object.entries(verificacoes)) {
if (configGrupo[nome]) {
const bloqueou = await funcao({ info, reagir, isGroup, body, enviar, hora, data, client: lux, from, sender, ModificaGrupo, ArquivosDosGrupos });
if (bloqueou) return;
}
}
}
//COMANDOS USANDO PLUGIN
if (body.startsWith(prefix)) {
if (comandos.has(comandoNome)) {
const comando = comandos.get(comandoNome);

//PERMISSÕES
if (comando.permissao === 'dono' && !isDono) return enviar(msg.dono);
if (comando.permissao === 'adm' && !isAdm) return enviar(msg.adm);
if (comando.permissao === 'vip' && !isPremium) return enviar(msg.vip);

await comando.handle({
pastaLux, msg, fotomenu, lux, fetchJson, client: lux, enviar, enviarAi, reagir, reply, enviarImg, enviarImg2, enviarGif, enviarGif2, enviarVd, enviarVd2, enviarAd, enviarAd2, data, hora, esperar, selo, info, args, q, sender, from, groupMembers, numeroBot, dono, menc, pushname, isDono, isAdm, Dispositivo, isPremium, infoUser, registrarUsuario1, infoUser1, modificarsaldo, registrarAposta, modificarUsuario, carregarDadosUsuarios, latensi, uptimeBot: formatTime(process.uptime()), ModificaGrupo, ArquivosDosGrupos, catBoxUpload, fetchJson, getBuffer, sendImageAsSticker, sendVideoAsSticker, sendImageAsSticker2, sendVideoAsSticker2, getFileBuffer
});

} else {
lux.sendMessage(from, { text: `- *Não funcionou...*\nToque *${prefix}menu* e veja oq funciona ae bundao*` }, { quoted: selo });
}
}
} catch (e) {
console.log(e);
}
});

//=======ATT CONEXÃO========\\
lux.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update;

if (connection === 'open') {
console.log(chalk.bgGreen.white.bold(" VÍNCULO SELADO ") + chalk.green(" - O pacto com o WhatsApp foi firmado...")
);
console.log(chalk.bgBlack.greenBright.bold(" ONLINE ") + chalk.green(" - As trevas despertaram, o bot está ativo."));
console.log(chalk.red('\n═══════════════════════════════════════════════════════'));
 console.log(chalk.bgRed.white(' LOG DE MENSAGENS RECEBIDAS'));
 console.log(chalk.red('═══════════════════════════════════════════════════════\n'));
} 

else if (connection === 'connecting') {
console.log(chalk.bgMagenta.white.bold(" INVOCAÇÃO ") + chalk.magenta(" - Estabelecendo conexão com o plano WhatsApp..."));
console.log(chalk.bgBlack.magentaBright.bold(" PROCESSO ") + chalk.magenta(" - As sombras estão se alinhando..."));
} 

else if (connection === 'close') {
const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

if (shouldReconnect) {
console.log(chalk.bgYellow.black.bold(" QUEDA TEMPORÁRIA ") + chalk.yellow(" - O elo foi quebrado... tentando restaurar a conexão."));
ligarbot(); // Reinvoca o bot
} else {
console.log(chalk.bgRed.white.bold(" ❌ DESCONECTADO ") + chalk.red(" - O vínculo foi perdido permanentemente... encerrando a sessão.") );
}
}
});
}
ligarbot()

//========ATT INDEX========\\
fs.watchFile(__filename, (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
console.log(chalk.bgYellow.white.bold(" LOG ") + chalk.yellow(" - Reiniciando serviços....."));
process.exit()
}
})

//===========FIM=========\\
