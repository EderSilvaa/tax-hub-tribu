/**
 * Tax Simulator Schemas - Validação com Zod
 *
 * Schemas de validação robustos seguindo o design system TaxHub
 */

import { z } from 'zod';
import { TaxRegime, ActivityType, BusinessSector, StartupStage } from './types';
import { LIMITS, BRAZILIAN_STATES } from './constants';

// ==================== VALIDATION HELPERS ====================

const brazilianStateSchema = z.string().refine(
  (state) => BRAZILIAN_STATES.some(s => s.code === state),
  { message: 'Estado brasileiro inválido' }
);

const positiveNumber = z.number().positive('Deve ser um número positivo');
const nonNegativeNumber = z.number().min(0, 'Deve ser um número não negativo');

// ==================== BASIC SCHEMAS ====================

export const taxRegimeSchema = z.nativeEnum(TaxRegime);
export const activityTypeSchema = z.nativeEnum(ActivityType);
export const businessSectorSchema = z.nativeEnum(BusinessSector);
export const startupStageSchema = z.nativeEnum(StartupStage);

// ==================== COMPANY DATA SCHEMA ====================

// Base schema without refine (so we can use .partial())
const companyDataBaseSchema = z.object({
  // Dados básicos obrigatórios
  faturamentoAnual: z.number()
    .min(0, 'Faturamento deve ser não negativo')
    .max(1000000000, 'Faturamento muito alto para simulação'),

  atividade: activityTypeSchema,

  setor: businessSectorSchema,

  regimeAtual: taxRegimeSchema,

  estadoOperacao: brazilianStateSchema,

  numeroFuncionarios: z.number()
    .int('Deve ser um número inteiro')
    .min(0, 'Número de funcionários deve ser não negativo')
    .max(10000, 'Número muito alto de funcionários'),

  // Dados opcionais
  startupStage: startupStageSchema.optional(),

  lucroLiquido: z.number()
    .min(0, 'Lucro líquido deve ser não negativo')
    .optional(),

  folhaPagamento: z.number()
    .min(0, 'Folha de pagamento deve ser não negativa')
    .optional(),

  exportacao: z.number()
    .min(0, 'Valor de exportação deve ser não negativo')
    .optional(),

  // Meta informações
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

// Full schema with business validations
export const companyDataSchema = companyDataBaseSchema.refine(
  (data) => {
    // Validação de negócio: exportação não pode ser maior que faturamento
    if (data.exportacao && data.exportacao > data.faturamentoAnual) {
      return false;
    }
    return true;
  },
  {
    message: 'Valor de exportação não pode ser maior que o faturamento anual',
    path: ['exportacao']
  }
).refine(
  (data) => {
    // Validação de negócio: lucro não pode ser maior que faturamento
    if (data.lucroLiquido && data.lucroLiquido > data.faturamentoAnual) {
      return false;
    }
    return true;
  },
  {
    message: 'Lucro líquido não pode ser maior que o faturamento anual',
    path: ['lucroLiquido']
  }
);

// ==================== TAX BREAKDOWN SCHEMA ====================

export const taxBreakdownSchema = z.object({
  // Impostos federais
  irpj: nonNegativeNumber.optional(),
  csll: nonNegativeNumber.optional(),
  pis: nonNegativeNumber.optional(),
  cofins: nonNegativeNumber.optional(),
  cpp: nonNegativeNumber.optional(),

  // Impostos estaduais/municipais
  icms: nonNegativeNumber.optional(),
  iss: nonNegativeNumber.optional(),

  // Simples Nacional (unificado)
  simplesNacional: nonNegativeNumber.optional(),

  // Total obrigatório
  total: positiveNumber,
  aliquotaEfetiva: z.number()
    .min(0, 'Alíquota efetiva deve ser não negativa')
    .max(1, 'Alíquota efetiva não pode ser maior que 100%')
});

// ==================== TAX CALCULATION RESULT SCHEMA ====================

export const taxCalculationResultSchema = z.object({
  regime: taxRegimeSchema,
  impostos: taxBreakdownSchema,

  // Análise comparativa
  economia: nonNegativeNumber.optional(),
  economiaPercentual: z.number()
    .min(0, 'Percentual de economia deve ser não negativo')
    .max(1, 'Percentual de economia não pode ser maior que 100%')
    .optional(),

  // Características do regime
  vantagens: z.array(z.string().min(1, 'Vantagem não pode estar vazia')),
  desvantagens: z.array(z.string().min(1, 'Desvantagem não pode estar vazia')),
  limitacoes: z.array(z.string().min(1, 'Limitação não pode estar vazia')),

  // Elegibilidade
  elegivel: z.boolean(),
  motivoInelegibilidade: z.string().optional(),

  // Recomendações
  recomendado: z.boolean(),
  scoreRecomendacao: z.number()
    .min(0, 'Score deve ser entre 0 e 100')
    .max(100, 'Score deve ser entre 0 e 100'),

  // Meta informações
  calculadoEm: z.date(),
  validoAte: z.date().optional()
});

// ==================== TAX COMPARISON SCHEMA ====================

export const taxComparisonSchema = z.object({
  empresa: companyDataSchema,
  resultados: z.array(taxCalculationResultSchema).min(1, 'Deve haver pelo menos um resultado'),
  melhorOpcao: taxRegimeSchema,
  economiaMaxima: nonNegativeNumber,

  // Insights
  insights: z.array(z.string().min(1, 'Insight não pode estar vazio')),
  alertas: z.array(z.string().min(1, 'Alerta não pode estar vazio')),
  proximasAcoes: z.array(z.string().min(1, 'Próxima ação não pode estar vazia')),

  // Metadados
  id: z.string().min(1, 'ID é obrigatório'),
  createdAt: z.date(),
  expiresAt: z.date()
});

// ==================== FORM VALIDATION SCHEMAS ====================

export const companyFormStepSchema = z.object({
  step: z.number().min(1).max(4),
  isValid: z.boolean(),
  errors: z.record(z.string()).optional()
});

// TODO: Fix circular dependency issue with companyDataSchema.partial()
// export const simulationEventSchema = z.object({
//   type: z.enum([
//     'calculation_started',
//     'calculation_completed',
//     'regime_selected',
//     'pdf_exported',
//     'simulation_shared'
//   ]),
//   data: z.object({
//     companyData: companyDataSchema.partial().optional(),
//     selectedRegime: taxRegimeSchema.optional(),
//     economyAmount: nonNegativeNumber.optional(),
//     timestamp: z.date(),
//     sessionId: z.string().min(1),
//     userId: z.string().optional()
//   })
// });

// ==================== VALIDATION FUNCTIONS ====================

export function validateCompanyData(data: unknown) {
  return companyDataSchema.safeParse(data);
}

export function validateTaxCalculationResult(data: unknown) {
  return taxCalculationResultSchema.safeParse(data);
}

export function validateTaxComparison(data: unknown) {
  return taxComparisonSchema.safeParse(data);
}

// ==================== PARTIAL SCHEMAS FOR FORMS ====================

export const companyDataFormSchema = companyDataBaseSchema.partial({
  createdAt: true,
  updatedAt: true,
  startupStage: true,
  lucroLiquido: true,
  folhaPagamento: true,
  exportacao: true
});

export const companyDataRequiredSchema = companyDataBaseSchema.pick({
  faturamentoAnual: true,
  atividade: true,
  setor: true,
  regimeAtual: true,
  estadoOperacao: true,
  numeroFuncionarios: true
});

// ==================== STEP VALIDATION ====================

export const step1Schema = z.object({
  faturamentoAnual: z.number().min(0, 'Faturamento deve ser não negativo'),
  atividade: activityTypeSchema,
  setor: businessSectorSchema
});

export const step2Schema = z.object({
  regimeAtual: taxRegimeSchema,
  estadoOperacao: brazilianStateSchema,
  numeroFuncionarios: nonNegativeNumber
});

export const step3Schema = z.object({
  startupStage: startupStageSchema.optional(),
  lucroLiquido: nonNegativeNumber.optional(),
  folhaPagamento: nonNegativeNumber.optional(),
  exportacao: nonNegativeNumber.optional()
});

// ==================== BUSINESS RULES VALIDATION ====================

export function validateBusinessRules(data: z.infer<typeof companyDataSchema>) {
  const errors: string[] = [];

  // MEI: máximo 1 funcionário
  if (data.numeroFuncionarios > 1) {
    const meiLimit = LIMITS.MEI;
    if (data.faturamentoAnual <= meiLimit.MAX_REVENUE) {
      if (data.numeroFuncionarios > (meiLimit.MAX_EMPLOYEES ?? 1)) {
        errors.push('MEI permite no máximo 1 funcionário');
      }
    }
  }

  // Simples Nacional: limite de faturamento
  if (data.faturamentoAnual > LIMITS.SIMPLES_NACIONAL.MAX_REVENUE) {
    errors.push('Faturamento acima do limite do Simples Nacional');
  }

  // Atividades financeiras não podem ser Simples Nacional
  if (data.atividade === ActivityType.FINANCEIRO &&
      data.regimeAtual === TaxRegime.SIMPLES_NACIONAL) {
    errors.push('Atividades financeiras não podem optar pelo Simples Nacional');
  }

  return errors;
}

// ==================== TYPE EXPORTS ====================

export type CompanyDataForm = z.infer<typeof companyDataFormSchema>;
export type CompanyDataRequired = z.infer<typeof companyDataRequiredSchema>;
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type TaxBreakdownValidated = z.infer<typeof taxBreakdownSchema>;
export type TaxCalculationResultValidated = z.infer<typeof taxCalculationResultSchema>;
export type TaxComparisonValidated = z.infer<typeof taxComparisonSchema>;
// export type SimulationEventValidated = z.infer<typeof simulationEventSchema>;

// ==================== ERROR HELPERS ====================

export function formatZodErrors(errors: z.ZodError): Record<string, string> {
  const formatted: Record<string, string> = {};

  errors.errors.forEach(error => {
    const path = error.path.join('.');
    formatted[path] = error.message;
  });

  return formatted;
}

export function getFirstZodError(errors: z.ZodError): string | null {
  return errors.errors[0]?.message || null;
}

// ==================== RUNTIME TYPE GUARDS ====================

export function isValidTaxRegime(value: unknown): value is TaxRegime {
  return Object.values(TaxRegime).includes(value as TaxRegime);
}

export function isValidActivityType(value: unknown): value is ActivityType {
  return Object.values(ActivityType).includes(value as ActivityType);
}

export function isValidBusinessSector(value: unknown): value is BusinessSector {
  return Object.values(BusinessSector).includes(value as BusinessSector);
}