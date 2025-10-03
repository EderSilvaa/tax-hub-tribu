/**
 * Tax Simulator Types - Respeitando o Design System TaxHub
 *
 * Cores disponíveis: accent, accent-subtle, muted-foreground
 * Typography: font-sans, tracking-tight, leading-relaxed
 */

// ==================== ENUMS ====================

export enum TaxRegime {
  MEI = 'mei',
  SIMPLES_NACIONAL = 'simples_nacional',
  LUCRO_PRESUMIDO = 'lucro_presumido',
  LUCRO_REAL = 'lucro_real'
}

export enum BusinessSector {
  COMERCIO = 'comercio',           // Anexo I
  INDUSTRIA = 'industria',         // Anexo II
  SERVICOS = 'servicos',           // Anexo III
  SERVICOS_ANEXO_IV = 'servicos_anexo_iv', // Anexo IV
  SERVICOS_ANEXO_V = 'servicos_anexo_v'    // Anexo V
}

export enum ActivityType {
  COMERCIO_VAREJO = 'comercio_varejo',
  COMERCIO_ATACADO = 'comercio_atacado',
  INDUSTRIA_GERAL = 'industria_geral',
  SERVICOS_GERAIS = 'servicos_gerais',
  TECNOLOGIA = 'tecnologia',
  CONSULTORIA = 'consultoria',
  SAUDE = 'saude',
  EDUCACAO = 'educacao',
  FINANCEIRO = 'financeiro',
  OUTROS = 'outros'
}

export enum StartupStage {
  PRE_REVENUE = 'pre_revenue',     // Antes da receita
  MVP = 'mvp',                     // Produto mínimo viável
  GROWTH = 'growth',               // Crescimento
  SCALE = 'scale'                  // Escala
}

// ==================== INTERFACES PRINCIPAIS ====================

export interface CompanyData {
  // Dados básicos
  faturamentoAnual: number;
  atividade: ActivityType;
  setor: BusinessSector;
  regimeAtual: TaxRegime;

  // Localização
  estadoOperacao: string;

  // Estrutura
  numeroFuncionarios: number;

  // Contextual para startups
  startupStage?: StartupStage;
  estagio?: string; // Compatibilidade

  // Dados opcionais para cálculos mais precisos
  lucroLiquido?: number;
  folhaPagamento?: number;
  exportacao?: number;

  // Meta informações
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaxBreakdown {
  // Impostos federais
  irpj?: number;           // Imposto de Renda Pessoa Jurídica
  csll?: number;           // Contribuição Social sobre Lucro Líquido
  pis?: number;            // PIS
  cofins?: number;         // COFINS
  cpp?: number;            // Contribuição Previdenciária Patronal

  // Impostos estaduais/municipais
  icms?: number;           // ICMS (estadual)
  iss?: number;            // ISS (municipal)

  // Simples Nacional (unificado)
  simplesNacional?: number;

  // Total
  total: number;
  aliquotaEfetiva: number; // Percentual sobre faturamento
}

export interface TaxCalculationResult {
  regime: TaxRegime;
  impostos: TaxBreakdown;

  // Análise comparativa
  economia?: number;           // Economia em relação ao regime atual
  economiaPercentual?: number; // % de economia

  // Características do regime
  vantagens: string[];
  desvantagens: string[];
  limitacoes: string[];

  // Elegibilidade
  elegivel: boolean;
  motivoInelegibilidade?: string;

  // Recomendações
  recomendado: boolean;
  scoreRecomendacao: number; // 0-100

  // Meta informações
  calculadoEm: Date;
  validoAte?: Date;
}

export interface TaxComparison {
  empresa: CompanyData;
  resultados: TaxCalculationResult[];
  melhorOpcao: TaxRegime;
  economiaMaxima: number;

  // Insights
  insights: string[];
  alertas: string[];
  proximasAcoes: string[];

  // Metadados
  id: string;
  createdAt: Date;
  expiresAt: Date;
}

// ==================== COMPONENTE PROPS ====================

export interface TaxSimulatorProps {
  // Configurações visuais (seguindo design system)
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';

  // Callbacks
  onCalculationComplete?: (result: TaxComparison) => void;
  onSaveSimulation?: (result: TaxComparison) => void;
  onShareSimulation?: (result: TaxComparison) => void;

  // Dados iniciais (opcional)
  initialData?: Partial<CompanyData>;

  // Configurações
  showAdvancedOptions?: boolean;
  allowSave?: boolean;
  allowShare?: boolean;
}

export interface CompanyDataFormProps {
  initialData?: Partial<CompanyData>;
  onSubmit: (data: CompanyData) => void;
  onCancel?: () => void;

  // Configurações visuais
  className?: string;
  showStepIndicator?: boolean;

  // Estados
  isLoading?: boolean;
  errors?: Record<string, string>;
}

export interface TaxResultsProps {
  results: TaxCalculationResult[];
  companyData: CompanyData;
  comparison?: TaxComparison;

  // Configurações visuais
  className?: string;
  layout?: 'grid' | 'list' | 'comparison';
  showAdvancedInsights?: boolean;

  // Callbacks
  onSelectRegime?: (regime: TaxRegime) => void;
  onShowDetails?: (regime: TaxRegime) => void;
  onExportPDF?: () => void;
  onShare?: () => void;
}

export interface RegimeCardProps {
  result: TaxCalculationResult;
  isBest?: boolean;
  isRecommended?: boolean;
  isSelected?: boolean;

  // Configurações visuais (seguindo design system)
  variant?: 'default' | 'highlighted' | 'compact';
  showDetails?: boolean;
  showAdvancedInsights?: boolean;
  className?: string;

  // Callbacks
  onClick?: () => void;
  onShowDetails?: () => void;
}

// ==================== CONFIGURAÇÕES E CONSTANTES ====================

export interface TaxTable {
  regime: TaxRegime;
  faixas: TaxBracket[];
  validade: {
    inicio: Date;
    fim: Date;
  };
}

export interface TaxBracket {
  min: number;
  max: number;
  aliquota: number;

  // Breakdown para Simples Nacional
  irpj?: number;
  csll?: number;
  cofins?: number;
  pis?: number;
  cpp?: number;
  icms?: number;
  iss?: number;
}

export interface ActivityMapping {
  code: ActivityType;
  name: string;
  description: string;
  anexoSimples?: number; // 1, 2, 3, 4, 5
  cnaeExamples: string[];
  setor: BusinessSector;
}

// ==================== HOOKS TYPES ====================

export interface UseTaxCalculationReturn {
  // Estado
  isCalculating: boolean;
  results: TaxCalculationResult[] | null;
  comparison: TaxComparison | null;
  error: string | null;

  // Ações
  calculate: (data: CompanyData) => Promise<void>;
  clear: () => void;
  retry: () => void;

  // Análises
  getBestOption: () => TaxCalculationResult | null;
  getEconomyAnalysis: () => EconomyAnalysis | null;
}

export interface EconomyAnalysis {
  economiaAnual: number;
  economiaPercentual: number;
  economiaProjetada12Meses: number;
  regimeAtualCusto: number;
  melhorRegimeCusto: number;
  paybackPeriod?: number; // Em meses, se houver custos de mudança
}

export interface UseCompanyDataReturn {
  // Estado
  data: Partial<CompanyData>;
  isValid: boolean;
  errors: Record<string, string>;
  isDirty: boolean;

  // Ações
  updateField: <K extends keyof CompanyData>(field: K, value: CompanyData[K]) => void;
  updateData: (data: Partial<CompanyData>) => void;
  validate: () => boolean;
  reset: () => void;
  save: () => void;
  load: (id: string) => void;

  // Metadados
  lastSaved: Date | null;
}

// ==================== UTILS TYPES ====================

export interface ValidationRule {
  field: keyof CompanyData;
  rule: (value: any, data: CompanyData) => boolean | string;
  message: string;
}

export interface FormattingOptions {
  currency: 'BRL';
  percentage: boolean;
  compact: boolean;
}

// ==================== ANALYTICS TYPES ====================

export interface SimulationEvent {
  type: 'calculation_started' | 'calculation_completed' | 'regime_selected' | 'pdf_exported' | 'simulation_shared';
  data: {
    companyData?: Partial<CompanyData>;
    selectedRegime?: TaxRegime;
    economyAmount?: number;
    timestamp: Date;
    sessionId: string;
    userId?: string;
  };
}

export interface UsageMetrics {
  totalSimulations: number;
  averageEconomy: number;
  popularRegimes: Record<TaxRegime, number>;
  conversionRate: number; // Para upgrade de plano
}

// ==================== ERROR TYPES ====================

export class TaxCalculationError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'TaxCalculationError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public value: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ==================== BUSINESS LOGIC TYPES (Task 2.3) ====================

export interface EligibilityCheck {
  eligible: boolean;
  reason: string | null;
  warnings: string[];
  recommendations: string[];
  blockers: string[];
  score: number; // 0-100
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: string[];
  suggestions: string[];
}

export interface ComparisonAnalysis {
  bestEconomic: TaxCalculationResult;
  bestRecommended: TaxCalculationResult;
  totalSavingsPotential: number;
  savings: Array<{
    regime: TaxRegime;
    savings: number;
    savingsPercentage: number;
    isCurrentBest: boolean;
  }>;
  riskAnalysis: Array<{
    regime: TaxRegime;
    riskLevel: 'baixo' | 'medio' | 'alto';
    risks: string[];
    mitigations: string[];
  }>;
  growthProjections: Array<{
    regime: TaxRegime;
    sustainable: boolean;
    growthLimit?: number;
    projectedTaxAt50PercentGrowth: number;
    projectedTaxAt100PercentGrowth: number;
  }>;
  eligibleCount: number;
  analysisDate: Date;
}