const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../../dono/config.json")

module.exports = {
  nome: "fechar-gp",
  descricao: "fechar um gp",
  comandos: ["fechar-gp", "fechargp", "closegp"],
  uso: `${prefix}fechar-gp`,

handle: async ({ enviar, reagir, client, from}) => {
try {
reagir("🔒")
await client.groupSettingUpdate(from, "announcement");
await enviar("- *Grupo Fechado com sucesso 😃👌*")
} catch (e) {
console.error(e)
await enviar("Deu erro ao fechar o grupo, tente novamente mais tarde")
}
  },
};