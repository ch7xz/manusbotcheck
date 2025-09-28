const { prefix, botName, emoji } = require("../dono/config.json");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const stickerNamesFile = path.join(__dirname, "stickerNames.json");
let userStickerNames = {};
if (fs.existsSync(stickerNamesFile)) {
  try { userStickerNames = JSON.parse(fs.readFileSync(stickerNamesFile, "utf-8")); }
  catch(e) { console.log("Erro ao ler stickerNames.json:", e); }
}

function saveStickerNames() {
  fs.writeFileSync(stickerNamesFile, JSON.stringify(userStickerNames, null, 2));
}

function defaultPackAuthor(pushname) {
  return {
    packname: `🤖 𝐁𝐨𝐭: ${botName}\n📲 𝐍𝐮́𝐦𝐞𝐫𝐨: secreto [0]`,
    author: `\n\n💌 𝐏𝐞𝐝𝐢𝐝𝐨 𝐝𝐞: ${pushname}\n🛠️ 𝐃𝐞𝐬𝐞𝐧𝐯: CharliinAmaVeronica`
  };
}

module.exports = {
  nome: "sticker",
  descricao: "Faz figurinha de imagem ou vídeo",
  comandos: ["s", "sticker", "f"],
  uso: `${prefix}s`,

  handle: async ({ enviar, sender, info, lux, from, pushname, q, sendImageAsSticker2, sendVideoAsSticker2, getFileBuffer, reagir }) => {

    const quoted = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const imageMsg = quoted?.imageMessage || info.message?.imageMessage || quoted?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage;
    const videoMsg = quoted?.videoMessage || info.message?.videoMessage || quoted?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage;

    if (!imageMsg && !videoMsg) return enviar(`- *Marque uma foto ou vídeo com ${prefix}s*`);

    let packname = userStickerNames[sender]?.packname || defaultPackAuthor(pushname).packname;
    let author = userStickerNames[sender]?.author || defaultPackAuthor(pushname).author;

    reagir("💭");

    if (imageMsg) {
      const buffer = await getFileBuffer(imageMsg, "image");
      const enc = await sendImageAsSticker2(lux, from, buffer, info, { packname, author });
      if (enc) fs.unlinkSync(enc);

    } else if (videoMsg) {
      const buffer = await getFileBuffer(videoMsg, "video");
      if (videoMsg.seconds > 10) {
        const tempInput = `./temp_video_${Date.now()}.mp4`;
        const tempOutput = `./temp_video_cortado_${Date.now()}.mp4`;
        fs.writeFileSync(tempInput, buffer);

        await new Promise((resolve, reject) => {
          ffmpeg(tempInput)
            .setStartTime(0)
            .setDuration(11)
            .output(tempOutput)
            .on("end", () => resolve(true))
            .on("error", e => reject(e))
            .run();
        });

        const newBuffer = fs.readFileSync(tempOutput);
        fs.unlinkSync(tempInput);
        fs.unlinkSync(tempOutput);

        const enc = await sendVideoAsSticker2(lux, from, newBuffer, info, { packname, author });
        if (enc) fs.unlinkSync(enc);
      } else {
        const enc = await sendVideoAsSticker2(lux, from, buffer, info, { packname, author });
        if (enc) fs.unlinkSync(enc);
      }
    }

    reagir(emoji);
  }
};
