/**
 * useTaxCalculation Hook - Task 4.1: Custom Hooks
 *
 * Hook principal para gerenciar cálculos tributários e business logic
 */

import { useState, useCallback, useMemo } from 'react';
import {
  CompanyData,
  TaxCalculationResult,
  TaxComparison,
  EconomyAnalysis,
  UseTaxCalculationReturn,
  ValidationResult,
  ComparisonAnalysis,
  EligibilityCheck
} from '../lib/types';

import {
  compareAllRegimes,
  getRecommendedRegime,
  getBestEconomicOption
} from '../lib/taxCalculations';

import {
  checkAdvancedEligibility,
  validateAdvancedCompanyData,
  calculateComparativeAnalysis,
  identifyOptimalRegime,
  calculateAdvancedEffectiveRate
} from '../lib/businessLogic';

import { generateId } from '../lib/utils';

export function useTaxCalculation(): UseTaxCalculationReturn {
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<TaxCalculationResult[] | null>(null);
  const [comparison, setComparison] = useState<TaxComparison | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastCompanyData, setLastCompanyData] = useState<CompanyData | null>(null);

  // ==================== MAIN CALCULATION FUNCTION ====================

  const calculate = useCallback(async (data: CompanyData): Promise<void> => {
    setIsCalculating(true);
    setError(null);

    try {
      // Validação avançada dos dados
      const validation = validateAdvancedCompanyData(data);
      if (!validation.isValid) {
        throw new Error(`Dados inválidos: ${Object.values(validation.errors).join(', ')}`);
      }

      // Simular delay para UX (calculando...)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Executar cálculos principais
      const calculationResults = compareAllRegimes(data);

      // Verificar se há resultados elegíveis
      const eligibleResults = calculationResults.filter(r => r.elegivel);
      if (eligibleResults.length === 0) {
        throw new Error('Nenhum regime tributário é elegível para esta empresa');
      }

      // Análise comparativa avançada
      const comparativeAnalysis = calculateComparativeAnalysis(calculationResults);

      // Identificar regime ótimo
      const optimalAnalysis = identifyOptimalRegime(data, calculationResults);

      // Criar objeto de comparação completo
      const newComparison: TaxComparison = {
        empresa: data,
        resultados: calculationResults,
        melhorOpcao: optimalAnalysis.optimal.regime,
        economiaMaxima: comparativeAnalysis.totalSavingsPotential,
        insights: optimalAnalysis.reasoning,
        alertas: optimalAnalysis.warningFlags,
        proximasAcoes: generateNextActions(data, optimalAnalysis.optimal),
        id: generateId(),
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
      };

      setResults(calculationResults);
      setComparison(newComparison);
      setLastCompanyData(data);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao calcular impostos';
      setError(errorMessage);
      console.error('Erro na calculação tributária:', err);
    } finally {
      setIsCalculating(false);
    }
  }, []);

  // ==================== HELPER FUNCTIONS ====================

  const clear = useCallback(() => {
    setResults(null);
    setComparison(null);
    setError(null);
    setLastCompanyData(null);
  }, []);

  const retry = useCallback(() => {
    if (lastCompanyData) {
      calculate(lastCompanyData);
    }
  }, [lastCompanyData, calculate]);

  const getBestOption = useCallback((): TaxCalculationResult | null => {
    if (!results) return null;
    return getBestEconomicOption(lastCompanyData!);
  }, [results, lastCompanyData]);

  const getEconomyAnalysis = useCallback((): EconomyAnalysis | null => {
    if (!results || !lastCompanyData || !comparison) return null;

    const currentRegimeResult = results.find(r => r.regime === lastCompanyData.regimeAtual);
    const bestOption = getBestOption();

    if (!currentRegimeResult || !bestOption) return null;

    const economiaAnual = Math.max(0, currentRegimeResult.impostos.total - bestOption.impostos.total);
    const economiaPercentual = economiaAnual / currentRegimeResult.impostos.total;

    return {
      economiaAnual,
      economiaPercentual,
      economiaProjetada12Meses: economiaAnual,
      regimeAtualCusto: currentRegimeResult.impostos.total,
      melhorRegimeCusto: bestOption.impostos.total,
      paybackPeriod: undefined // TODO: Implementar se houver custos de transição
    };
  }, [results, lastCompanyData, comparison, getBestOption]);

  // ==================== MEMOIZED VALUES ====================

  const memoizedReturn = useMemo((): UseTaxCalculationReturn => ({
    isCalculating,
    results,
    comparison,
    error,
    calculate,
    clear,
    retry,
    getBestOption,
    getEconomyAnalysis
  }), [
    isCalculating,
    results,
    comparison,
    error,
    calculate,
    clear,
    retry,
    getBestOption,
    getEconomyAnalysis
  ]);

  return memoizedReturn;
}

// ==================== HELPER FUNCTIONS ====================

function generateNextActions(data: CompanyData, optimalRegime: TaxCalculationResult): string[] {
  const actions: string[] = [];

  // Ações baseadas no regime atual vs ótimo
  if (data.regimeAtual !== optimalRegime.regime) {
    actions.push(`Considerar mudança para ${optimalRegime.regime.replace('_', ' ').toUpperCase()}`);
    actions.push('Consultar contador para análise detalhada da transição');
    actions.push('Avaliar custos operacionais da mudança');
  } else {
    actions.push('Regime atual já é o mais adequado - manter');
    actions.push('Acompanhar mudanças na legislação');
  }

  // Ações por regime
  switch (optimalRegime.regime) {
    case 'mei':
      actions.push('Monitorar faturamento para não ultrapassar limite de R$ 81.000/ano');
      actions.push('Considerar crescimento futuro e planejamento de transição');
      break;

    case 'simples_nacional':
      actions.push('Acompanhar faturamento para otimizar faixa de tributação');
      actions.push('Revisar enquadramento anualmente');
      break;

    case 'lucro_presumido':
      actions.push('Monitorar margem de lucro vs margem presumida');
      actions.push('Considerar mudança para Lucro Real se margem real for muito superior');
      break;

    case 'lucro_real':
      actions.push('Investir em estrutura contábil adequada');
      actions.push('Aproveitar benefícios de créditos PIS/COFINS');
      actions.push('Implementar controles rigorosos de receitas e despesas');
      break;
  }

  // Ações gerais
  actions.push('Realizar nova simulação a cada 6 meses');
  actions.push('Manter documentação fiscal organizada');

  return actions.slice(0, 6); // Máximo 6 ações
}

// ==================== ADVANCED ELIGIBILITY HOOK ====================

export function useEligibilityCheck() {
  const [eligibilityResults, setEligibilityResults] = useState<Record<string, EligibilityCheck>>({});
  const [isChecking, setIsChecking] = useState(false);

  const checkEligibility = useCallback(async (data: CompanyData) => {
    setIsChecking(true);

    try {
      const regimes = ['mei', 'simples_nacional', 'lucro_presumido', 'lucro_real'] as const;
      const results: Record<string, EligibilityCheck> = {};

      for (const regime of regimes) {
        results[regime] = checkAdvancedEligibility(data, regime);
      }

      setEligibilityResults(results);
    } catch (error) {
      console.error('Erro ao verificar elegibilidade:', error);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const getEligibilityForRegime = useCallback((regime: string): EligibilityCheck | null => {
    return eligibilityResults[regime] || null;
  }, [eligibilityResults]);

  return {
    eligibilityResults,
    isChecking,
    checkEligibility,
    getEligibilityForRegime
  };
}

// ==================== VALIDATION HOOK ====================

export function useAdvancedValidation() {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const validate = useCallback((data: Partial<CompanyData>): ValidationResult => {
    const result = validateAdvancedCompanyData(data);
    setValidationResult(result);
    return result;
  }, []);

  const isFieldValid = useCallback((field: string): boolean => {
    return !validationResult?.errors[field];
  }, [validationResult]);

  const getFieldError = useCallback((field: string): string | null => {
    return validationResult?.errors[field] || null;
  }, [validationResult]);

  return {
    validationResult,
    validate,
    isFieldValid,
    getFieldError
  };
}