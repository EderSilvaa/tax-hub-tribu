/**
 * Tax Simulator Feature - Main Export
 *
 * Centraliza todas as exportações do feature de simulação tributária
 * seguindo o design system e padrões do TaxHub
 */

// ==================== COMPONENTS ====================
export { default as TaxSimulator } from './components/TaxSimulator';
export { default as CompanyDataForm } from './components/CompanyDataForm';
export { default as TaxResults } from './components/TaxResults';
export { default as RegimeCard } from './components/RegimeCard';

// ==================== HOOKS ====================
// export { useTaxCalculation } from './hooks/useTaxCalculation';
// export { useCompanyData } from './hooks/useCompanyData';

// ==================== ENUMS ====================
export {
  TaxRegime,
  BusinessSector,
  ActivityType,
  StartupStage
} from './lib/types';

// ==================== TYPES ====================
export type {
  // Main types
  CompanyData,
  TaxCalculationResult,
  TaxComparison,
  TaxBreakdown,

  // Component Props
  CompanyDataFormProps,
  TaxResultsProps,
  RegimeCardProps,

  // Utility types
  EconomyAnalysis,
  ValidationRule,
  // SimulationEvent,

  // Configuration types
  TaxTable,
  TaxBracket,
  ActivityMapping,

  // Error types
  TaxCalculationError,
  ValidationError
} from './lib/types';

// ==================== TAX CALCULATIONS ====================
export {
  calculateSimplesNacional,
  calculateLucroPresumido,
  calculateLucroReal,
  calculateMEI,
  compareAllRegimes,
  getRecommendedRegime,
  getBestEconomicOption,
  TAX_CALCULATIONS
} from './lib/taxCalculations';

export {
  validateCompanyData,
  formatCurrency,
  formatPercentage,
  getActivityBySector,
  isEligibleForRegime,
  cn,
  parseCurrency,
  formatNumber,
  validateCNPJ,
  validateCPF,
  validateEmail,
  validatePhone,
  getBestOptionFromResults,
  calculateEffectiveRate,
  calculateEconomy,
  debounce,
  saveToLocalStorage,
  loadFromLocalStorage
} from './lib/utils';

// ==================== CONSTANTS ====================
export {
  TAX_REGIMES,
  BUSINESS_SECTORS,
  ACTIVITY_TYPES,
  ACTIVITY_MAPPINGS,
  STARTUP_STAGES,
  BRAZILIAN_STATES,
  TAX_RATES,
  LIMITS,
  VALIDATION_MESSAGES,
  FORM_OPTIONS
} from './lib/constants';

// ==================== TAX TABLES ====================
export {
  TAX_TABLES,
  SIMPLES_ANEXO_I,
  SIMPLES_ANEXO_III,
  SIMPLES_ANEXO_IV,
  SIMPLES_ANEXO_V,
  LUCRO_PRESUMIDO_RATES,
  LUCRO_REAL_RATES,
  MEI_TABLE,
  ANEXO_MAPPING,
  getSimplesBracketByRevenue,
  getLucroPresumidoRates,
  getMEIRates,
  calculateSimplesAliquota,
  calculateIRPJAdditional,
  isValidForSimples,
  isValidForMEI,
  isValidForLucroPresumido
} from './lib/taxTables';

export type {
  SimplesNacionalBracket,
  LucroPresumidoRates,
  MEITable
} from './lib/taxTables';

// ==================== CNAE MAPPING ====================
export {
  CNAE_MAPPING,
  ALL_CNAES,
  CNAE_CATEGORIES,
  POPULAR_CNAES,
  findCNAEByCode,
  findCNAEsByActivity,
  findCNAEsByAnexo,
  searchCNAEByDescription,
  isProhibitedInSimples,
  getAnexoByCNAE,
  validateCNAEForActivity
} from './lib/cnaeMapping';

export type {
  CNAEInfo,
  CNAECategory
} from './lib/cnaeMapping';

// ==================== SCHEMAS ====================
export {
  companyDataSchema,
  taxBreakdownSchema,
  taxCalculationResultSchema,
  taxComparisonSchema,
  companyDataFormSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  validateCompanyData as validateCompanyDataZod,
  validateTaxCalculationResult,
  validateTaxComparison,
  formatZodErrors,
  validateBusinessRules
} from './lib/schemas';

export type {
  CompanyDataForm,
  CompanyDataRequired,
  Step1Data,
  Step2Data,
  Step3Data,
  TaxBreakdownValidated,
  TaxCalculationResultValidated,
  TaxComparisonValidated
} from './lib/schemas';

// ==================== VERSION ====================
export const TAX_SIMULATOR_VERSION = '1.0.0';
export const FEATURE_NAME = 'TaxSimulator';

// ==================== FEATURE INFO ====================
export const FEATURE_INFO = {
  name: FEATURE_NAME,
  version: TAX_SIMULATOR_VERSION,
  description: 'Simulador de regimes tributários para startups e PMEs',
  author: 'TaxHub Team',
  designSystem: {
    colors: ['accent', 'accent-subtle', 'muted-foreground'],
    typography: ['font-sans', 'tracking-tight', 'leading-relaxed'],
    animations: ['animate-fade-in', 'animate-slide-up', 'hover-lift'],
    components: ['glass', 'shadow-soft', 'gradient-primary']
  }
} as const;