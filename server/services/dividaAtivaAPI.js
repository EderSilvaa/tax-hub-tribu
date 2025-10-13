/**
 * Serviço de Dívida Ativa da União
 * Consulta débitos inscritos na PGFN (Procuradoria-Geral da Fazenda Nacional)
 *
 * NOTA: Este é um MVP com dados simulados para demonstração.
 * Para produção, implementar com banco SQLite + CSV da PGFN.
 */

// Cache em memória
const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 60 * 24 * 90; // 90 dias

// Dados simulados para demonstração (substituir por banco SQLite em produção)
const DIVIDAS_SIMULADAS = {
  // Exemplo de empresa COM dívida
  '12345678000190': {
    tem_divida: true,
    nome_devedor: 'EMPRESA EXEMPLO COM DIVIDA LTDA',
    total_divida: 2500000.00,
    quantidade_dividas: 3,
    situacao: 'ATIVA',
    tipo_debito: 'INSS',
    data_inscricao: '2022-06-15',
    unidade_responsavel: 'RFB',
    detalhes: [
      { tipo: 'INSS', valor: 1500000, data: '2022-06-15' },
      { tipo: 'FGTS', valor: 800000, data: '2022-08-20' },
      { tipo: 'IR', valor: 200000, data: '2023-01-10' },
    ],
  },
};

// Estatísticas gerais da dívida ativa (dados aproximados 2024)
const ESTATISTICAS_GERAIS = {
  total_devedores: 15000000, // ~15 milhões
  total_dividas: 4500000000000, // R$ 4,5 trilhões
  valor_medio: 300000,
  ultima_atualizacao: '2024-Q4',
  fonte: 'PGFN - Dados Abertos (simulado)',
};

/**
 * Consultar se empresa/pessoa tem dívida ativa
 * @param {string} cnpj - CNPJ a consultar
 * @returns {Object} Informações da dívida
 */
export function consultarDividaAtiva(cnpj) {
  const cnpjLimpo = cnpj.replace(/\D/g, '');
  const cacheKey = `divida_ativa_${cnpjLimpo}`;

  // Verificar cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('📦 Dívida ativa cache hit:', cnpjLimpo);
    return cached.data;
  }

  console.log('🔍 Consultando dívida ativa:', cnpjLimpo);

  // Buscar em dados simulados
  const divida = DIVIDAS_SIMULADAS[cnpjLimpo];

  if (!divida) {
    const resultado = {
      tem_divida: false,
      situacao: 'REGULAR',
      cnpj: cnpjLimpo,
      mensagem: 'Empresa sem registro na Dívida Ativa da União',
      verificado_em: new Date().toISOString(),
    };

    cache.set(cacheKey, { data: resultado, timestamp: Date.now() });
    return resultado;
  }

  // Empresa COM dívida
  const resultado = {
    tem_divida: true,
    cnpj: cnpjLimpo,
    situacao: divida.situacao,
    nome_devedor: divida.nome_devedor,
    total_divida: divida.total_divida,
    quantidade_dividas: divida.quantidade_dividas,
    tipo_debito_principal: divida.tipo_debito,
    data_inscricao: divida.data_inscricao,
    unidade_responsavel: divida.unidade_responsavel,
    detalhes: divida.detalhes,
    alerta:
      divida.total_divida > 1000000
        ? '⚠️ Empresa consta na Lista de Grandes Devedores da PGFN (acima de R$ 1 milhão)'
        : '⚠️ Empresa possui pendências fiscais com a União',
    impedimentos: [
      'Impossibilidade de emitir Certidão Negativa de Débitos (CND)',
      'Bloqueio para participação em licitações públicas',
      'Restrição para obtenção de financiamentos governamentais',
      'Risco de protesto e inscrição em Serasa/SPC',
      'Possibilidade de penhora de bens e bloqueio de contas',
    ],
    verificado_em: new Date().toISOString(),
  };

  cache.set(cacheKey, { data: resultado, timestamp: Date.now() });
  return resultado;
}

/**
 * Obter estatísticas gerais da dívida ativa
 * @returns {Object} Estatísticas consolidadas
 */
export function obterEstatisticasDividaAtiva() {
  return {
    ...ESTATISTICAS_GERAIS,
    observacao:
      'Dados consolidados da Dívida Ativa da União. Inclui débitos de INSS, IR, FGTS e outros.',
  };
}

/**
 * Verificar se valor está acima do limite para Lista de Devedores
 * @param {number} valor - Valor da dívida
 * @returns {boolean} True se acima de R$ 1 milhão
 */
export function eGrandeDevedor(valor) {
  return valor >= 1000000;
}

/**
 * Formatar dados da dívida ativa para contexto RAG
 * @param {Object} dados - Dados da consulta de dívida
 * @returns {string} Texto formatado para o prompt
 */
export function formatarDividaAtivaParaRAG(dados) {
  if (!dados.tem_divida) {
    return `
🟢 SITUAÇÃO FISCAL - DÍVIDA ATIVA DA UNIÃO:
==================================
Status: REGULAR ✅
CNPJ: ${dados.cnpj}

✅ SEM PENDÊNCIAS:
- Não há registros na Dívida Ativa da União
- Empresa apta a emitir Certidão Negativa de Débitos (CND)
- Situação regular para licitações e financiamentos

Verificado em: ${new Date(dados.verificado_em).toLocaleDateString('pt-BR')}
Fonte: PGFN - Procuradoria-Geral da Fazenda Nacional
==================================
`;
  }

  const valorFormatado = dados.total_divida.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return `
🔴 ALERTA - DÍVIDA ATIVA DA UNIÃO:
==================================
Status: ${dados.situacao} ⚠️
CNPJ: ${dados.cnpj}
Devedor: ${dados.nome_devedor}

💰 DÉBITOS IDENTIFICADOS:
- Valor Total: ${valorFormatado}
- Quantidade de Débitos: ${dados.quantidade_dividas}
- Tipo Principal: ${dados.tipo_debito_principal}
- Data de Inscrição: ${new Date(dados.data_inscricao).toLocaleDateString('pt-BR')}
- Órgão Responsável: ${dados.unidade_responsavel}

${dados.alerta}

🚫 IMPEDIMENTOS FISCAIS:
${dados.impedimentos.map((imp) => `   • ${imp}`).join('\n')}

⚖️ DETALHAMENTO DOS DÉBITOS:
${dados.detalhes.map((d) => `   • ${d.tipo}: ${d.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} (${new Date(d.data).toLocaleDateString('pt-BR')})`).join('\n')}

💡 RECOMENDAÇÕES:
- Buscar regularização junto à Receita Federal/PGFN
- Avaliar possibilidade de parcelamento (REGULARIZE)
- Considerar transação tributária para redução de multas
- Priorizar quitação para restaurar situação regular

Verificado em: ${new Date(dados.verificado_em).toLocaleDateString('pt-BR')}
Fonte: PGFN - Procuradoria-Geral da Fazenda Nacional
==================================
`;
}

/**
 * Adicionar dívida simulada (para testes e demonstrações)
 * @param {string} cnpj - CNPJ
 * @param {Object} dadosDivida - Dados da dívida
 */
export function adicionarDividaSimulada(cnpj, dadosDivida) {
  const cnpjLimpo = cnpj.replace(/\D/g, '');
  DIVIDAS_SIMULADAS[cnpjLimpo] = dadosDivida;
  console.log('✅ Dívida simulada adicionada:', cnpjLimpo);
}

/**
 * Limpar cache de dívida ativa
 */
export function limparCacheDividaAtiva() {
  cache.clear();
  console.log('🧹 Cache de dívida ativa limpo');
}

/**
 * Obter instruções para implementação com banco de dados
 * @returns {string} Instruções
 */
export function obterInstrucoesImplementacao() {
  return `
📚 IMPLEMENTAÇÃO COM BANCO DE DADOS (Próximos Passos):

1. Download CSV da PGFN:
   https://www.gov.br/pgfn/pt-br/assuntos/divida-ativa-da-uniao/transparencia-fiscal-1/dados-abertos

2. Processar CSV e importar para SQLite:
   - Criar tabela: dividas_ativas
   - Indexar por CNPJ para busca rápida
   - Atualizar trimestralmente

3. Substituir dados simulados por consultas ao banco:
   const query = db.prepare('SELECT * FROM dividas_ativas WHERE cnpj = ?');
   const resultado = query.get(cnpjLimpo);

4. Implementar cron job para atualização automática:
   - Executar a cada trimestre (jan, abr, jul, out)
   - Download, processamento e substituição do banco

Arquivo de exemplo: server/scripts/processarDividaPGFN.js (já criado)
`;
}
