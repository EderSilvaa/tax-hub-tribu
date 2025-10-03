/**
 * Tax Simulator Utils - Validações e Utilities
 *
 * Funções utilitárias para validação de dados, formatação e helpers
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  CompanyData,
  TaxRegime,
  ActivityType,
  BusinessSector,
  ValidationRule,
  TaxCalculationResult
} from './types';
import {
  LIMITS,
  ACTIVITY_TYPES,
  TAX_REGIMES,
  VALIDATION_MESSAGES,
  BRAZILIAN_STATES
} from './constants';

// ==================== UTILITY FUNCTIONS ====================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==================== FORMATTING FUNCTIONS ====================

export function formatCurrency(value: number, options: { compact?: boolean } = {}): string {
  const { compact = false } = options;

  if (compact && value >= 1000000) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatPercentage(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

export function formatNumber(value: number, options: { compact?: boolean } = {}): string {
  const { compact = false } = options;

  return new Intl.NumberFormat('pt-BR', {
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0
  }).format(value);
}

export function parseCurrency(value: string): number {
  if (!value) return 0;

  // Remove símbolos de moeda e espaços
  let cleaned = value.replace(/[R$\s]/g, '');

  // Se tem vírgula, assume formato brasileiro (123.456,78)
  if (cleaned.includes(',')) {
    // Remove pontos (separador de milhares) e substitui vírgula por ponto decimal
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  }
  // Se não tem vírgula mas tem ponto, pode ser formato americano ou separador de milhares
  else if (cleaned.includes('.')) {
    // Se o ponto está nas últimas 3 posições, é decimal (1000.50)
    // Se não, é separador de milhares (1.000)
    const lastDotIndex = cleaned.lastIndexOf('.');
    if (cleaned.length - lastDotIndex === 3) {
      // É decimal, mantém apenas o último ponto
      const parts = cleaned.split('.');
      const integer = parts.slice(0, -1).join('');
      const decimal = parts[parts.length - 1];
      cleaned = integer + '.' + decimal;
    } else {
      // São separadores de milhares, remove todos os pontos
      cleaned = cleaned.replace(/\./g, '');
    }
  }

  const result = parseFloat(cleaned) || 0;
  return Math.max(0, result); // Garante que não seja negativo
}

// ==================== VALIDATION FUNCTIONS ====================

export function validateCNPJ(cnpj: string): boolean {
  // Remove formatação
  const cleaned = cnpj.replace(/[^\d]/g, '');

  if (cleaned.length !== 14) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleaned)) return false;

  // Validação dos dígitos verificadores
  let sum = 0;
  let pos = 5;

  // Primeiro dígito verificador
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleaned.charAt(i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(cleaned.charAt(12)) !== digit) return false;

  // Segundo dígito verificador
  sum = 0;
  pos = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleaned.charAt(i)) * pos--;
    if (pos < 2) pos = 9;
  }

  digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return parseInt(cleaned.charAt(13)) === digit;
}

export function validateCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/[^\d]/g, '');

  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  // Validação dos dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }

  let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(cleaned.charAt(9)) !== digit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }

  digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return parseInt(cleaned.charAt(10)) === digit;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[^\d]/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

// ==================== BUSINESS VALIDATION ====================

export function isEligibleForRegime(data: CompanyData, regime: TaxRegime): boolean {
  const limits = LIMITS[regime.toUpperCase() as keyof typeof LIMITS];
  if (!limits) return false;

  // Verifica limite de faturamento
  if (data.faturamentoAnual > limits.MAX_REVENUE) {
    return false;
  }

  // Verifica atividades proibidas
  if ('FORBIDDEN_ACTIVITIES' in limits && limits.FORBIDDEN_ACTIVITIES?.includes(data.atividade)) {
    return false;
  }

  // Verifica atividades permitidas (MEI)
  if ('ACTIVITIES_ALLOWED' in limits && limits.ACTIVITIES_ALLOWED &&
      !limits.ACTIVITIES_ALLOWED.includes(data.atividade)) {
    return false;
  }

  return true;
}

export function getEligibilityReason(data: CompanyData, regime: TaxRegime): string | null {
  const limits = LIMITS[regime.toUpperCase() as keyof typeof LIMITS];
  if (!limits) return 'Regime não reconhecido';

  if (data.faturamentoAnual > limits.MAX_REVENUE) {
    return VALIDATION_MESSAGES.REVENUE_TOO_HIGH(
      TAX_REGIMES[regime].name,
      limits.MAX_REVENUE
    );
  }

  if ('FORBIDDEN_ACTIVITIES' in limits && limits.FORBIDDEN_ACTIVITIES?.includes(data.atividade)) {
    return VALIDATION_MESSAGES.ACTIVITY_NOT_ALLOWED(TAX_REGIMES[regime].name);
  }

  if ('ACTIVITIES_ALLOWED' in limits && limits.ACTIVITIES_ALLOWED &&
      !limits.ACTIVITIES_ALLOWED.includes(data.atividade)) {
    return VALIDATION_MESSAGES.ACTIVITY_NOT_ALLOWED(TAX_REGIMES[regime].name);
  }

  return null;
}

// ==================== COMPANY DATA VALIDATION ====================

export const companyDataValidationRules: ValidationRule[] = [
  {
    field: 'faturamentoAnual',
    rule: (value: number) => value > 0,
    message: 'Faturamento deve ser maior que zero'
  },
  {
    field: 'faturamentoAnual',
    rule: (value: number) => value <= 1000000000, // 1 bilhão
    message: 'Faturamento muito alto para simulação'
  },
  {
    field: 'atividade',
    rule: (value: ActivityType) => Object.values(ActivityType).includes(value),
    message: 'Atividade inválida'
  },
  {
    field: 'setor',
    rule: (value: BusinessSector) => Object.values(BusinessSector).includes(value),
    message: 'Setor inválido'
  },
  {
    field: 'regimeAtual',
    rule: (value: TaxRegime) => Object.values(TaxRegime).includes(value),
    message: 'Regime atual inválido'
  },
  {
    field: 'estadoOperacao',
    rule: (value: string) => BRAZILIAN_STATES.some(state => state.code === value),
    message: 'Estado inválido'
  },
  {
    field: 'numeroFuncionarios',
    rule: (value: number) => value >= 0,
    message: 'Número de funcionários deve ser positivo'
  },
  {
    field: 'numeroFuncionarios',
    rule: (value: number) => value <= 10000,
    message: 'Número de funcionários muito alto'
  }
];

export function validateCompanyData(data: Partial<CompanyData>): Record<string, string> {
  const errors: Record<string, string> = {};

  companyDataValidationRules.forEach(rule => {
    const value = data[rule.field];

    if (value === undefined || value === null || value === '') {
      errors[rule.field] = VALIDATION_MESSAGES.REQUIRED;
      return;
    }

    if (typeof rule.rule === 'function') {
      const isValid = rule.rule(value, data as CompanyData);
      if (isValid === false || typeof isValid === 'string') {
        errors[rule.field] = typeof isValid === 'string' ? isValid : rule.message;
      }
    }
  });

  return errors;
}

// ==================== ACTIVITY HELPERS ====================

export function getActivityBySector(sector: BusinessSector): ActivityType[] {
  return Object.values(ActivityType).filter(activity =>
    ACTIVITY_TYPES[activity].setor === sector
  );
}

export function getAnexoByActivity(activity: ActivityType): number | null {
  return ACTIVITY_TYPES[activity].anexoSimples;
}

export function getActivityInfo(activity: ActivityType) {
  return ACTIVITY_TYPES[activity];
}

export function getSectorInfo(sector: BusinessSector) {
  return ACTIVITY_TYPES[Object.values(ActivityType).find(a =>
    ACTIVITY_TYPES[a].setor === sector
  ) as ActivityType];
}

// ==================== REGIME HELPERS ====================

export function getRecommendedRegime(data: CompanyData): TaxRegime {
  // MEI - se elegível e faturamento baixo
  if (isEligibleForRegime(data, TaxRegime.MEI) && data.faturamentoAnual <= 81000) {
    return TaxRegime.MEI;
  }

  // Simples Nacional - se elegível
  if (isEligibleForRegime(data, TaxRegime.SIMPLES_NACIONAL)) {
    return TaxRegime.SIMPLES_NACIONAL;
  }

  // Lucro Presumido - padrão para médias empresas
  if (isEligibleForRegime(data, TaxRegime.LUCRO_PRESUMIDO)) {
    return TaxRegime.LUCRO_PRESUMIDO;
  }

  // Lucro Real - obrigatório ou única opção
  return TaxRegime.LUCRO_REAL;
}

export function getBestOptionFromResults(results: TaxCalculationResult[]): TaxCalculationResult | null {
  if (!results.length) return null;

  // Filtra apenas regimes elegíveis
  const eligible = results.filter(r => r.elegivel);
  if (!eligible.length) return null;

  // Retorna o com menor custo total
  return eligible.reduce((best, current) =>
    current.impostos.total < best.impostos.total ? current : best
  );
}

// ==================== CALCULATION HELPERS ====================

export function calculateEffectiveRate(taxValue: number, revenue: number): number {
  if (revenue === 0) return 0;
  return taxValue / revenue;
}

export function calculateEconomy(currentRegimeCost: number, newRegimeCost: number): {
  absolute: number;
  percentage: number;
} {
  const absolute = Math.max(0, currentRegimeCost - newRegimeCost);
  const percentage = currentRegimeCost > 0 ? absolute / currentRegimeCost : 0;

  return { absolute, percentage };
}

export function calculatePaybackPeriod(
  monthlySavings: number,
  implementationCost: number
): number | null {
  if (monthlySavings <= 0) return null;
  return implementationCost / monthlySavings;
}

// ==================== STATE HELPERS ====================

export function getStateByCode(code: string) {
  return BRAZILIAN_STATES.find(state => state.code === code);
}

export function getStatesByRegion(region: string) {
  return BRAZILIAN_STATES.filter(state => state.region === region);
}

// ==================== DATE HELPERS ====================

export function isValidTaxYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  return year >= 2020 && year <= currentYear + 1;
}

export function getTaxYear(): number {
  return new Date().getFullYear();
}

// ==================== COMPARISON HELPERS ====================

export function compareRegimes(regime1: TaxCalculationResult, regime2: TaxCalculationResult) {
  return {
    savings: Math.abs(regime1.impostos.total - regime2.impostos.total),
    betterOption: regime1.impostos.total < regime2.impostos.total ? regime1.regime : regime2.regime,
    percentageDifference: Math.abs(
      (regime1.impostos.total - regime2.impostos.total) /
      Math.max(regime1.impostos.total, regime2.impostos.total)
    )
  };
}

// ==================== ERROR HELPERS ====================

export function createValidationError(field: string, message: string) {
  return new Error(`Validation error on ${field}: ${message}`);
}

export function formatValidationErrors(errors: Record<string, string>): string {
  return Object.entries(errors)
    .map(([field, message]) => `${field}: ${message}`)
    .join(', ');
}

// ==================== DEBOUNCE UTILITY ====================

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// ==================== LOCAL STORAGE HELPERS ====================

export function saveToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error);
  }
}

// ==================== ID GENERATION ====================

export function generateId(): string {
  return `txh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}