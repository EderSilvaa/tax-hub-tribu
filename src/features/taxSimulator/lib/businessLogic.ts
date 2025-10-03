/**
 * Business Logic - Task 2.3: Lógica de Negócio Avançada
 *
 * Implementa validações robustas, elegibilidade avançada e análises comparativas
 * para o simulador tributário TaxHub
 */

import {
  CompanyData,
  TaxRegime,
  TaxCalculationResult,
  ActivityType,
  BusinessSector,
  TaxCalculationError,
  EligibilityCheck,
  ValidationResult,
  ComparisonAnalysis
} from './types';

import {
  LIMITS,
  TAX_REGIMES,
  ACTIVITY_TYPES,
  VALIDATION_MESSAGES
} from './constants';

import {
  formatCurrency,
  formatPercentage,
  calculateEffectiveRate,
  validateCompanyData,
  isEligibleForRegime,
  getEligibilityReason
} from './utils';

// ==================== TASK 2.3.1: LÓGICA DE ELEGIBILIDADE AVANÇADA ====================

/**
 * Verifica elegibilidade detalhada para um regime específico
 */
export function checkAdvancedEligibility(data: CompanyData, regime: TaxRegime): EligibilityCheck {
  const basicEligibility = isEligibleForRegime(data, regime);
  const basicReason = basicEligibility ? null : getEligibilityReason(data, regime);

  // Se não passa na validação básica, retorna resultado
  if (!basicEligibility) {
    return {
      eligible: false,
      reason: basicReason || 'Motivo não especificado',
      warnings: [],
      recommendations: [],
      blockers: [basicReason || 'Validação básica falhou'],
      score: 0
    };
  }

  const warnings: string[] = [];
  const recommendations: string[] = [];
  const blockers: string[] = [];
  let score = 100;

  // Verificações específicas por regime
  switch (regime) {
    case TaxRegime.MEI:
      return checkMEIEligibility(data, warnings, recommendations, blockers, score);

    case TaxRegime.SIMPLES_NACIONAL:
      return checkSimplesEligibility(data, warnings, recommendations, blockers, score);

    case TaxRegime.LUCRO_PRESUMIDO:
      return checkPresumidoEligibility(data, warnings, recommendations, blockers, score);

    case TaxRegime.LUCRO_REAL:
      return checkRealEligibility(data, warnings, recommendations, blockers, score);

    default:
      return {
        eligible: false,
        reason: 'Regime não reconhecido',
        warnings: [],
        recommendations: [],
        blockers: ['Regime tributário inválido'],
        score: 0
      };
  }
}

/**
 * Verificação avançada de elegibilidade para MEI
 */
function checkMEIEligibility(
  data: CompanyData,
  warnings: string[],
  recommendations: string[],
  blockers: string[],
  score: number
): EligibilityCheck {
  // Validação de faturamento
  if (data.faturamentoAnual > LIMITS.MEI.MAX_REVENUE) {
    blockers.push(`Faturamento ${formatCurrency(data.faturamentoAnual)} excede limite MEI de ${formatCurrency(LIMITS.MEI.MAX_REVENUE)}`);
    return { eligible: false, reason: blockers[0], warnings, recommendations, blockers, score: 0 };
  }

  // Warning para faturamento próximo do limite
  if (data.faturamentoAnual > LIMITS.MEI.MAX_REVENUE * 0.8) {
    warnings.push(`Faturamento próximo do limite MEI (${formatPercentage(data.faturamentoAnual / LIMITS.MEI.MAX_REVENUE)})`);
    score -= 15;
  }

  // Validação de funcionários
  if (data.numeroFuncionarios > LIMITS.MEI.MAX_EMPLOYEES) {
    blockers.push(`MEI permite máximo ${LIMITS.MEI.MAX_EMPLOYEES} funcionário. Atual: ${data.numeroFuncionarios}`);
    return { eligible: false, reason: blockers[0], warnings, recommendations, blockers, score: 0 };
  }

  // Validação de atividades permitidas
  if (!LIMITS.MEI.ACTIVITIES_ALLOWED?.includes(data.atividade)) {
    blockers.push(`Atividade "${ACTIVITY_TYPES[data.atividade].name}" não permitida no MEI`);
    return { eligible: false, reason: blockers[0], warnings, recommendations, blockers, score: 0 };
  }

  // Recomendações baseadas na situação
  if (data.faturamentoAnual < 30000) {
    recommendations.push('MEI é ideal para seu faturamento atual');
    score += 10;
  }

  if (data.numeroFuncionarios === 0) {
    recommendations.push('Sem funcionários - MEI é perfeito para sua situação');
    score += 5;
  }

  return {
    eligible: true,
    reason: null,
    warnings,
    recommendations,
    blockers,
    score: Math.min(100, Math.max(0, score))
  };
}

/**
 * Verificação avançada de elegibilidade para Simples Nacional
 */
function checkSimplesEligibility(
  data: CompanyData,
  warnings: string[],
  recommendations: string[],
  blockers: string[],
  score: number
): EligibilityCheck {
  // Validação de faturamento
  if (data.faturamentoAnual > LIMITS.SIMPLES_NACIONAL.MAX_REVENUE) {
    blockers.push(`Faturamento ${formatCurrency(data.faturamentoAnual)} excede limite Simples de ${formatCurrency(LIMITS.SIMPLES_NACIONAL.MAX_REVENUE)}`);
    return { eligible: false, reason: blockers[0], warnings, recommendations, blockers, score: 0 };
  }

  // Warning para faturamento próximo do limite
  if (data.faturamentoAnual > LIMITS.SIMPLES_NACIONAL.MAX_REVENUE * 0.9) {
    warnings.push('Faturamento próximo do limite do Simples Nacional - considere planejamento para crescimento');
    score -= 10;
  }

  // Validação de atividades proibidas
  if (LIMITS.SIMPLES_NACIONAL.FORBIDDEN_ACTIVITIES?.includes(data.atividade)) {
    blockers.push(`Atividade "${ACTIVITY_TYPES[data.atividade].name}" vedada no Simples Nacional`);
    return { eligible: false, reason: blockers[0], warnings, recommendations, blockers, score: 0 };
  }

  // Verificações específicas por setor
  if (data.setor === BusinessSector.SERVICOS_ANEXO_V) {
    warnings.push('Anexo V do Simples tem alíquotas mais altas - compare com Lucro Presumido');
    score -= 15;
  }

  // Recomendações baseadas no perfil
  if (data.faturamentoAnual <= 360000) {
    recommendations.push('Simples oferece alíquotas muito baixas para sua faixa de faturamento');
    score += 15;
  }

  if (data.setor === BusinessSector.COMERCIO) {
    recommendations.push('Comércio tem vantagens significativas no Simples Nacional');
    score += 10;
  }

  return {
    eligible: true,
    reason: null,
    warnings,
    recommendations,
    blockers,
    score: Math.min(100, Math.max(0, score))
  };
}

/**
 * Verificação avançada de elegibilidade para Lucro Presumido
 */
function checkPresumidoEligibility(
  data: CompanyData,
  warnings: string[],
  recommendations: string[],
  blockers: string[],
  score: number
): EligibilityCheck {
  // Validação de faturamento
  if (data.faturamentoAnual > LIMITS.LUCRO_PRESUMIDO.MAX_REVENUE) {
    blockers.push(`Faturamento ${formatCurrency(data.faturamentoAnual)} excede limite Lucro Presumido de ${formatCurrency(LIMITS.LUCRO_PRESUMIDO.MAX_REVENUE)}`);
    return { eligible: false, reason: blockers[0], warnings, recommendations, blockers, score: 0 };
  }

  // Análise de margem presumida vs real
  const activityInfo = ACTIVITY_TYPES[data.atividade];
  const marginPresumida = activityInfo.marginPresumida?.irpj || 0.08;

  if (data.lucroLiquido) {
    const marginReal = data.lucroLiquido / data.faturamentoAnual;

    if (marginReal > marginPresumida * 1.5) {
      warnings.push(`Sua margem real (${formatPercentage(marginReal)}) é muito superior à presumida (${formatPercentage(marginPresumida)}) - considere Lucro Real`);
      score -= 20;
    } else if (marginReal < marginPresumida * 0.8) {
      recommendations.push(`Sua margem (${formatPercentage(marginReal)}) favorece o Lucro Presumido`);
      score += 15;
    }
  }

  // Recomendações por porte da empresa
  if (data.faturamentoAnual >= 10000000) {
    recommendations.push('Empresas de maior porte podem se beneficiar do Lucro Presumido');
    score += 10;
  }

  return {
    eligible: true,
    reason: null,
    warnings,
    recommendations,
    blockers,
    score: Math.min(100, Math.max(0, score))
  };
}

/**
 * Verificação avançada de elegibilidade para Lucro Real
 */
function checkRealEligibility(
  data: CompanyData,
  warnings: string[],
  recommendations: string[],
  blockers: string[],
  score: number
): EligibilityCheck {
  // Lucro Real sempre é elegível, mas pode ser obrigatório
  const isObrigatorio = data.faturamentoAnual > (LIMITS.LUCRO_REAL.MANDATORY_ABOVE || 78000000);

  if (isObrigatorio) {
    recommendations.push('Lucro Real é OBRIGATÓRIO para seu faturamento');
    score = 100;
  }

  // Análise de margem para recomendação
  if (data.lucroLiquido) {
    const margem = data.lucroLiquido / data.faturamentoAnual;

    if (margem <= 0.05) {
      recommendations.push(`Margem baixa (${formatPercentage(margem)}) favorece muito o Lucro Real`);
      score += 25;
    } else if (margem <= 0.10) {
      recommendations.push(`Margem moderada (${formatPercentage(margem)}) ainda favorece o Lucro Real`);
      score += 15;
    } else if (margem >= 0.30) {
      warnings.push(`Margem alta (${formatPercentage(margem)}) pode não favorecer o Lucro Real`);
      score -= 15;
    }
  }

  // Considerações operacionais
  if (data.numeroFuncionarios < 10) {
    warnings.push('Lucro Real exige maior estrutura contábil - verifique custo-benefício');
    score -= 10;
  }

  return {
    eligible: true,
    reason: null,
    warnings,
    recommendations,
    blockers,
    score: Math.min(100, Math.max(0, score))
  };
}

// ==================== TASK 2.3.2: VALIDAÇÕES AVANÇADAS DE ENTRADA ====================

/**
 * Validação avançada dos dados da empresa com contexto de negócio
 */
export function validateAdvancedCompanyData(data: Partial<CompanyData>): ValidationResult {
  // Validação básica primeiro
  const basicErrors = validateCompanyData(data);
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Se há erros básicos, retorna sem validações avançadas
  if (Object.keys(basicErrors).length > 0) {
    return {
      isValid: false,
      errors: basicErrors,
      warnings,
      suggestions
    };
  }

  const companyData = data as CompanyData;

  // Validações contextuais
  validateBusinessContext(companyData, warnings, suggestions);
  validateFinancialConsistency(companyData, warnings, suggestions);
  validateOperationalLogic(companyData, warnings, suggestions);

  return {
    isValid: Object.keys(basicErrors).length === 0,
    errors: basicErrors,
    warnings,
    suggestions
  };
}

/**
 * Validação do contexto de negócio
 */
function validateBusinessContext(data: CompanyData, warnings: string[], suggestions: string[]) {
  const activityInfo = ACTIVITY_TYPES[data.atividade];

  // Verifica se setor e atividade são consistentes
  if (activityInfo.setor !== data.setor) {
    warnings.push(`Inconsistência: atividade "${activityInfo.name}" não corresponde ao setor "${data.setor}"`);
  }

  // Validação por estágio da empresa
  if (data.estagio) {
    const faturamentoEsperado = {
      'pre_revenue': 0,
      'mvp': 50000,
      'growth': 500000,
      'scale': 2000000
    };

    const expectedRevenue = faturamentoEsperado[data.estagio as keyof typeof faturamentoEsperado];
    if (expectedRevenue && data.faturamentoAnual > expectedRevenue * 5) {
      warnings.push(`Faturamento muito alto para estágio "${data.estagio}"`);
    }
  }

  // Sugestões por atividade
  if (data.atividade === ActivityType.TECNOLOGIA && data.faturamentoAnual < 100000) {
    suggestions.push('Empresas de tecnologia podem crescer rapidamente - considere projeções futuras');
  }
}

/**
 * Validação de consistência financeira
 */
function validateFinancialConsistency(data: CompanyData, warnings: string[], suggestions: string[]) {
  // Validação de margem de lucro
  if (data.lucroLiquido) {
    const margem = data.lucroLiquido / data.faturamentoAnual;

    if (margem < 0) {
      warnings.push('Empresa com prejuízo - considere estratégias de recuperação');
    } else if (margem < 0.02) {
      warnings.push('Margem muito baixa - empresa em situação delicada');
    } else if (margem > 0.50) {
      warnings.push('Margem excepcionalmente alta - verifique se os dados estão corretos');
    }

    // Comparação com margem típica da atividade
    const activityInfo = ACTIVITY_TYPES[data.atividade];
    const marginTipica = activityInfo.marginPresumida?.irpj || 0.08;

    if (margem < marginTipica * 0.5) {
      suggestions.push(`Margem abaixo da média do setor (${formatPercentage(marginTipica)})`);
    } else if (margem > marginTipica * 2) {
      suggestions.push(`Margem acima da média do setor - considere Lucro Real`);
    }
  }

  // Validação faturamento vs funcionários
  const faturamentoPorFuncionario = data.numeroFuncionarios > 0 ?
    data.faturamentoAnual / data.numeroFuncionarios : data.faturamentoAnual;

  if (data.numeroFuncionarios > 0) {
    if (faturamentoPorFuncionario < 50000) {
      warnings.push('Produtividade por funcionário muito baixa');
    } else if (faturamentoPorFuncionario > 1000000) {
      warnings.push('Produtividade por funcionário excepcionalmente alta');
    }
  }
}

/**
 * Validação de lógica operacional
 */
function validateOperationalLogic(data: CompanyData, warnings: string[], suggestions: string[]) {
  // MEI com funcionários
  if (data.faturamentoAnual <= 81000 && data.numeroFuncionarios > 1) {
    suggestions.push('Com esse faturamento, MEI pode ser uma opção (máximo 1 funcionário)');
  }

  // Empresas grandes sem regime adequado
  if (data.faturamentoAnual > 78000000 && data.regimeAtual !== TaxRegime.LUCRO_REAL) {
    warnings.push('Lucro Real é obrigatório para faturamento acima de R$ 78 milhões');
  }

  // Inconsistências por setor
  if (data.setor === BusinessSector.SERVICOS_ANEXO_V && data.numeroFuncionarios > 50) {
    suggestions.push('Empresas de serviços profissionais grandes devem avaliar cuidadosamente o Simples Nacional');
  }
}

// ==================== TASK 2.3.3: CÁLCULO DE ECONOMIA COMPARATIVA ====================

/**
 * Análise comparativa detalhada entre regimes
 */
export function calculateComparativeAnalysis(results: TaxCalculationResult[]): ComparisonAnalysis {
  const eligibleResults = results.filter(r => r.elegivel);

  if (eligibleResults.length === 0) {
    throw new TaxCalculationError(
      'Nenhum regime elegível para análise comparativa',
      'NO_ELIGIBLE_REGIMES'
    );
  }

  // Encontrar melhor opção econômica
  const bestEconomic = eligibleResults.reduce((best, current) =>
    current.impostos.total < best.impostos.total ? current : best
  );

  // Encontrar opção mais recomendada
  const bestRecommended = eligibleResults.reduce((best, current) =>
    current.scoreRecomendacao > best.scoreRecomendacao ? current : best
  );

  // Calcular economias
  const savings = eligibleResults.map(result => {
    if (result.regime === bestEconomic.regime) {
      return {
        regime: result.regime,
        savings: 0,
        savingsPercentage: 0,
        isCurrentBest: true
      };
    }

    const absoluteSavings = result.impostos.total - bestEconomic.impostos.total;
    const percentageSavings = absoluteSavings / result.impostos.total;

    return {
      regime: result.regime,
      savings: absoluteSavings,
      savingsPercentage: percentageSavings,
      isCurrentBest: false
    };
  });

  // Análise de riscos
  const riskAnalysis = analyzeRegimeRisks(eligibleResults);

  // Projeções de crescimento
  const growthProjections = calculateGrowthProjections(eligibleResults);

  return {
    bestEconomic,
    bestRecommended,
    totalSavingsPotential: Math.max(...savings.map(s => s.savings)),
    savings,
    riskAnalysis,
    growthProjections,
    eligibleCount: eligibleResults.length,
    analysisDate: new Date()
  };
}

/**
 * Análise de riscos por regime
 */
function analyzeRegimeRisks(results: TaxCalculationResult[]): Array<{
  regime: TaxRegime;
  riskLevel: 'baixo' | 'medio' | 'alto';
  risks: string[];
  mitigations: string[];
}> {
  return results.map(result => {
    const risks: string[] = [];
    const mitigations: string[] = [];
    let riskLevel: 'baixo' | 'medio' | 'alto' = 'baixo';

    switch (result.regime) {
      case TaxRegime.MEI:
        if (result.impostos.aliquotaEfetiva < 0.02) {
          risks.push('Limite de faturamento baixo');
          mitigations.push('Planeje transição para Simples Nacional');
          riskLevel = 'medio';
        }
        break;

      case TaxRegime.SIMPLES_NACIONAL:
        if (result.impostos.aliquotaEfetiva > 0.15) {
          risks.push('Alíquotas altas em faixas superiores');
          mitigations.push('Compare com Lucro Presumido');
          riskLevel = 'medio';
        }
        break;

      case TaxRegime.LUCRO_PRESUMIDO:
        risks.push('Tributação independe do lucro real');
        mitigations.push('Monitore margem de lucro constantemente');
        riskLevel = 'medio';
        break;

      case TaxRegime.LUCRO_REAL:
        risks.push('Maior complexidade operacional');
        risks.push('Variabilidade na carga tributária');
        mitigations.push('Invista em estrutura contábil');
        mitigations.push('Aproveite benefícios de créditos PIS/COFINS');
        riskLevel = 'alto';
        break;
    }

    return {
      regime: result.regime,
      riskLevel,
      risks,
      mitigations
    };
  });
}

/**
 * Projeções de crescimento por regime
 */
function calculateGrowthProjections(results: TaxCalculationResult[]): Array<{
  regime: TaxRegime;
  sustainable: boolean;
  growthLimit?: number;
  projectedTaxAt50PercentGrowth: number;
  projectedTaxAt100PercentGrowth: number;
}> {
  return results.map(result => {
    let sustainable = true;
    let growthLimit: number | undefined;

    // Determinar limites de crescimento
    switch (result.regime) {
      case TaxRegime.MEI:
        growthLimit = 81000;
        sustainable = false; // Limitado
        break;
      case TaxRegime.SIMPLES_NACIONAL:
        growthLimit = 4800000;
        sustainable = false; // Limitado
        break;
      case TaxRegime.LUCRO_PRESUMIDO:
        growthLimit = 78000000;
        sustainable = false; // Limitado
        break;
      case TaxRegime.LUCRO_REAL:
        sustainable = true; // Sem limites
        break;
    }

    // Simular crescimento (simplificado - mantém mesma alíquota efetiva)
    const currentTax = result.impostos.total;
    const projectedTaxAt50PercentGrowth = currentTax * 1.5;
    const projectedTaxAt100PercentGrowth = currentTax * 2;

    return {
      regime: result.regime,
      sustainable,
      growthLimit,
      projectedTaxAt50PercentGrowth,
      projectedTaxAt100PercentGrowth
    };
  });
}

// ==================== TASK 2.3.4: IDENTIFICAÇÃO DO MELHOR REGIME ====================

/**
 * Algoritmo inteligente para identificar o melhor regime considerando múltiplos fatores
 */
export function identifyOptimalRegime(data: CompanyData, results: TaxCalculationResult[]): {
  optimal: TaxCalculationResult;
  reasoning: string[];
  alternativeOptions: TaxCalculationResult[];
  warningFlags: string[];
} {
  const eligibleResults = results.filter(r => r.elegivel);

  if (eligibleResults.length === 0) {
    throw new TaxCalculationError(
      'Nenhum regime elegível para identificação do melhor',
      'NO_ELIGIBLE_REGIMES'
    );
  }

  // Calcular score ponderado para cada regime
  const scoredResults = eligibleResults.map(result => {
    let totalScore = 0;
    const factors: string[] = [];

    // Fator 1: Economia (40% do peso)
    const economicScore = calculateEconomicScore(result, eligibleResults);
    totalScore += economicScore * 0.4;
    factors.push(`Economia: ${economicScore.toFixed(1)}/100`);

    // Fator 2: Score de recomendação (25% do peso)
    const recommendationScore = result.scoreRecomendacao;
    totalScore += recommendationScore * 0.25;
    factors.push(`Recomendação: ${recommendationScore.toFixed(1)}/100`);

    // Fator 3: Sustentabilidade (20% do peso)
    const sustainabilityScore = calculateSustainabilityScore(result, data);
    totalScore += sustainabilityScore * 0.20;
    factors.push(`Sustentabilidade: ${sustainabilityScore.toFixed(1)}/100`);

    // Fator 4: Simplicidade operacional (15% do peso)
    const simplicityScore = calculateSimplicityScore(result);
    totalScore += simplicityScore * 0.15;
    factors.push(`Simplicidade: ${simplicityScore.toFixed(1)}/100`);

    return {
      ...result,
      totalScore,
      scoringFactors: factors
    };
  });

  // Ordenar por score total
  scoredResults.sort((a, b) => b.totalScore - a.totalScore);

  const optimal = scoredResults[0];
  const alternativeOptions = scoredResults.slice(1, 3); // Até 2 alternativas

  // Gerar raciocínio
  const reasoning = generateOptimalReasonig(optimal, data, eligibleResults);

  // Identificar flags de atenção
  const warningFlags = identifyWarningFlags(optimal, data);

  return {
    optimal,
    reasoning,
    alternativeOptions,
    warningFlags
  };
}

/**
 * Calcula score econômico baseado na posição relativa
 */
function calculateEconomicScore(result: TaxCalculationResult, allResults: TaxCalculationResult[]): number {
  const costs = allResults.map(r => r.impostos.total);
  const minCost = Math.min(...costs);
  const maxCost = Math.max(...costs);

  if (minCost === maxCost) return 100;

  // Score inversamente proporcional ao custo
  return 100 - ((result.impostos.total - minCost) / (maxCost - minCost)) * 100;
}

/**
 * Calcula score de sustentabilidade (margem para crescimento)
 */
function calculateSustainabilityScore(result: TaxCalculationResult, data: CompanyData): number {
  const regimeLimits = {
    [TaxRegime.MEI]: 81000,
    [TaxRegime.SIMPLES_NACIONAL]: 4800000,
    [TaxRegime.LUCRO_PRESUMIDO]: 78000000,
    [TaxRegime.LUCRO_REAL]: Infinity
  };

  const limit = regimeLimits[result.regime];
  if (limit === Infinity) return 100;

  const utilizacao = data.faturamentoAnual / limit;

  if (utilizacao < 0.5) return 100; // Muito espaço para crescer
  if (utilizacao < 0.7) return 80;  // Bom espaço
  if (utilizacao < 0.9) return 60;  // Espaço limitado
  return 40; // Próximo do limite
}

/**
 * Calcula score de simplicidade operacional
 */
function calculateSimplicityScore(result: TaxCalculationResult): number {
  const simplicityScores = {
    [TaxRegime.MEI]: 100,
    [TaxRegime.SIMPLES_NACIONAL]: 85,
    [TaxRegime.LUCRO_PRESUMIDO]: 70,
    [TaxRegime.LUCRO_REAL]: 50
  };

  return simplicityScores[result.regime];
}

/**
 * Gera raciocínio para a escolha do regime ótimo
 */
function generateOptimalReasonig(
  optimal: TaxCalculationResult & { totalScore: number; scoringFactors: string[] },
  data: CompanyData,
  allResults: TaxCalculationResult[]
): string[] {
  const reasoning: string[] = [];

  // Razão principal
  reasoning.push(`${TAX_REGIMES[optimal.regime].name} foi identificado como melhor opção (score: ${optimal.totalScore.toFixed(1)}/100)`);

  // Economia
  const bestCost = Math.min(...allResults.map(r => r.impostos.total));
  if (optimal.impostos.total === bestCost) {
    reasoning.push(`Oferece a menor carga tributária: ${formatCurrency(optimal.impostos.total)} (${formatPercentage(optimal.impostos.aliquotaEfetiva)})`);
  }

  // Sustentabilidade
  const regimeLimits = {
    [TaxRegime.MEI]: 81000,
    [TaxRegime.SIMPLES_NACIONAL]: 4800000,
    [TaxRegime.LUCRO_PRESUMIDO]: 78000000,
    [TaxRegime.LUCRO_REAL]: Infinity
  };

  const limit = regimeLimits[optimal.regime];
  if (limit !== Infinity) {
    const margemCrescimento = (limit - data.faturamentoAnual) / data.faturamentoAnual;
    if (margemCrescimento > 1) {
      reasoning.push(`Permite crescimento de até ${formatPercentage(margemCrescimento)} antes de mudança obrigatória`);
    }
  }

  // Características específicas
  if (optimal.regime === TaxRegime.MEI && data.numeroFuncionarios <= 1) {
    reasoning.push('Ideal para operação enxuta com poucos funcionários');
  }

  if (optimal.regime === TaxRegime.LUCRO_REAL && data.lucroLiquido) {
    const margem = data.lucroLiquido / data.faturamentoAnual;
    if (margem <= 0.10) {
      reasoning.push(`Margem de lucro baixa (${formatPercentage(margem)}) favorece significativamente o Lucro Real`);
    }
  }

  return reasoning;
}

/**
 * Identifica flags de atenção para o regime escolhido
 */
function identifyWarningFlags(optimal: TaxCalculationResult, data: CompanyData): string[] {
  const flags: string[] = [];

  // Flags por regime
  if (optimal.regime === TaxRegime.MEI) {
    const utilizacao = data.faturamentoAnual / 81000;
    if (utilizacao > 0.8) {
      flags.push('Próximo do limite de faturamento MEI - planeje transição');
    }
  }

  if (optimal.regime === TaxRegime.SIMPLES_NACIONAL) {
    if (data.setor === BusinessSector.SERVICOS_ANEXO_V && optimal.impostos.aliquotaEfetiva > 0.15) {
      flags.push('Alíquotas altas no Anexo V - compare periodicamente com outros regimes');
    }
  }

  if (optimal.regime === TaxRegime.LUCRO_PRESUMIDO) {
    if (!data.lucroLiquido) {
      flags.push('Importante acompanhar margem real vs presumida');
    }
  }

  if (optimal.regime === TaxRegime.LUCRO_REAL) {
    if (data.numeroFuncionarios < 10) {
      flags.push('Estrutura pequena pode ter dificuldades com complexidade do Lucro Real');
    }
  }

  return flags;
}

// ==================== TASK 2.3.5: CÁLCULO DE ALÍQUOTA EFETIVA ====================

/**
 * Cálculo avançado de alíquota efetiva com breakdown detalhado
 */
export function calculateAdvancedEffectiveRate(
  taxBreakdown: any,
  revenue: number
): {
  overall: number;
  byTaxType: Record<string, number>;
  federalTotal: number;
  stateTotal: number;
  municipalTotal: number;
  comparison: {
    vsSimplesMedio: number;
    vsPresumidoMedio: number;
  };
} {
  if (revenue === 0) {
    return {
      overall: 0,
      byTaxType: {},
      federalTotal: 0,
      stateTotal: 0,
      municipalTotal: 0,
      comparison: { vsSimplesMedio: 0, vsPresumidoMedio: 0 }
    };
  }

  // Breakdown por tipo de imposto
  const byTaxType: Record<string, number> = {};
  let federalTotal = 0;
  let stateTotal = 0;
  let municipalTotal = 0;

  // Impostos federais
  if (taxBreakdown.irpj) {
    byTaxType.irpj = taxBreakdown.irpj / revenue;
    federalTotal += taxBreakdown.irpj;
  }
  if (taxBreakdown.csll) {
    byTaxType.csll = taxBreakdown.csll / revenue;
    federalTotal += taxBreakdown.csll;
  }
  if (taxBreakdown.pis) {
    byTaxType.pis = taxBreakdown.pis / revenue;
    federalTotal += taxBreakdown.pis;
  }
  if (taxBreakdown.cofins) {
    byTaxType.cofins = taxBreakdown.cofins / revenue;
    federalTotal += taxBreakdown.cofins;
  }
  if (taxBreakdown.cpp) {
    byTaxType.cpp = taxBreakdown.cpp / revenue;
    federalTotal += taxBreakdown.cpp;
  }

  // Impostos estaduais
  if (taxBreakdown.icms) {
    byTaxType.icms = taxBreakdown.icms / revenue;
    stateTotal += taxBreakdown.icms;
  }

  // Impostos municipais
  if (taxBreakdown.iss) {
    byTaxType.iss = taxBreakdown.iss / revenue;
    municipalTotal += taxBreakdown.iss;
  }

  // Simples Nacional (unificado)
  if (taxBreakdown.simplesNacional) {
    byTaxType.simplesNacional = taxBreakdown.simplesNacional / revenue;
    federalTotal += taxBreakdown.simplesNacional;
  }

  const overall = taxBreakdown.total / revenue;

  // Comparações com médias de mercado
  const vsSimplesMedio = overall - 0.08; // 8% média Simples
  const vsPresumidoMedio = overall - 0.13; // 13% média Presumido

  return {
    overall,
    byTaxType,
    federalTotal: federalTotal / revenue,
    stateTotal: stateTotal / revenue,
    municipalTotal: municipalTotal / revenue,
    comparison: {
      vsSimplesMedio,
      vsPresumidoMedio
    }
  };
}

// ==================== EXPORT ALL FUNCTIONS ====================

export const BUSINESS_LOGIC = {
  checkAdvancedEligibility,
  validateAdvancedCompanyData,
  calculateComparativeAnalysis,
  identifyOptimalRegime,
  calculateAdvancedEffectiveRate
} as const;