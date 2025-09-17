/**
 * Tax Tables - Tabelas Tributárias Oficiais 2024
 *
 * Tabelas com valores oficiais da Receita Federal para cálculos precisos
 * Seguindo o design system TaxHub
 */

import { TaxRegime, BusinessSector, ActivityType } from './types';

// ==================== INTERFACES PARA TABELAS ====================

export interface SimplesNacionalBracket {
  faixaInicial: number;     // Valor inicial da faixa
  faixaFinal: number;       // Valor final da faixa
  aliquota: number;         // Alíquota nominal
  valorDeducao: number;     // Valor a deduzir

  // Breakdown dos impostos (em %)
  irpj: number;
  csll: number;
  cofins: number;
  pis: number;
  cpp: number;
  icms?: number;            // Só anexos I e II
  isi?: number;             // Só anexos IV e V
  iss?: number;             // Só anexos III, IV e V
}

export interface LucroPresumidoRates {
  atividade: ActivityType;
  marginIRPJ: number;       // Margem presumida IRPJ
  marginCSLL: number;       // Margem presumida CSLL
  aliquotaIRPJ: number;     // 15% + adicional se aplicável
  aliquotaCSLL: number;     // 9%
  aliquotaPIS: number;      // 0,65%
  aliquotaCOFINS: number;   // 3%
  observacoes?: string[];
}

export interface MEITable {
  setor: BusinessSector;
  valorMensal: number;      // Valor fixo mensal DAS-MEI
  breakdown: {
    inss: number;           // Valor INSS
    icms?: number;          // Valor ICMS (comércio/indústria)
    iss?: number;           // Valor ISS (serviços)
  };
}

// ==================== SIMPLES NACIONAL 2024 ====================

/**
 * ANEXO I - COMÉRCIO
 * Atividades de comércio
 */
export const SIMPLES_ANEXO_I: SimplesNacionalBracket[] = [
  {
    faixaInicial: 0,
    faixaFinal: 180000,
    aliquota: 4.0,
    valorDeducao: 0,
    irpj: 0.0,
    csll: 0.0,
    cofins: 0.0,
    pis: 0.0,
    cpp: 2.75,
    icms: 1.25
  },
  {
    faixaInicial: 180000.01,
    faixaFinal: 360000,
    aliquota: 7.3,
    valorDeducao: 5940,
    irpj: 0.0,
    csll: 0.0,
    cofins: 0.86,
    pis: 0.0,
    cpp: 2.75,
    icms: 1.86
  },
  {
    faixaInicial: 360000.01,
    faixaFinal: 720000,
    aliquota: 9.5,
    valorDeducao: 13860,
    irpj: 0.24,
    csll: 0.0,
    cofins: 0.86,
    pis: 0.0,
    cpp: 2.75,
    icms: 2.75
  },
  {
    faixaInicial: 720000.01,
    faixaFinal: 1800000,
    aliquota: 10.7,
    valorDeducao: 22500,
    irpj: 0.27,
    csll: 0.0,
    cofins: 0.86,
    pis: 0.0,
    cpp: 2.75,
    icms: 2.75
  },
  {
    faixaInicial: 1800000.01,
    faixaFinal: 3600000,
    aliquota: 14.3,
    valorDeducao: 87300,
    irpj: 0.35,
    csll: 0.0,
    cofins: 1.79,
    pis: 0.0,
    cpp: 2.75,
    icms: 3.5
  },
  {
    faixaInicial: 3600000.01,
    faixaFinal: 4800000,
    aliquota: 19.0,
    valorDeducao: 378000,
    irpj: 0.35,
    csll: 0.0,
    cofins: 1.79,
    pis: 0.0,
    cpp: 2.75,
    icms: 3.5
  }
];

/**
 * ANEXO III - SERVIÇOS EM GERAL
 * Atividades de prestação de serviços
 */
export const SIMPLES_ANEXO_III: SimplesNacionalBracket[] = [
  {
    faixaInicial: 0,
    faixaFinal: 180000,
    aliquota: 6.0,
    valorDeducao: 0,
    irpj: 4.0,
    csll: 3.5,
    cofins: 0.0,
    pis: 0.0,
    cpp: 43.4,
    iss: 2.0
  },
  {
    faixaInicial: 180000.01,
    faixaFinal: 360000,
    aliquota: 11.2,
    valorDeducao: 9360,
    irpj: 4.0,
    csll: 3.5,
    cofins: 1.38,
    pis: 0.0,
    cpp: 43.4,
    iss: 2.0
  },
  {
    faixaInicial: 360000.01,
    faixaFinal: 720000,
    aliquota: 13.5,
    valorDeducao: 17640,
    irpj: 4.0,
    csll: 3.5,
    cofins: 1.38,
    pis: 0.0,
    cpp: 43.4,
    iss: 2.0
  },
  {
    faixaInicial: 720000.01,
    faixaFinal: 1800000,
    aliquota: 16.0,
    valorDeducao: 35640,
    irpj: 4.0,
    csll: 3.5,
    cofins: 1.38,
    pis: 0.0,
    cpp: 43.4,
    iss: 2.0
  },
  {
    faixaInicial: 1800000.01,
    faixaFinal: 3600000,
    aliquota: 21.0,
    valorDeducao: 125640,
    irpj: 4.0,
    csll: 3.5,
    cofins: 1.84,
    pis: 0.0,
    cpp: 43.4,
    iss: 2.0
  },
  {
    faixaInicial: 3600000.01,
    faixaFinal: 4800000,
    aliquota: 33.0,
    valorDeducao: 648000,
    irpj: 4.0,
    csll: 3.5,
    cofins: 1.84,
    pis: 0.0,
    cpp: 43.4,
    iss: 2.0
  }
];

/**
 * ANEXO IV - SERVIÇOS ESPECÍFICOS
 * Limpeza, vigilância, obras, construção civil
 */
export const SIMPLES_ANEXO_IV: SimplesNacionalBracket[] = [
  {
    faixaInicial: 0,
    faixaFinal: 180000,
    aliquota: 4.5,
    valorDeducao: 0,
    irpj: 0.0,
    csll: 1.22,
    cofins: 1.28,
    pis: 0.0,
    cpp: 20.5,
    isi: 0.0,
    iss: 2.0
  },
  {
    faixaInicial: 180000.01,
    faixaFinal: 360000,
    aliquota: 9.0,
    valorDeducao: 8100,
    irpj: 0.0,
    csll: 1.84,
    cofins: 1.91,
    pis: 0.0,
    cpp: 20.5,
    isi: 0.0,
    iss: 2.0
  },
  {
    faixaInicial: 360000.01,
    faixaFinal: 720000,
    aliquota: 10.2,
    valorDeducao: 12420,
    irpj: 0.16,
    csll: 1.85,
    cofins: 1.95,
    pis: 0.0,
    cpp: 20.5,
    isi: 0.0,
    iss: 2.0
  },
  {
    faixaInicial: 720000.01,
    faixaFinal: 1800000,
    aliquota: 14.0,
    valorDeducao: 39780,
    irpj: 0.52,
    csll: 1.87,
    cofins: 2.99,
    pis: 0.0,
    cpp: 20.5,
    isi: 0.0,
    iss: 2.0
  },
  {
    faixaInicial: 1800000.01,
    faixaFinal: 3600000,
    aliquota: 22.0,
    valorDeducao: 183780,
    irpj: 0.89,
    csll: 1.95,
    cofins: 3.02,
    pis: 0.0,
    cpp: 20.5,
    isi: 0.0,
    iss: 2.0
  },
  {
    faixaInicial: 3600000.01,
    faixaFinal: 4800000,
    aliquota: 33.0,
    valorDeducao: 828000,
    irpj: 0.92,
    csll: 1.99,
    cofins: 3.06,
    pis: 0.0,
    cpp: 20.5,
    isi: 0.0,
    iss: 2.0
  }
];

/**
 * ANEXO V - SERVIÇOS PROFISSIONAIS
 * Advocacia, contabilidade, medicina, engenharia
 */
export const SIMPLES_ANEXO_V: SimplesNacionalBracket[] = [
  {
    faixaInicial: 0,
    faixaFinal: 180000,
    aliquota: 15.5,
    valorDeducao: 0,
    irpj: 25.0,
    csll: 15.0,
    cofins: 14.1,
    pis: 0.0,
    cpp: 28.85,
    iss: 14.0
  },
  {
    faixaInicial: 180000.01,
    faixaFinal: 360000,
    aliquota: 18.0,
    valorDeducao: 4500,
    irpj: 23.0,
    csll: 15.0,
    cofins: 14.1,
    pis: 0.0,
    cpp: 27.85,
    iss: 17.0
  },
  {
    faixaInicial: 360000.01,
    faixaFinal: 720000,
    aliquota: 19.5,
    valorDeducao: 9900,
    irpj: 24.0,
    csll: 15.0,
    cofins: 14.1,
    pis: 0.0,
    cpp: 23.85,
    iss: 19.0
  },
  {
    faixaInicial: 720000.01,
    faixaFinal: 1800000,
    aliquota: 20.5,
    valorDeducao: 17100,
    irpj: 21.0,
    csll: 15.0,
    cofins: 14.1,
    pis: 0.0,
    cpp: 23.85,
    iss: 21.0
  },
  {
    faixaInicial: 1800000.01,
    faixaFinal: 3600000,
    aliquota: 23.0,
    valorDeducao: 62100,
    irpj: 23.0,
    csll: 15.0,
    cofins: 14.1,
    pis: 0.0,
    cpp: 23.85,
    iss: 23.0
  },
  {
    faixaInicial: 3600000.01,
    faixaFinal: 4800000,
    aliquota: 30.5,
    valorDeducao: 540000,
    irpj: 35.0,
    csll: 15.0,
    cofins: 14.1,
    pis: 0.0,
    cpp: 23.85,
    iss: 30.5
  }
];

// ==================== LUCRO PRESUMIDO 2024 ====================

export const LUCRO_PRESUMIDO_RATES: LucroPresumidoRates[] = [
  {
    atividade: ActivityType.COMERCIO_VAREJO,
    marginIRPJ: 0.08,        // 8%
    marginCSLL: 0.12,        // 12%
    aliquotaIRPJ: 0.15,      // 15%
    aliquotaCSLL: 0.09,      // 9%
    aliquotaPIS: 0.0065,     // 0,65%
    aliquotaCOFINS: 0.03,    // 3%
    observacoes: ['Adicional de 10% no IRPJ sobre parcela que exceder R$ 20.000/mês']
  },
  {
    atividade: ActivityType.COMERCIO_ATACADO,
    marginIRPJ: 0.08,        // 8%
    marginCSLL: 0.12,        // 12%
    aliquotaIRPJ: 0.15,      // 15%
    aliquotaCSLL: 0.09,      // 9%
    aliquotaPIS: 0.0065,     // 0,65%
    aliquotaCOFINS: 0.03,    // 3%
    observacoes: ['Adicional de 10% no IRPJ sobre parcela que exceder R$ 20.000/mês']
  },
  {
    atividade: ActivityType.INDUSTRIA_GERAL,
    marginIRPJ: 0.08,        // 8%
    marginCSLL: 0.12,        // 12%
    aliquotaIRPJ: 0.15,      // 15%
    aliquotaCSLL: 0.09,      // 9%
    aliquotaPIS: 0.0065,     // 0,65%
    aliquotaCOFINS: 0.03,    // 3%
    observacoes: ['Adicional de 10% no IRPJ sobre parcela que exceder R$ 20.000/mês']
  },
  {
    atividade: ActivityType.SERVICOS_GERAIS,
    marginIRPJ: 0.32,        // 32%
    marginCSLL: 0.32,        // 32%
    aliquotaIRPJ: 0.15,      // 15%
    aliquotaCSLL: 0.09,      // 9%
    aliquotaPIS: 0.0065,     // 0,65%
    aliquotaCOFINS: 0.03,    // 3%
    observacoes: ['Adicional de 10% no IRPJ sobre parcela que exceder R$ 20.000/mês']
  },
  {
    atividade: ActivityType.TECNOLOGIA,
    marginIRPJ: 0.32,        // 32%
    marginCSLL: 0.32,        // 32%
    aliquotaIRPJ: 0.15,      // 15%
    aliquotaCSLL: 0.09,      // 9%
    aliquotaPIS: 0.0065,     // 0,65%
    aliquotaCOFINS: 0.03,    // 3%
    observacoes: [
      'Adicional de 10% no IRPJ sobre parcela que exceder R$ 20.000/mês',
      'Possível enquadramento na Lei do Bem',
      'Verificar benefícios da Lei de Informática'
    ]
  },
  {
    atividade: ActivityType.CONSULTORIA,
    marginIRPJ: 0.32,        // 32%
    marginCSLL: 0.32,        // 32%
    aliquotaIRPJ: 0.15,      // 15%
    aliquotaCSLL: 0.09,      // 9%
    aliquotaPIS: 0.0065,     // 0,65%
    aliquotaCOFINS: 0.03,    // 3%
    observacoes: ['Adicional de 10% no IRPJ sobre parcela que exceder R$ 20.000/mês']
  },
  {
    atividade: ActivityType.SAUDE,
    marginIRPJ: 0.32,        // 32%
    marginCSLL: 0.32,        // 32%
    aliquotaIRPJ: 0.15,      // 15%
    aliquotaCSLL: 0.09,      // 9%
    aliquotaPIS: 0.0065,     // 0,65%
    aliquotaCOFINS: 0.03,    // 3%
    observacoes: [
      'Adicional de 10% no IRPJ sobre parcela que exceder R$ 20.000/mês',
      'Possível isenção de ISS em alguns municípios'
    ]
  },
  {
    atividade: ActivityType.EDUCACAO,
    marginIRPJ: 0.32,        // 32%
    marginCSLL: 0.32,        // 32%
    aliquotaIRPJ: 0.15,      // 15%
    aliquotaCSLL: 0.09,      // 9%
    aliquotaPIS: 0.0065,     // 0,65%
    aliquotaCOFINS: 0.03,    // 3%
    observacoes: [
      'Adicional de 10% no IRPJ sobre parcela que exceder R$ 20.000/mês',
      'Possível isenção de alguns tributos para educação'
    ]
  },
  {
    atividade: ActivityType.FINANCEIRO,
    marginIRPJ: 0.16,        // 16%
    marginCSLL: 0.20,        // 20%
    aliquotaIRPJ: 0.15,      // 15%
    aliquotaCSLL: 0.09,      // 9%
    aliquotaPIS: 0.0065,     // 0,65%
    aliquotaCOFINS: 0.03,    // 3%
    observacoes: [
      'Adicional de 10% no IRPJ sobre parcela que exceder R$ 20.000/mês',
      'Não pode optar pelo Simples Nacional'
    ]
  }
];

// ==================== LUCRO REAL 2024 ====================

export const LUCRO_REAL_RATES = {
  // Alíquotas básicas
  IRPJ: {
    aliquotaNormal: 0.15,     // 15%
    adicional: 0.10,          // 10% sobre valor acima de R$ 20.000/mês
    limiteMensal: 20000       // R$ 20.000/mês
  },

  CSLL: {
    aliquotaNormal: 0.09,     // 9%
    aliquotaFinanceira: 0.20  // 20% para atividades financeiras
  },

  PIS: {
    cumulativo: 0.0065,       // 0,65% (cumulativo)
    naoCumulativo: 0.0165,    // 1,65% (não cumulativo - regra geral)
    aliquotaZero: 0.0         // 0% para alguns produtos
  },

  COFINS: {
    cumulativo: 0.03,         // 3% (cumulativo)
    naoCumulativo: 0.076,     // 7,6% (não cumulativo - regra geral)
    aliquotaZero: 0.0         // 0% para alguns produtos
  },

  // Observações importantes
  observacoes: [
    'Tributação sobre o lucro líquido real',
    'Permite compensação de prejuízos fiscais',
    'PIS/COFINS não cumulativo permite créditos',
    'Obrigatório para faturamento acima de R$ 78 milhões/ano',
    'Permite dedução de despesas operacionais'
  ]
} as const;

// ==================== MEI 2024 ====================

export const MEI_TABLE: MEITable[] = [
  {
    setor: BusinessSector.COMERCIO,
    valorMensal: 67.60,
    breakdown: {
      inss: 66.60,      // 5% sobre salário mínimo
      icms: 1.00        // R$ 1,00 fixo
    }
  },
  {
    setor: BusinessSector.INDUSTRIA,
    valorMensal: 72.60,
    breakdown: {
      inss: 66.60,      // 5% sobre salário mínimo
      icms: 1.00,       // R$ 1,00 fixo
      iss: 5.00         // R$ 5,00 fixo
    }
  },
  {
    setor: BusinessSector.SERVICOS,
    valorMensal: 71.60,
    breakdown: {
      inss: 66.60,      // 5% sobre salário mínimo
      iss: 5.00         // R$ 5,00 fixo
    }
  }
];

// ==================== MAPEAMENTO DE ANEXOS ====================

export const ANEXO_MAPPING = {
  [BusinessSector.COMERCIO]: SIMPLES_ANEXO_I,
  [BusinessSector.INDUSTRIA]: SIMPLES_ANEXO_I,    // Anexo II não implementado
  [BusinessSector.SERVICOS]: SIMPLES_ANEXO_III,
  [BusinessSector.SERVICOS_ANEXO_IV]: SIMPLES_ANEXO_IV,
  [BusinessSector.SERVICOS_ANEXO_V]: SIMPLES_ANEXO_V
} as const;

// ==================== HELPER FUNCTIONS ====================

export function getSimplesBracketByRevenue(
  revenue: number,
  setor: BusinessSector
): SimplesNacionalBracket | null {
  const anexo = ANEXO_MAPPING[setor];
  if (!anexo) return null;

  return anexo.find(bracket =>
    revenue >= bracket.faixaInicial && revenue <= bracket.faixaFinal
  ) || null;
}

export function getLucroPresumidoRates(
  atividade: ActivityType
): LucroPresumidoRates | null {
  return LUCRO_PRESUMIDO_RATES.find(rate => rate.atividade === atividade) || null;
}

export function getMEIRates(setor: BusinessSector): MEITable | null {
  return MEI_TABLE.find(mei => mei.setor === setor) || null;
}

// ==================== VALIDATION FUNCTIONS ====================

export function isValidForSimples(revenue: number): boolean {
  return revenue > 0 && revenue <= 4800000; // R$ 4,8 milhões
}

export function isValidForMEI(revenue: number): boolean {
  return revenue > 0 && revenue <= 81000; // R$ 81 mil
}

export function isValidForLucroPresumido(revenue: number): boolean {
  return revenue > 0 && revenue <= 78000000; // R$ 78 milhões
}

// ==================== CALCULATION HELPERS ====================

export function calculateSimplesAliquota(
  revenue: number,
  setor: BusinessSector
): number {
  const bracket = getSimplesBracketByRevenue(revenue, setor);
  if (!bracket) return 0;

  // Cálculo progressivo: (Receita x Alíquota - Valor a Deduzir) / Receita
  const taxValue = (revenue * bracket.aliquota / 100) - bracket.valorDeducao;
  return Math.max(0, taxValue / revenue * 100);
}

export function calculateIRPJAdditional(
  monthlyProfit: number,
  basicIRPJ: number
): number {
  if (monthlyProfit <= 20000) return 0;

  const excessProfit = monthlyProfit - 20000;
  return excessProfit * 0.10; // 10% adicional
}

// ==================== EXPORT ALL TABLES ====================

export const TAX_TABLES = {
  SIMPLES_NACIONAL: {
    ANEXO_I: SIMPLES_ANEXO_I,
    ANEXO_III: SIMPLES_ANEXO_III,
    ANEXO_IV: SIMPLES_ANEXO_IV,
    ANEXO_V: SIMPLES_ANEXO_V
  },
  LUCRO_PRESUMIDO: LUCRO_PRESUMIDO_RATES,
  LUCRO_REAL: LUCRO_REAL_RATES,
  MEI: MEI_TABLE,
  HELPERS: {
    getSimplesBracketByRevenue,
    getLucroPresumidoRates,
    getMEIRates,
    calculateSimplesAliquota,
    calculateIRPJAdditional,
    isValidForSimples,
    isValidForMEI,
    isValidForLucroPresumido
  }
} as const;

// ==================== TYPE EXPORTS ====================

export type {
  SimplesNacionalBracket,
  LucroPresumidoRates,
  MEITable
};