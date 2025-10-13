import express from 'express';
import {
  obterDividaPublicaFederal,
  obterDividaPublicaSimplificada,
  calcularCustoDivida,
  analisarImpactoDivida,
  analisarTendencia,
} from '../services/dividaPublicaAPI.js';
import {
  consultarDividaAtiva,
  obterEstatisticasDividaAtiva,
  eGrandeDevedor,
  obterInstrucoesImplementacao,
} from '../services/dividaAtivaAPI.js';

const router = express.Router();

// ======================
// DÍVIDA PÚBLICA FEDERAL
// ======================

/**
 * @route GET /api/dividas/publica
 * @desc Retorna dados completos da dívida pública federal
 */
router.get('/publica', (req, res) => {
  try {
    const dados = obterDividaPublicaFederal();
    res.json({ success: true, data: dados });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/dividas/publica/resumo
 * @desc Retorna resumo simplificado da dívida pública
 */
router.get('/publica/resumo', (req, res) => {
  try {
    const dados = obterDividaPublicaSimplificada();
    res.json({ success: true, data: dados });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/dividas/publica/custo
 * @desc Calcula custo estimado da dívida com base na SELIC
 * @query {number} selic - Taxa SELIC (opcional, padrão: 10.5)
 */
router.get('/publica/custo', (req, res) => {
  try {
    const selic = parseFloat(req.query.selic) || 10.5;
    const custo = calcularCustoDivida(selic);
    res.json({ success: true, data: custo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/dividas/publica/impacto
 * @desc Análise de impacto da dívida pública
 */
router.get('/publica/impacto', (req, res) => {
  try {
    const analise = analisarImpactoDivida();
    res.json({ success: true, data: analise });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/dividas/publica/tendencia
 * @desc Análise de tendência da dívida (histórico)
 */
router.get('/publica/tendencia', (req, res) => {
  try {
    const tendencia = analisarTendencia();
    res.json({ success: true, data: tendencia });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================
// DÍVIDA ATIVA
// ==================

/**
 * @route GET /api/dividas/ativa/:cnpj
 * @desc Consulta se empresa/pessoa tem dívida ativa com a União
 * @param {string} cnpj - CNPJ ou CPF
 */
router.get('/ativa/:cnpj', (req, res) => {
  try {
    const { cnpj } = req.params;
    const resultado = consultarDividaAtiva(cnpj);
    res.json({ success: true, data: resultado });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/dividas/ativa/estatisticas
 * @desc Estatísticas gerais da dívida ativa
 */
router.get('/ativa/estatisticas/geral', (req, res) => {
  try {
    const stats = obterEstatisticasDividaAtiva();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route POST /api/dividas/ativa/verificar-valor
 * @desc Verifica se valor caracteriza grande devedor (>R$ 1mi)
 * @body {number} valor - Valor da dívida
 */
router.post('/ativa/verificar-valor', (req, res) => {
  try {
    const { valor } = req.body;
    if (!valor || typeof valor !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Valor inválido. Forneça um número.',
      });
    }

    const grandeDevedor = eGrandeDevedor(valor);
    res.json({
      success: true,
      data: {
        valor,
        e_grande_devedor: grandeDevedor,
        limite: 1000000,
        mensagem: grandeDevedor
          ? 'Valor acima de R$ 1 milhão - Consta na Lista de Grandes Devedores'
          : 'Valor abaixo do limite de R$ 1 milhão',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/dividas/ativa/implementacao
 * @desc Instruções para implementação completa com banco de dados
 */
router.get('/ativa/implementacao', (req, res) => {
  try {
    const instrucoes = obterInstrucoesImplementacao();
    res.json({
      success: true,
      data: {
        tipo: 'MVP',
        mensagem:
          'Atualmente usando dados simulados. Para produção, seguir instruções abaixo.',
        instrucoes,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================
// INFO GERAL
// ==================

/**
 * @route GET /api/dividas/info
 * @desc Informações sobre as APIs de dívidas disponíveis
 */
router.get('/info', (req, res) => {
  res.json({
    success: true,
    apis_disponiveis: {
      divida_publica: {
        descricao: 'Dívida Pública Federal (União)',
        endpoints: [
          'GET /api/dividas/publica - Dados completos',
          'GET /api/dividas/publica/resumo - Resumo simplificado',
          'GET /api/dividas/publica/custo?selic=10.5 - Custo estimado',
          'GET /api/dividas/publica/impacto - Análise de impacto',
          'GET /api/dividas/publica/tendencia - Tendência histórica',
        ],
        fonte: 'Tesouro Nacional',
        atualizacao: 'Trimestral (manual)',
      },
      divida_ativa: {
        descricao: 'Dívida Ativa da União (PGFN)',
        endpoints: [
          'GET /api/dividas/ativa/:cnpj - Consultar por CNPJ/CPF',
          'GET /api/dividas/ativa/estatisticas/geral - Estatísticas gerais',
          'POST /api/dividas/ativa/verificar-valor - Verificar se é grande devedor',
          'GET /api/dividas/ativa/implementacao - Instruções implementação completa',
        ],
        fonte: 'PGFN - Procuradoria-Geral da Fazenda Nacional',
        status: 'MVP com dados simulados',
        observacao:
          'Para produção: implementar com SQLite + CSV trimestral da PGFN',
      },
    },
    integracao_taxia: {
      automatica: true,
      descricao:
        'Dados são incluídos automaticamente no contexto quando relevante',
      triggers: [
        'CNPJ mencionado → Consulta dívida ativa automaticamente',
        '"dívida pública" → Adiciona contexto macroeconômico',
        '"dívida ativa" → Informa sobre sistema de consulta',
      ],
    },
  });
});

export default router;
