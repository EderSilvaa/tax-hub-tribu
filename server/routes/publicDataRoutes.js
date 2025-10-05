import express from 'express';
import {
  consultarCNPJ,
  consultarIndiceBancoCentral,
  obterFaixasSimplesNacional,
  obterFeriadosNacionais,
  listarBancos,
  limparCache,
} from '../services/publicDataAPI.js';

const router = express.Router();

/**
 * @route GET /api/public-data/cnpj/:cnpj
 * @desc Consulta dados de CNPJ
 */
router.get('/cnpj/:cnpj', async (req, res) => {
  try {
    const { cnpj } = req.params;
    const dados = await consultarCNPJ(cnpj);
    res.json({ success: true, data: dados });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/public-data/indice/:codigo
 * @desc Consulta índice econômico (SELIC, IPCA, CDI, TJLP)
 */
router.get('/indice/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    const dados = await consultarIndiceBancoCentral(codigo.toUpperCase());

    if (!dados) {
      return res.status(404).json({
        success: false,
        error: 'Índice não encontrado ou indisponível',
      });
    }

    res.json({ success: true, data: dados });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/public-data/simples
 * @desc Retorna tabelas do Simples Nacional
 */
router.get('/simples', (req, res) => {
  try {
    const dados = obterFaixasSimplesNacional();
    res.json({ success: true, data: dados });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/public-data/feriados/:ano
 * @route GET /api/public-data/feriados
 * @desc Lista feriados nacionais
 */
router.get('/feriados/:ano', async (req, res) => {
  try {
    const ano = parseInt(req.params.ano);
    const dados = await obterFeriadosNacionais(ano);
    res.json({ success: true, data: dados, ano });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/feriados', async (req, res) => {
  try {
    const ano = new Date().getFullYear();
    const dados = await obterFeriadosNacionais(ano);
    res.json({ success: true, data: dados, ano });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/public-data/bancos
 * @desc Lista bancos brasileiros
 */
router.get('/bancos', async (req, res) => {
  try {
    const dados = await listarBancos();
    res.json({ success: true, data: dados, total: dados.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route POST /api/public-data/clear-cache
 * @desc Limpa o cache de dados públicos
 */
router.post('/clear-cache', (req, res) => {
  try {
    limparCache();
    res.json({ success: true, message: 'Cache limpo com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/public-data/info
 * @desc Informações sobre as APIs disponíveis
 */
router.get('/info', (req, res) => {
  res.json({
    success: true,
    apis_disponiveis: {
      cnpj: {
        endpoint: '/api/public-data/cnpj/:cnpj',
        descricao: 'Consulta dados de CNPJ via BrasilAPI',
        exemplo: '/api/public-data/cnpj/00000000000191',
        fonte: 'https://brasilapi.com.br',
      },
      indices_economicos: {
        endpoint: '/api/public-data/indice/:codigo',
        descricao: 'Consulta índices econômicos (SELIC, IPCA, CDI, TJLP)',
        exemplo: '/api/public-data/indice/SELIC',
        fonte: 'Banco Central do Brasil',
        codigos_disponiveis: ['SELIC', 'IPCA', 'CDI', 'TJLP'],
      },
      simples_nacional: {
        endpoint: '/api/public-data/simples',
        descricao: 'Tabelas e faixas do Simples Nacional 2024',
        exemplo: '/api/public-data/simples',
      },
      feriados: {
        endpoint: '/api/public-data/feriados/:ano?',
        descricao: 'Lista feriados nacionais',
        exemplo: '/api/public-data/feriados/2024',
        fonte: 'https://brasilapi.com.br',
      },
      bancos: {
        endpoint: '/api/public-data/bancos',
        descricao: 'Lista de bancos brasileiros',
        exemplo: '/api/public-data/bancos',
        fonte: 'https://brasilapi.com.br',
      },
    },
    cache: {
      cnpj: '24 horas',
      indices: '1 hora',
      bancos: '7 dias',
      simples: '24 horas',
    },
    observacoes: [
      'Todos os endpoints possuem cache para melhor performance',
      'Use POST /api/public-data/clear-cache para limpar o cache',
      'Dados são obtidos em tempo real de APIs governamentais',
    ],
  });
});

export default router;
