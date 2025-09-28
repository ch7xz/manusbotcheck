module.exports = {
  nome: "toimg",
  descricao: "Converte figurinha em foto",
  comandos: ["toimg"],
  uso: "/toimg (responda uma figurinha)",

  handle: async ({ enviar, info, getFileBuffer, lux, from }) => {
    try {
      const RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
      const stickerMsg = RSM?.stickerMessage
      if (!stickerMsg) return enviar("- *Responda a uma figurinha para converter!*")

      const buffer = await getFileBuffer(stickerMsg, "sticker")
      await lux.sendMessage(from, { image: buffer }, { quoted: info })
    } catch (e) {
      console.error(e)
      return enviar("❌ Erro ao converter figurinha em foto.")
    }
  }
}
