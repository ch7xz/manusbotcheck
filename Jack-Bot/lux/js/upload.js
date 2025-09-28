//=========CRÉDITOS=============\\
/*
veronica linda
eu amo veronica, mais do que palavras possam dizer
você é o motivo do meu viver.
charliin te ama até morrer.
Verônica França de Caralho Barbosa Leitche Dantas ❤

*/
const { Catbox } = require("node-catbox");
const fs = require("fs");
const path = require("path");

const getRandomName = (extension) => {
function getRandomNumber(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const fileName = `arquivoTemporario_${getRandomNumber(0, 999999)}`;
if (!extension) { return fileName.toString(); }return `${fileName}.${extension}`;};

exports.catBoxUpload = async (buffer, type) => {
const catBox = new Catbox();
const tempPath = path.resolve("./lux", getRandomName(type));
fs.writeFileSync(tempPath, buffer);
try {
const response = await catBox.uploadFile({
path: tempPath,
});

setTimeout(() => {
if (fs.existsSync(tempPath)) {
fs.unlinkSync(tempPath);
} }, 1000 * 60 * 5);

return response;
} catch (error) {
console.error("Erro ao fazer upload para o CatBox:", error);
return null;
}
};
