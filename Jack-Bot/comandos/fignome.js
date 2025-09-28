const fs = require("fs");
const path = require("path");
const { prefix, botName } = require("../dono/config.json");

const stickerNamesFile = path.join(__dirname, "stickerNames.json");
let userStickerNames = {};
if (fs.existsSync(stickerNamesFile)) {
  try { userStickerNames = JSON.parse(fs.readFileSync(stickerNamesFile, "utf-8")); }
  catch(e) { console.log("Erro ao ler stickerNames.json:", e); }
}

function saveStickerNames() {
  fs.writeFileSync(stickerNamesFile, JSON.stringify(userStickerNames, null, 2));
}

module.exports = {
  nome: "fignome",
  descricao: "Define ou reseta o pack e autor das figurinhas",
  comandos: ["fignome"],
  uso: `${prefix}fignome NomeDoPack | NomeDoAutor (ou apenas /fignome resetar)`,

  handle: async ({ enviar, sender, q }) => {
    if (!q) return enviar("❌ Use /fignome NomeDoPack | NomeDoAutor ou /fignome resetar");

    const args = q.trim();
    if (args.toLowerCase() === "resetar") {
      delete userStickerNames[sender];
      saveStickerNames();
      return enviar(`✅ Pack e autor resetados para o padrão do bot!`);
    }

    if (!args.includes("|")) return enviar(`- *Formato incorreto! Use:* /fignome NomeDoPack | NomeDoAutor\n- Ou /fignome resetar`);

    const [pack, author] = args.split("|").map(x => x.trim());
    userStickerNames[sender] = { packname: pack, author: author };
    saveStickerNames();

    return enviar(`✅ Pack definido: *${pack}*\n✅ Autor definido: *${author}*`);
  }
};
