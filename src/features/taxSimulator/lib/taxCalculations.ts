/**
 * Tax Calculations - Calculadoras por Regime Tributário
 *
 * Implementa cálculos precisos para todos os regimes tributários brasileiros
 * Seguindo o design system TaxHub e usando dados oficiais 2024
 */

import {
  CompanyData,
  TaxCalculationResult,
  TaxBreakdown,
  TaxRegime,
  ActivityType,
  BusinessSector,
  TaxCalculationError
} from './types';

import {
  getSimplesBracketByRevenue,
  getLucroPresumidoRates,
  getMEIRates,
  calculateSimplesAliquota,
  calculateIRPJAdditional,
  LUCRO_REAL_RATES,
  ANEXO_MAPPING
} from './taxTables';

import {
  isEligibleForRegime,
  getEligibilityReason,
  calculateEffectiveRate
} from './utils';

// ==================== SIMPLES NACIONAL CALCULATION ====================

export function calculateSimplesNacional(data: CompanyData): TaxCalculationResult {
  const regime = TaxRegime.SIMPLES_NACIONAL;

  // Verificar elegibilidade
  const elegivel = isEligibleForRegime(data, regime);
  const motivoInelegibilidade = elegivel ? undefined : getEligibilityReason(data, regime);

  // Se não elegível, retornar resultado básico
  if (!elegivel) {
    return {
      regime,
      impostos: {
        total: 0,
        aliquotaEfetiva: 0
      },
      vantagens: [],
      desvantagens: [],
      limitacoes: [],
      elegivel: false,
      motivoInelegibilidade,
      recomendado: false,
      scoreRecomendacao: 0,
      calculadoEm: new Date()
    };
  }

  // Buscar bracket correto
  const bracket = getSimplesBracketByRevenue(data.faturamentoAnual, data.setor);

  if (!bracket) {
    throw new TaxCalculationError(
      'Não foi possível encontrar bracket para o Simples Nacional',
      'BRACKET_NOT_FOUND',
      { revenue: data.faturamentoAnual, setor: data.setor }
    );
  }

  // Calcular alíquota efetiva (progressiva)
  const aliquotaEfetiva = calculateSimplesAliquota(data.faturamentoAnual, data.setor) / 100;
  const valorTotal = data.faturamentoAnual * aliquotaEfetiva;

  // Breakdown detalhado dos impostos
  const breakdown: TaxBreakdown = {
    simplesNacional: valorTotal,
    total: valorTotal,
    aliquotaEfetiva
  };

  // Vantagens e desvantagens
  const vantagens = [
    'Regime tributário unificado',
    'Menos obrigações acessórias',
    'Alíquotas progressivas',
    'Facilidade na apuração',
    'Redução da carga tributária'
  ];

  const desvantagens = [
    'Limite de faturamento R$ 4,8 milhões/ano',
    'Restrições para algumas atividades',
    'Vedação a alguns benefícios fiscais',
    'Limitações para participação societária'
  ];

  const limitacoes = [
    `Faturamento máximo: R$ 4.800.000/ano`,
    'Não pode ter participação em outras empresas',
    'Atividades financeiras proibidas',
    'Número limitado de funcionários por atividade'
  ];

  // Score de recomendação baseado na economia potencial
  let scoreRecomendacao = 75; // Base score para Simples

  // Ajustes baseados no faturamento
  if (data.faturamentoAnual <= 360000) scoreRecomendacao += 15; // Primeiras faixas
  if (data.faturamentoAnual >= 3600000) scoreRecomendacao -= 10; // Faixas altas

  // Ajustes por setor
  if (data.setor === BusinessSector.COMERCIO) scoreRecomendacao += 5;
  if (data.setor === BusinessSector.SERVICOS_ANEXO_V) scoreRecomendacao -= 15; // Anexo V tem alíquotas altas

  return {
    regime,
    impostos: breakdown,
    vantagens,
    desvantagens,
    limitacoes,
    elegivel: true,
    recomendado: scoreRecomendacao >= 70,
    scoreRecomendacao: Math.min(100, Math.max(0, scoreRecomendacao)),
    calculadoEm: new Date()
  };
}

// ==================== LUCRO PRESUMIDO CALCULATION ====================

export function calculateLucroPresumido(data: CompanyData): TaxCalculationResult {
  const regime = TaxRegime.LUCRO_PRESUMIDO;

  // Verificar elegibilidade
  const elegivel = isEligibleForRegime(data, regime);
  const motivoInelegibilidade = elegivel ? undefined : getEligibilityReason(data, regime);

  if (!elegivel) {
    return {
      regime,
      impostos: {
        total: 0,
        aliquotaEfetiva: 0
      },
      vantagens: [],
      desvantagens: [],
      limitacoes: [],
      elegivel: false,
      motivoInelegibilidade,
      recomendado: false,
      scoreRecomendacao: 0,
      calculadoEm: new Date()
    };
  }

  // Buscar rates da atividade
  const rates = getLucroPresumidoRates(data.atividade);

  if (!rates) {
    throw new TaxCalculationError(
      'Rates não encontrados para a atividade no Lucro Presumido',
      'RATES_NOT_FOUND',
      { atividade: data.atividade }
    );
  }

  // Calcular base de cálculo presumida
  const baseIRPJ = data.faturamentoAnual * rates.marginIRPJ;
  const baseCSLL = data.faturamentoAnual * rates.marginCSLL;

  // Calcular IRPJ
  const irpjBasico = baseIRPJ * rates.aliquotaIRPJ;
  const irpjAdicional = calculateIRPJAdditional(baseIRPJ / 12, irpjBasico); // Mensal
  const irpjTotal = irpjBasico + (irpjAdicional * 12); // Anual

  // Calcular CSLL
  const csll = baseCSLL * rates.aliquotaCSLL;

  // Calcular PIS/COFINS sobre faturamento
  const pis = data.faturamentoAnual * rates.aliquotaPIS;
  const cofins = data.faturamentoAnual * rates.aliquotaCOFINS;

  // ICMS e ISS (estimativa básica - varia por estado/município)
  let icms = 0;
  let iss = 0;

  if (data.setor === BusinessSector.COMERCIO || data.setor === BusinessSector.INDUSTRIA) {
    icms = data.faturamentoAnual * 0.18; // 18% média
  }

  if ([BusinessSector.SERVICOS, BusinessSector.SERVICOS_ANEXO_IV, BusinessSector.SERVICOS_ANEXO_V].includes(data.setor)) {
    iss = data.faturamentoAnual * 0.05; // 5% média
  }

  const total = irpjTotal + csll + pis + cofins + icms + iss;
  const aliquotaEfetiva = calculateEffectiveRate(total, data.faturamentoAnual);

  const breakdown: TaxBreakdown = {
    irpj: irpjTotal,
    csll,
    pis,
    cofins,
    icms: icms > 0 ? icms : undefined,
    iss: iss > 0 ? iss : undefined,
    total,
    aliquotaEfetiva
  };

  // Vantagens conforme PDF
  const vantagens = [
    'Simplicidade na apuração dos tributos',
    'Margem de lucro presumida fixa por atividade',
    'Previsibilidade da carga tributária',
    'Menor número de obrigações acessórias',
    'Adequado para empresas com margem igual ou superior à presumida',
    'Facilidade no planejamento tributário',
    'Menores custos de compliance'
  ];

  // Desvantagens conforme PDF
  const desvantagens = [
    'Tributação independe do lucro efetivo da empresa',
    'Margem presumida pode ser superior ao lucro real',
    'PIS/COFINS no regime cumulativo (sem direito a créditos)',
    'Não permite compensação de prejuízos fiscais',
    'Base de cálculo fixa mesmo em caso de prejuízo',
    'Limitações para dedução de despesas'
  ];

  // Limitações conforme PDF
  const limitacoes = [
    'Faturamento máximo: R$ 78 milhões/ano',
    'Margem de lucro presumida fixa conforme atividade',
    'Vedado para algumas atividades específicas',
    'Não permite redução da base de cálculo IRPJ/CSLL',
    'PIS/COFINS no regime cumulativo (alíquotas menores)',
    'Obrigatório para determinadas atividades (ex: factoring)'
  ];

  // Score baseado na margem da atividade vs lucro real
  let scoreRecomendacao = 60; // Base score

  // Ajuste por margem presumida (margens altas = score menor)
  if (rates.marginIRPJ <= 0.08) scoreRecomendacao += 20; // Comércio/Indústria
  if (rates.marginIRPJ >= 0.32) scoreRecomendacao -= 15; // Serviços

  // Ajuste por faturamento
  if (data.faturamentoAnual >= 10000000) scoreRecomendacao += 10; // Grandes empresas
  if (data.faturamentoAnual <= 1000000) scoreRecomendacao -= 5; // Pequenas empresas

  return {
    regime,
    impostos: breakdown,
    vantagens,
    desvantagens,
    limitacoes,
    elegivel: true,
    recomendado: scoreRecomendacao >= 70,
    scoreRecomendacao: Math.min(100, Math.max(0, scoreRecomendacao)),
    calculadoEm: new Date()
  };
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Estimar margem de lucro por atividade conforme médias do mercado
 */
function getMargemEstimadaPorAtividade(atividade: ActivityType): number {
  switch (atividade) {
    case ActivityType.COMERCIO_VAREJO:
      return 0.05; // 5% - margem típica do varejo
    case ActivityType.COMERCIO_ATACADO:
      return 0.03; // 3% - margem típica do atacado
    case ActivityType.INDUSTRIA_GERAL:
      return 0.08; // 8% - margem típica da indústria
    case ActivityType.SERVICOS_GERAIS:
      return 0.15; // 15% - margem típica de serviços
    case ActivityType.TECNOLOGIA:
      return 0.20; // 20% - margem típica de tecnologia
    case ActivityType.CONSULTORIA:
      return 0.25; // 25% - margem típica de consultoria
    case ActivityType.SAUDE:
      return 0.18; // 18% - margem típica da saúde
    case ActivityType.EDUCACAO:
      return 0.12; // 12% - margem típica da educação
    case ActivityType.FINANCEIRO:
      return 0.15; // 15% - margem típica do financeiro
    default:
      return 0.10; // 10% - margem padrão conservadora
  }
}

// ==================== LUCRO REAL CALCULATION ====================

export function calculateLucroReal(data: CompanyData): TaxCalculationResult {
  const regime = TaxRegime.LUCRO_REAL;

  // Verificar elegibilidade - Lucro Real é sempre elegível (pode ser obrigatório)
  const elegivel = true;
  const isObrigatorio = data.faturamentoAnual > 78000000; // Obrigatório acima de R$ 78 milhões

  // Calcular lucro real - se não informado, estimar com base na atividade
  let lucroLiquido = data.lucroLiquido;

  if (!lucroLiquido) {
    // Estimativas conservadoras por tipo de atividade
    const margemEstimada = getMargemEstimadaPorAtividade(data.atividade);
    lucroLiquido = data.faturamentoAnual * margemEstimada;
  }

  // Calcular IRPJ conforme PDF
  const irpjBasico = lucroLiquido * LUCRO_REAL_RATES.IRPJ.aliquotaNormal; // 15%

  // Adicional de 10% sobre parcela que exceder R$ 240.000/ano (R$ 20.000/mês)
  const lucroAnualExcedente = Math.max(0, lucroLiquido - LUCRO_REAL_RATES.IRPJ.limiteAnual);
  const irpjAdicional = lucroAnualExcedente * LUCRO_REAL_RATES.IRPJ.adicional; // 10%
  const irpjTotal = irpjBasico + irpjAdicional;

  // Calcular CSLL conforme PDF
  const isFinanceira = data.atividade === ActivityType.FINANCEIRO;
  const aliquotaCSLL = isFinanceira ?
    LUCRO_REAL_RATES.CSLL.aliquotaFinanceira : // 20% para financeiras
    LUCRO_REAL_RATES.CSLL.aliquotaNormal;      // 9% demais atividades
  const csll = lucroLiquido * aliquotaCSLL;

  // PIS/COFINS não cumulativo (permite créditos) conforme PDF
  const pisAliquota = LUCRO_REAL_RATES.PIS.naoCumulativo;      // 1,65%
  const cofinsAliquota = LUCRO_REAL_RATES.COFINS.naoCumulativo; // 7,6%

  // Aplicar possíveis reduções por créditos (estimativa conservadora)
  const creditosPISCOFINS = data.setor === BusinessSector.INDUSTRIA ? 0.3 : 0.15; // 30% indústria, 15% outros

  const pisBase = data.faturamentoAnual * pisAliquota;
  const cofinsBase = data.faturamentoAnual * cofinsAliquota;

  const pis = pisBase * (1 - creditosPISCOFINS);
  const cofins = cofinsBase * (1 - creditosPISCOFINS);

  // ICMS e ISS conforme PDF (estimativas por setor)
  let icms = 0;
  let iss = 0;

  if (data.setor === BusinessSector.COMERCIO) {
    icms = data.faturamentoAnual * 0.18; // 18% média comércio
  } else if (data.setor === BusinessSector.INDUSTRIA) {
    icms = data.faturamentoAnual * 0.12; // 12% média indústria
  }

  if ([BusinessSector.SERVICOS, BusinessSector.SERVICOS_ANEXO_IV, BusinessSector.SERVICOS_ANEXO_V].includes(data.setor)) {
    iss = data.faturamentoAnual * 0.035; // 3,5% média municipal
  }

  const total = irpjTotal + csll + pis + cofins + icms + iss;
  const aliquotaEfetiva = calculateEffectiveRate(total, data.faturamentoAnual);

  const breakdown: TaxBreakdown = {
    irpj: irpjTotal,
    csll,
    pis,
    cofins,
    icms: icms > 0 ? icms : undefined,
    iss: iss > 0 ? iss : undefined,
    total,
    aliquotaEfetiva
  };

  // Vantagens conforme PDF
  const vantagens = [
    'Tributação sobre o lucro efetivamente apurado',
    'Permite compensação de prejuízos fiscais (limitada a 30%)',
    'PIS/COFINS não cumulativo com direito a créditos',
    'Dedução integral de despesas operacionais necessárias',
    'Flexibilidade para planejamento tributário',
    'Ideal para empresas com margem de lucro baixa',
    'Possibilidade de diferimento de tributos'
  ];

  // Desvantagens conforme PDF
  const desvantagens = [
    'Maior complexidade na apuração e controle',
    'Múltiplas obrigações acessórias (ECF, ECD, etc.)',
    'Necessidade de controle rigoroso de receitas e despesas',
    'Custos mais elevados de compliance contábil',
    'Variabilidade na carga tributária conforme resultado',
    'Escrituração contábil obrigatória (LALUR)'
  ];

  // Limitações conforme PDF
  const limitacoes = [
    'Obrigatório para faturamento anual > R$ 78 milhões',
    'Obrigatório para bancos e instituições financeiras',
    'Controle detalhado de todas as receitas e despesas',
    'Apuração trimestral obrigatória (ou anual com estimativas mensais)',
    'Escrituração do LALUR (Livro de Apuração do Lucro Real)',
    'Compensação de prejuízos limitada a 30% do lucro real'
  ];

  // Score baseado na margem de lucro
  let scoreRecomendacao = 50; // Base score

  const margemLucro = lucroLiquido / data.faturamentoAnual;

  // Margens baixas favorecem Lucro Real
  if (margemLucro <= 0.05) scoreRecomendacao += 25; // Margem <= 5%
  if (margemLucro <= 0.10) scoreRecomendacao += 15; // Margem <= 10%
  if (margemLucro >= 0.30) scoreRecomendacao -= 20; // Margem >= 30%

  // Empresas grandes favorecem Lucro Real
  if (data.faturamentoAnual >= 50000000) scoreRecomendacao += 15;
  if (data.faturamentoAnual >= 78000000) scoreRecomendacao += 25; // Obrigatório

  return {
    regime,
    impostos: breakdown,
    vantagens,
    desvantagens,
    limitacoes,
    elegivel: true,
    recomendado: scoreRecomendacao >= 70,
    scoreRecomendacao: Math.min(100, Math.max(0, scoreRecomendacao)),
    calculadoEm: new Date()
  };
}

// ==================== MEI CALCULATION ====================

export function calculateMEI(data: CompanyData): TaxCalculationResult {
  const regime = TaxRegime.MEI;

  // Verificar elegibilidade
  const elegivel = isEligibleForRegime(data, regime);
  const motivoInelegibilidade = elegivel ? undefined : getEligibilityReason(data, regime);

  if (!elegivel) {
    return {
      regime,
      impostos: {
        total: 0,
        aliquotaEfetiva: 0
      },
      vantagens: [],
      desvantagens: [],
      limitacoes: [],
      elegivel: false,
      motivoInelegibilidade,
      recomendado: false,
      scoreRecomendacao: 0,
      calculadoEm: new Date()
    };
  }

  // Buscar valor MEI para o setor
  const meiTable = getMEIRates(data.setor);

  if (!meiTable) {
    throw new TaxCalculationError(
      'Valores MEI não encontrados para o setor',
      'MEI_RATES_NOT_FOUND',
      { setor: data.setor }
    );
  }

  const valorAnual = meiTable.valorMensal * 12;
  const aliquotaEfetiva = calculateEffectiveRate(valorAnual, data.faturamentoAnual);

  const breakdown: TaxBreakdown = {
    cpp: meiTable.breakdown.inss * 12,
    icms: meiTable.breakdown.icms ? meiTable.breakdown.icms * 12 : undefined,
    iss: meiTable.breakdown.iss ? meiTable.breakdown.iss * 12 : undefined,
    total: valorAnual,
    aliquotaEfetiva
  };

  const vantagens = [
    'Valor fixo mensal',
    'Simplicidade extrema',
    'Direitos previdenciários',
    'Isenção de IR, PIS, COFINS, CSLL',
    'Emissão de nota fiscal',
    'Menor custo tributário'
  ];

  const desvantagens = [
    'Limite baixo de faturamento (R$ 81.000/ano)',
    'Máximo 1 funcionário',
    'Atividades limitadas',
    'Não permite dedução de despesas',
    'Vedada participação societária'
  ];

  const limitacoes = [
    'Faturamento máximo: R$ 81.000/ano',
    'Máximo 1 funcionário contratado',
    'Lista restrita de atividades permitidas',
    'Não pode ter participação em outras empresas'
  ];

  // Score alto para empresas que se enquadram
  let scoreRecomendacao = 95; // Base score alto para MEI

  // Ajustes baseados no faturamento
  if (data.faturamentoAnual >= 60000) scoreRecomendacao -= 10; // Próximo do limite
  if (data.numeroFuncionarios > 1) scoreRecomendacao = 0; // Inelegível

  return {
    regime,
    impostos: breakdown,
    vantagens,
    desvantagens,
    limitacoes,
    elegivel: true,
    recomendado: scoreRecomendacao >= 70,
    scoreRecomendacao: Math.min(100, Math.max(0, scoreRecomendacao)),
    calculadoEm: new Date()
  };
}

// ==================== COMPARE ALL REGIMES ====================

export function compareAllRegimes(data: CompanyData): TaxCalculationResult[] {
  const results: TaxCalculationResult[] = [];

  try {
    // Calcular todos os regimes
    const meiResult = calculateMEI(data);
    const simplesResult = calculateSimplesNacional(data);
    const presumidoResult = calculateLucroPresumido(data);
    const realResult = calculateLucroReal(data);

    results.push(meiResult, simplesResult, presumidoResult, realResult);

    // Calcular economia comparativa
    const eligibleResults = results.filter(r => r.elegivel);

    if (eligibleResults.length > 1) {
      // Encontrar o regime com menor custo
      const bestResult = eligibleResults.reduce((best, current) =>
        current.impostos.total < best.impostos.total ? current : best
      );

      // Calcular economia para cada regime
      eligibleResults.forEach(result => {
        if (result.regime !== bestResult.regime) {
          const economia = result.impostos.total - bestResult.impostos.total;
          const economiaPercentual = economia / result.impostos.total;

          result.economia = Math.max(0, economia);
          result.economiaPercentual = Math.max(0, economiaPercentual);
        }
      });
    }

    return results;

  } catch (error) {
    throw new TaxCalculationError(
      'Erro ao comparar regimes tributários',
      'COMPARISON_ERROR',
      { originalError: error, companyData: data }
    );
  }
}

// ==================== HELPER FUNCTIONS ====================

export function getRecommendedRegime(data: CompanyData): TaxCalculationResult | null {
  try {
    const results = compareAllRegimes(data);
    const eligible = results.filter(r => r.elegivel);

    if (!eligible.length) return null;

    // Retornar o regime com melhor score que é elegível
    return eligible.reduce((best, current) =>
      current.scoreRecomendacao > best.scoreRecomendacao ? current : best
    );

  } catch (error) {
    console.error('Erro ao obter regime recomendado:', error);
    return null;
  }
}

export function getBestEconomicOption(data: CompanyData): TaxCalculationResult | null {
  try {
    const results = compareAllRegimes(data);
    const eligible = results.filter(r => r.elegivel);

    if (!eligible.length) return null;

    // Retornar o regime com menor custo total
    return eligible.reduce((best, current) =>
      current.impostos.total < best.impostos.total ? current : best
    );

  } catch (error) {
    console.error('Erro ao obter melhor opção econômica:', error);
    return null;
  }
}

// ==================== EXPORT MAIN CALCULATIONS ====================

export const TAX_CALCULATIONS = {
  calculateMEI,
  calculateSimplesNacional,
  calculateLucroPresumido,
  calculateLucroReal,
  compareAllRegimes,
  getRecommendedRegime,
  getBestEconomicOption
} as const;