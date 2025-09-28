const { prefix, botName, donoName, DarkApikey, DarkUrl, emoji } = require("../dono/config.json")
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

// Arquivo onde vamos salvar os nomes personalizados
const stickerNamesFile = path.join(__dirname, "stickerNames.json");

// Função para carregar os nomes personalizados do arquivo
let userStickerNames = {};
if (fs.existsSync(stickerNamesFile)) {
  try {
    userStickerNames = JSON.parse(fs.readFileSync(stickerNamesFile, "utf-8"));
  } catch (e) {
    console.log("Erro ao ler stickerNames.json:", e);
  }
}

// Função para salvar os nomes personalizados no arquivo
function saveStickerNames() {
  fs.writeFileSync(stickerNamesFile, JSON.stringify(userStickerNames, null, 2));
}

module.exports = {
  nome: "sticker",
  descricao: "Faz uma Figurinha de uma imagem, gif e video",
  comandos: ["s", "sticker", "f"],
  uso: `${prefix}s`,

  handle: async ({ enviar, sender, info, lux, from, pushname, q, sendImageAsSticker2, sendVideoAsSticker2, getFileBuffer, reagir}) => {
    
    var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    var boij2 = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage;
    var boij = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage;

    const numeroBot = lux.user.id.split(":")[0]+"@s.whatsapp.net";

    // Usar nome personalizado se existir, senão mantém o comportamento original
    let packin = userStickerNames[sender]?.packname || (q ? `🕷️ 𝐏𝐚𝐜𝐨𝐭𝐞: ‘${q.split("/")[0].trim()}’` : `🤖 𝐁𝐨𝐭: ${botName}\n📲 𝐍𝐮́𝐦𝐞𝐫𝐨: secreto [0]`);
    let author23 = userStickerNames[sender]?.author || (q ? (q.split("/")[1] ? `🎨 𝐂𝐫𝐢𝐚𝐝𝐨 𝐩𝐨𝐫: ${q.split("/")[1].trim()}` : `🎭 𝐀𝐮𝐭𝐨𝐫: 𝐃𝐞𝐬𝐜𝐨𝐧𝐡𝐞𝐜𝐢𝐝𝐨`) : `\n\n💌 𝐏𝐞𝐝𝐢𝐝𝐨 𝐝𝐞: ${pushname}\n🛠️ 𝐃𝐞𝐬𝐞𝐧𝐯: CharliinAmaVeronica`);

    if(boij2){
      reagir('💭')
      enviar('- *Eu, Charliin Tralha, atenderei ao seu pedido com obediência e diligência, mesmo que isso signifique mergulhar mais fundo nas sombras.*')
      let owgi = await getFileBuffer(boij2, 'image')
      let encmediaa = await sendImageAsSticker2(lux, from, owgi, info, { packname:packin, author:author23})
      await fs.unlinkSync(encmediaa)
    
    } else if(boij){
      let owgi = await getFileBuffer(boij, 'video')

      // Se vídeo > 10 segundos, corta para 11
      if(boij.seconds > 10){
        const tempInput = `./temp_video_${Date.now()}.mp4`;
        const tempOutput = `./temp_video_cortado_${Date.now()}.mp4`;
        fs.writeFileSync(tempInput, owgi);

        await new Promise((resolve, reject) => {
          ffmpeg(tempInput)
            .setStartTime(0)
            .setDuration(11)
            .output(tempOutput)
            .on('end', () => resolve(true))
            .on('error', err => reject(err))
            .run();
        });

        owgi = fs.readFileSync(tempOutput);
        fs.unlinkSync(tempInput);
        fs.unlinkSync(tempOutput);
      }

      let encmedia = await sendVideoAsSticker2(lux, from, owgi, info, { packname:packin, author:author23})
      await fs.unlinkSync(encmedia)
      reagir(emoji)
    
    } else {
      return enviar(`- *Marque uma foto ou o vídeo para fazer sua figurinha com o comando: ${prefix}s*`)
    }
  },
};

// Comando separado para trocar o nome do sticker
module.exports.nomeSticker = {
  nome: "fignome",
  descricao: "Define o nome do pack e autor das figurinhas",
  comandos: ["fignome"],
  uso: "${prefix}fignome NomeDoPack | NomeDoAutor",
  handle: async ({ enviar, sender, q }) => {
    if(!q || !q.includes("|")) {
      return enviar("- *Formato incorreto! Use:* /fignome NomeDoPack | NomeDoAutor");
    }

    const [pack, author] = q.split("|").map(x => x.trim());
    userStickerNames[sender] = { packname: pack, author: author };
    saveStickerNames();
    return enviar(`✅ Nome do pack definido como: *${pack}*\n✅ Nome do autor definido como: *${author}*`);
  }
};
