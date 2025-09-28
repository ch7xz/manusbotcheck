//=========CRÉDITOS=============\\
/*
CRÉDITOS: veronica linda
eu amo veronica, mais do que palavras possam dizer
você é o motivo do meu viver.
charliin te ama até morrer.
Verônica França de Caralho Barbosa Leitche Dantas ❤
*/
const fs = require('fs');

const UserFile = "./lux/json/user.json";

function registrarUsuario1(sender, nome, saldo, vip, bio, foto) {
let userData = carregarDadosUsuario();
userData[sender] = {
nome,
foto,
bio,
saldo,
vip,
banido: false,
mensagemEnviada: 0,
figurinhaEnviada: 0,
comandosUsados: 0
};
salvarUsuario(userData);
}

function infoUser1(sender) {
let userData = carregarDadosUsuario();
return userData[sender] || null;
}

function modificarsaldo(sender, quantidade) {
let userData = carregarDadosUsuario();
if (userData[sender]) {
userData[sender].saldo = parseInt(userData[sender].saldo) + parseInt(quantidade);
salvarUsuario(userData);
}
}

function modificarUsuario(sender, valor, tipo) {
let userData = carregarDadosUsuario();
if (userData[sender]) {
if (tipo === 'saldo') {
userData[sender].saldo = (parseInt(userData[sender].saldo) + parseInt(valor)).toString();
} else {
userData[sender][tipo] = valor;
}
salvarUsuario(userData);
}
}



function registrarAposta(sender, resultado) {
let userData = carregarDadosUsuario();
if (userData[sender]) {
if (resultado === 'Ganhou') {
userData[sender].ganhou += 1;
} else if (resultado === 'Perdeu') {
userData[sender].perdeu += 1;
}
salvarUsuario(userData);
}
}

function carregarDadosUsuario() {
if (fs.existsSync(UserFile)) {
try {
return JSON.parse(fs.readFileSync(UserFile, 'utf8'));
} catch (error) {
console.error('Erro ao carregar os dados de aposta:', error);
return {};
}
} else {
return {};
}
}

function carregarDadosUsuarios() {
if (fs.existsSync(UserFile)) {
const data = fs.readFileSync(UserFile);
return JSON.parse(data);
}
return {};
}


function salvarUsuario(data) {
try {
fs.writeFileSync(UserFile, JSON.stringify(data, null, 2));
} catch (error) {
console.error('Erro ao salvar os dados de aposta:', error);
}
}

module.exports = {
registrarUsuario1,
infoUser1,
modificarsaldo,
registrarAposta,
modificarUsuario,
carregarDadosUsuarios
};

//ATUALIZAÇÕES 
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Eii você ja ta mexendo?😑\nAs Alterações foram salvas - '${__filename}'`)
delete require.cache[file]
require(file)
})