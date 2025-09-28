const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "abri-gp",
  descricao: "Abrir um gp",
  comandos: ["abrir-gp", "abrirgp", "opengp"],
  uso: `${prefix}abrir-gp`,

handle: async ({ enviar, reagir, client, from}) => {
try {
reagir("🔓")
await client.groupSettingUpdate(from, "not_announcement");
await enviar("- *Grupo Aberto com sucesso 😃👌*")
} catch (e) {
console.error(e)
await enviar("Deu erro ao fechar o grupo, tente novamente mais tarde")
}
  },
};