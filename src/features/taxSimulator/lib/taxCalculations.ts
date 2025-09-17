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

  const vantagens = [
    'Margem de lucro presumida fixa',
    'Menor complexidade que Lucro Real',
    'Previsibilidade tributária',
    'Adequado para empresas com boa margem',
    'Permite planejamento fiscal'
  ];

  const desvantagens = [
    'Tributação independe do lucro real',
    'Margem presumida pode ser alta',
    'PIS/COFINS cumulativo (sem créditos)',
    'Não permite compensação de prejuízos'
  ];

  const limitacoes = [
    'Faturamento máximo: R$ 78.000.000/ano',
    'Margem presumida fixa por atividade',
    'Obrigatório para algumas atividades',
    'Não permite redução da base de cálculo'
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

// ==================== LUCRO REAL CALCULATION ====================

export function calculateLucroReal(data: CompanyData): TaxCalculationResult {
  const regime = TaxRegime.LUCRO_REAL;

  // Lucro Real sempre é elegível (pode ser obrigatório)
  const elegivel = true;

  // Para cálculo simplificado, assumir margem de lucro padrão se não informada
  const lucroLiquido = data.lucroLiquido || (data.faturamentoAnual * 0.10); // 10% default

  // Calcular IRPJ
  const irpjBasico = lucroLiquido * LUCRO_REAL_RATES.IRPJ.aliquotaNormal;
  const lucroMensalMedio = lucroLiquido / 12;
  const irpjAdicional = calculateIRPJAdditional(lucroMensalMedio, irpjBasico / 12) * 12;
  const irpjTotal = irpjBasico + irpjAdicional;

  // Calcular CSLL
  const isFinanceira = data.atividade === ActivityType.FINANCEIRO;
  const aliquotaCSLL = isFinanceira ?
    LUCRO_REAL_RATES.CSLL.aliquotaFinanceira :
    LUCRO_REAL_RATES.CSLL.aliquotaNormal;
  const csll = lucroLiquido * aliquotaCSLL;

  // PIS/COFINS não cumulativo (permite créditos)
  const pis = data.faturamentoAnual * LUCRO_REAL_RATES.PIS.naoCumulativo;
  const cofins = data.faturamentoAnual * LUCRO_REAL_RATES.COFINS.naoCumulativo;

  // ICMS e ISS (estimativa)
  let icms = 0;
  let iss = 0;

  if (data.setor === BusinessSector.COMERCIO || data.setor === BusinessSector.INDUSTRIA) {
    icms = data.faturamentoAnual * 0.18;
  }

  if ([BusinessSector.SERVICOS, BusinessSector.SERVICOS_ANEXO_IV, BusinessSector.SERVICOS_ANEXO_V].includes(data.setor)) {
    iss = data.faturamentoAnual * 0.05;
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

  const vantagens = [
    'Tributação sobre lucro real',
    'Permite compensação de prejuízos',
    'PIS/COFINS não cumulativo (com créditos)',
    'Dedução completa de despesas',
    'Flexibilidade fiscal',
    'Adequado para empresas com baixa margem'
  ];

  const desvantagens = [
    'Maior complexidade operacional',
    'Mais obrigações acessórias',
    'Controle rigoroso necessário',
    'Custos de compliance altos',
    'Variabilidade tributária'
  ];

  const limitacoes = [
    'Obrigatório para faturamento > R$ 78 milhões/ano',
    'Controle detalhado de receitas e despesas',
    'Apuração mensal ou trimestral',
    'Escrituração contábil complexa'
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