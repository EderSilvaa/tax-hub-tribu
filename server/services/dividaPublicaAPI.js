/**
 * Serviço de Dívida Pública Federal
 * Fornece dados consolidados da dívida pública brasileira
 * Fonte: Tesouro Nacional
 */

// Dados oficiais da Dívida Pública Federal (atualizado trimestralmente)
const DIVIDA_PUBLICA_FEDERAL = {
  ano: 2024,
  mes: 12,
  total: 7316000000000, // R$ 7,316 trilhões
  interna: 6967000000000, // R$ 6,967 trilhões (DPMFi)
  externa: 349190000000, // R$ 349,19 bilhões (DPFe)
  percentual_pib: 80.0,
  variacao_anual: 12.2, // % crescimento em 2024
  fonte: 'Tesouro Nacional',
  ultima_atualizacao: '2024-12-31',
};

// Composição da dívida por indexador (2024)
const COMPOSICAO_DIVIDA = {
  prefixados: 22.5, // %
  selic: 35.8, // %
  inflacao: 36.2, // %
  cambio: 5.5, // %
};

// Histórico simplificado (últimos 5 anos)
const HISTORICO_DIVIDA = [
  { ano: 2020, total: 5.0, percentual_pib: 75.3 },
  { ano: 2021, total: 5.5, percentual_pib: 76.8 },
  { ano: 2022, total: 6.0, percentual_pib: 73.5 },
  { ano: 2023, total: 6.52, percentual_pib: 74.4 },
  { ano: 2024, total: 7.316, percentual_pib: 80.0 },
];

/**
 * Obter dados consolidados da dívida pública federal
 * @returns {Object} Dados da dívida pública
 */
export function obterDividaPublicaFederal() {
  return {
    ...DIVIDA_PUBLICA_FEDERAL,
    composicao: COMPOSICAO_DIVIDA,
    historico: HISTORICO_DIVIDA,
  };
}

/**
 * Obter apenas valores principais (para cache leve)
 * @returns {Object} Valores principais
 */
export function obterDividaPublicaSimplificada() {
  return {
    total_trilhoes: (DIVIDA_PUBLICA_FEDERAL.total / 1000000000000).toFixed(3),
    interna_trilhoes: (DIVIDA_PUBLICA_FEDERAL.interna / 1000000000000).toFixed(3),
    externa_bilhoes: (DIVIDA_PUBLICA_FEDERAL.externa / 1000000000).toFixed(1),
    percentual_pib: DIVIDA_PUBLICA_FEDERAL.percentual_pib,
    ano: DIVIDA_PUBLICA_FEDERAL.ano,
  };
}

/**
 * Calcular custo estimado da dívida (baseado em SELIC)
 * @param {number} taxaSelic - Taxa SELIC atual (%)
 * @returns {Object} Estimativa de custo anual
 */
export function calcularCustoDivida(taxaSelic = 10.5) {
  const totalDivida = DIVIDA_PUBLICA_FEDERAL.total;
  const custoAnualEstimado = totalDivida * (taxaSelic / 100);

  return {
    custo_anual_estimado: custoAnualEstimado,
    custo_mensal_estimado: custoAnualEstimado / 12,
    percentual_selic: taxaSelic,
    observacao:
      'Estimativa simplificada. Considera apenas parcela indexada à SELIC (~36% da dívida)',
  };
}

/**
 * Formatar dados da dívida pública para contexto RAG
 * @param {Object} dados - Dados da dívida pública
 * @returns {string} Texto formatado para o prompt
 */
export function formatarDividaPublicaParaRAG(dados) {
  const totalTrilhoes = (dados.total / 1000000000000).toFixed(2);
  const internaTrilhoes = (dados.interna / 1000000000000).toFixed(2);
  const externaBilhoes = (dados.externa / 1000000000).toFixed(1);

  return `
📊 DÍVIDA PÚBLICA FEDERAL (${dados.ano}):
==================================
💰 Valor Total: R$ ${totalTrilhoes} trilhões
   - Interna (DPMFi): R$ ${internaTrilhoes} trilhões (${((dados.interna / dados.total) * 100).toFixed(1)}%)
   - Externa (DPFe): R$ ${externaBilhoes} bilhões (${((dados.externa / dados.total) * 100).toFixed(1)}%)

📈 Indicadores:
   - Percentual do PIB: ${dados.percentual_pib}%
   - Variação em ${dados.ano}: +${dados.variacao_anual}%
   - Última atualização: ${dados.ultima_atualizacao}

📋 Composição por Indexador:
   - Prefixados: ${dados.composicao.prefixados}%
   - Indexados à Selic: ${dados.composicao.selic}%
   - Indexados à Inflação: ${dados.composicao.inflacao}%
   - Indexados ao Câmbio: ${dados.composicao.cambio}%

Fonte: ${dados.fonte}
==================================
`;
}

/**
 * Análise de impacto da dívida
 * @returns {Object} Análise contextual
 */
export function analisarImpactoDivida() {
  const percentualPIB = DIVIDA_PUBLICA_FEDERAL.percentual_pib;

  let nivel_alerta = 'MODERADO';
  let mensagem = '';

  if (percentualPIB > 90) {
    nivel_alerta = 'CRÍTICO';
    mensagem =
      'Dívida em nível crítico. Impacta fortemente a capacidade de investimento público.';
  } else if (percentualPIB > 80) {
    nivel_alerta = 'ALTO';
    mensagem =
      'Dívida em nível alto. Requer atenção para sustentabilidade fiscal.';
  } else if (percentualPIB > 60) {
    nivel_alerta = 'MODERADO';
    mensagem = 'Dívida em nível moderado, dentro da média de economias emergentes.';
  } else {
    nivel_alerta = 'BAIXO';
    mensagem = 'Dívida em nível controlado.';
  }

  return {
    nivel_alerta,
    percentual_pib: percentualPIB,
    mensagem,
    impactos: [
      'Custo de juros consome parte significativa do orçamento federal',
      'Taxa de juros alta para controlar inflação e atrair investidores',
      'Menor espaço fiscal para investimentos em infraestrutura',
      'Pressão por equilíbrio fiscal pode resultar em aumento de tributos',
    ],
  };
}

/**
 * Comparação com histórico
 * @returns {Object} Análise de tendência
 */
export function analisarTendencia() {
  const ultimo = HISTORICO_DIVIDA[HISTORICO_DIVIDA.length - 1];
  const anterior = HISTORICO_DIVIDA[HISTORICO_DIVIDA.length - 2];

  const crescimentoValor = ((ultimo.total - anterior.total) / anterior.total) * 100;
  const crescimentoPIB = ultimo.percentual_pib - anterior.percentual_pib;

  return {
    tendencia: crescimentoValor > 0 ? 'CRESCENTE' : 'DECRESCENTE',
    crescimento_anual_percentual: crescimentoValor.toFixed(1),
    variacao_pib_percentual: crescimentoPIB.toFixed(1),
    observacao:
      crescimentoValor > 10
        ? 'Crescimento acelerado da dívida requer atenção'
        : 'Crescimento dentro do esperado para economias emergentes',
  };
}

/**
 * Limpar cache (função placeholder para consistência)
 */
export function limparCacheDividaPublica() {
  console.log('ℹ️ Dívida pública usa dados estáticos, sem cache para limpar');
}
