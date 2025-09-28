// index.js - versão corrigida e mais segura
// Créditos originais: charliin. Ajustes por você/assistente.

const express = require('express');
const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const request = require('request');
const yts = require('yt-search'); // já no package.json

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const criador = "Pedrozz"; // mantenha conforme quiser
const DB_DIR = path.join(__dirname, 'database');
const KEY_FILE = path.join(DB_DIR, 'apikeys.json');

// --- Helpers ---
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

// garante arquivo de apikeys existe
if (!fs.existsSync(KEY_FILE)) {
  const defaultKeys = { "demo-key": { request: 0, limit: 1000 } };
  fs.writeFileSync(KEY_FILE, JSON.stringify(defaultKeys, null, 2));
}

function LerDadosApikey() {
  try {
    const raw = fs.readFileSync(KEY_FILE, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (e) {
    console.error('Erro lendo apikeys.json:', e);
    return {};
  }
}

// diminui request / checa limite básico
function diminuirRequest(apikey) {
  if (!apikey) return { status: false, criador, error: 'Missing apikey' };
  const data = LerDadosApikey();
  if (!data[apikey]) return { status: false, criador, error: 'API Key inválida' };
  // Exemplo simples: aumentar contador
  data[apikey].request = (data[apikey].request || 0) + 1;
  fs.writeFileSync(KEY_FILE, JSON.stringify(data, null, 2));
  // retorno false significa que pode continuar
  return false;
}

// valida que um objeto "media" tem url http/https
function assertValidMedia(media) {
  if (!media) return { ok: false, error: 'Media ausente' };
  const url = media.url || media.link || media.src || media.source;
  if (!url) return { ok: false, error: 'Nenhuma URL disponível na media' };
  if (typeof url !== 'string') return { ok: false, error: 'URL inválida' };
  if (!(url.startsWith('http://') || url.startsWith('https://'))) {
    return { ok: false, error: 'URL deve começar com http:// ou https://' };
  }
  return { ok: true, url };
}

// --- Rotas simples ---
app.get('/', (req, res) => {
  res.json({ status: true, message: 'Base API ativa', criador });
});

app.get('/api/health', (req, res) => {
  res.json({ status: true, uptime: process.uptime() });
});

// Verificar apikey
app.get('/api/apikey/verificar', (req, res) => {
  const key = req.query.apikey;
  const data = LerDadosApikey();
  if (!key) return res.status(400).json({ error: 'Falta query param apikey' });
  if (!data[key]) return res.status(404).json({ error: 'API Key inválida' });
  res.json({ key, request: data[key].request, limit: data[key].limit || null });
});

/**
 * Exemplo de rota que procura vídeo no YouTube e retorna metadata mínima
 * (NOTA: link retornado é a página do vídeo — para obter um arquivo de mídia real
 * você deve integrar um downloader ou serviço que gere um arquivo/URL direto).
 */
app.get('/api/download/ytsearch', async (req, res) => {
  const apikey = req.query.apikey;
  const q = req.query.q || req.query.nome;
  const infoErro = diminuirRequest(apikey);
  if (infoErro) return res.json(infoErro);
  if (!q) return res.status(400).json({ status: false, criador, error: "Falta o parâmetro q/nome na query" });

  try {
    const r = await yts(q);
    const v = (r && r.videos && r.videos.length) ? r.videos[0] : null;
    if (!v) return res.json({ status: false, criador, error: 'Nenhum vídeo encontrado' });

    // Construímos um objeto de resposta consistente
    const media = {
      title: v.title,
      duration: v.timestamp,
      source: v.url,       // página do vídeo (não é arquivo direto)
      thumbnail: v.image,
      author: v.author ? v.author.name : null
    };

    // Validamos antes de enviar (evita undefined.url)
    const check = assertValidMedia({ url: media.source });
    if (!check.ok) return res.json({ status: false, criador, error: check.error });

    return res.json({ status: true, criador, data: media });
  } catch (e) {
    console.error('erro /ytsearch:', e);
    return res.status(500).json({ status: false, criador, error: 'Erro interno ao buscar vídeo' });
  }
});

/**
 * Rota genérica de download - placeholder.
 * Substitua a implementação interna (fetchDoScraper) pelas funções reais que você tem.
 */
async function fetchDoScraper(name, tipo) {
  // Exemplo: se tipo === 'ytmp3' você deve chamar o seu serviço real que retorna { url: 'http...' }
  // Aqui fazemos fallback simples: procurar no YouTube e retornar a página do vídeo (não o arquivo mp3).
  if (!name) throw new Error('Nome vazio');
  const r = await yts(name);
  const v = r && r.videos && r.videos[0];
  if (!v) return null;
  return { url: v.url, title: v.title, thumb: v.image };
}

app.get('/api/download/:tipo', async (req, res) => {
  const apikey = req.query.apikey;
  const tipo = req.params.tipo;
  const q = req.query.q || req.query.nome || req.query.url || req.query.query;
  const infoErro = diminuirRequest(apikey);
  if (infoErro) return res.json(infoErro);
  if (!q) return res.status(400).json({ status: false, criador, error: "Falta o parâmetro q/nome/url na query" });

  try {
    const result = await fetchDoScraper(q, tipo);
    if (!result) return res.json({ status: false, criador, error: 'Nenhum resultado do scraper' });

    // validação final que evita undefined.url
    const check = assertValidMedia(result);
    if (!check.ok) return res.json({ status: false, criador, error: check.error });

    // Retorna um formato padronizado
    return res.json({
      status: true,
      criador,
      tipo,
      data: {
        url: check.url,
        title: result.title || null,
        thumb: result.thumb || null
      }
    });
  } catch (e) {
    console.error('/api/download/:tipo erro ->', e);
    return res.status(500).json({ status: false, criador, error: "Deu erro na sua solicitação, fale com o criador para suporte" });
  }
});

// rota catch-all
app.use((req, res) => {
  res.status(404).json({ status: false, criador, error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT} - porta ${PORT}`);
});
