/**
 * Tax Simulator Constants - Enums e Constantes
 *
 * Seguindo o design system TaxHub com valores reais da legislação brasileira
 */

import { TaxRegime, BusinessSector, ActivityType, StartupStage } from './types';

// ==================== REGIMES TRIBUTÁRIOS ====================

export const TAX_REGIMES = {
  [TaxRegime.MEI]: {
    name: 'Microempreendedor Individual',
    shortName: 'MEI',
    description: 'Regime simplificado para faturamento até R$ 81.000/ano',
    maxRevenue: 81000,
    color: 'text-blue-600',
    icon: '👤'
  },
  [TaxRegime.SIMPLES_NACIONAL]: {
    name: 'Simples Nacional',
    shortName: 'Simples',
    description: 'Regime unificado para empresas até R$ 4.8 milhões/ano',
    maxRevenue: 4800000,
    color: 'text-green-600',
    icon: '📊'
  },
  [TaxRegime.LUCRO_PRESUMIDO]: {
    name: 'Lucro Presumido',
    shortName: 'Presumido',
    description: 'Tributação sobre margem presumida de lucro',
    maxRevenue: 78000000,
    color: 'text-orange-600',
    icon: '📈'
  },
  [TaxRegime.LUCRO_REAL]: {
    name: 'Lucro Real',
    shortName: 'Real',
    description: 'Tributação sobre lucro líquido real da empresa',
    maxRevenue: Infinity,
    color: 'text-purple-600',
    icon: '🏢'
  }
} as const;

// ==================== SETORES DE NEGÓCIO ====================

export const BUSINESS_SECTORS = {
  [BusinessSector.COMERCIO]: {
    name: 'Comércio',
    description: 'Compra e venda de mercadorias',
    anexoSimples: 1,
    color: 'text-accent',
    icon: '🛒'
  },
  [BusinessSector.INDUSTRIA]: {
    name: 'Indústria',
    description: 'Fabricação e transformação de produtos',
    anexoSimples: 2,
    color: 'text-accent-subtle',
    icon: '🏭'
  },
  [BusinessSector.SERVICOS]: {
    name: 'Serviços',
    description: 'Prestação de serviços em geral',
    anexoSimples: 3,
    color: 'text-accent',
    icon: '⚙️'
  },
  [BusinessSector.SERVICOS_ANEXO_IV]: {
    name: 'Serviços Anexo IV',
    description: 'Serviços de limpeza, vigilância, construção civil',
    anexoSimples: 4,
    color: 'text-accent-subtle',
    icon: '🔧'
  },
  [BusinessSector.SERVICOS_ANEXO_V]: {
    name: 'Serviços Anexo V',
    description: 'Serviços advocacia, contabilidade, medicina',
    anexoSimples: 5,
    color: 'text-accent',
    icon: '👨‍💼'
  }
} as const;

// ==================== TIPOS DE ATIVIDADE ====================

export const ACTIVITY_TYPES = {
  [ActivityType.COMERCIO_VAREJO]: {
    name: 'Comércio Varejista',
    description: 'Venda direta ao consumidor final',
    setor: BusinessSector.COMERCIO,
    anexoSimples: 1,
    cnaeExamples: ['47.11-3-02', '47.12-1-00', '47.13-0-02'],
    marginPresumida: {
      irpj: 0.08, // 8%
      csll: 0.12  // 12%
    }
  },
  [ActivityType.COMERCIO_ATACADO]: {
    name: 'Comércio Atacadista',
    description: 'Venda para outros comerciantes',
    setor: BusinessSector.COMERCIO,
    anexoSimples: 1,
    cnaeExamples: ['46.11-7-01', '46.12-5-00', '46.13-3-00'],
    marginPresumida: {
      irpj: 0.08, // 8%
      csll: 0.12  // 12%
    }
  },
  [ActivityType.INDUSTRIA_GERAL]: {
    name: 'Indústria em Geral',
    description: 'Fabricação e transformação industrial',
    setor: BusinessSector.INDUSTRIA,
    anexoSimples: 2,
    cnaeExamples: ['10.11-2-01', '13.11-1-00', '25.11-0-00'],
    marginPresumida: {
      irpj: 0.08, // 8%
      csll: 0.12  // 12%
    }
  },
  [ActivityType.SERVICOS_GERAIS]: {
    name: 'Serviços em Geral',
    description: 'Prestação de serviços diversos',
    setor: BusinessSector.SERVICOS,
    anexoSimples: 3,
    cnaeExamples: ['62.01-5-01', '73.11-4-00', '82.11-3-00'],
    marginPresumida: {
      irpj: 0.32, // 32%
      csll: 0.32  // 32%
    }
  },
  [ActivityType.TECNOLOGIA]: {
    name: 'Tecnologia e Software',
    description: 'Desenvolvimento de software e TI',
    setor: BusinessSector.SERVICOS,
    anexoSimples: 3,
    cnaeExamples: ['62.01-5-01', '62.02-3-00', '63.11-9-00'],
    marginPresumida: {
      irpj: 0.32, // 32%
      csll: 0.32  // 32%
    },
    incentivos: ['Lei do Bem', 'PADIS', 'Lei de Informática']
  },
  [ActivityType.CONSULTORIA]: {
    name: 'Consultoria',
    description: 'Consultoria empresarial e administrativa',
    setor: BusinessSector.SERVICOS_ANEXO_V,
    anexoSimples: 5,
    cnaeExamples: ['70.20-4-00', '74.90-1-04', '82.11-3-00'],
    marginPresumida: {
      irpj: 0.32, // 32%
      csll: 0.32  // 32%
    }
  },
  [ActivityType.SAUDE]: {
    name: 'Serviços de Saúde',
    description: 'Medicina, odontologia, fisioterapia',
    setor: BusinessSector.SERVICOS_ANEXO_V,
    anexoSimples: 5,
    cnaeExamples: ['86.10-1-01', '86.20-2-99', '86.30-5-02'],
    marginPresumida: {
      irpj: 0.32, // 32%
      csll: 0.32  // 32%
    },
    beneficios: ['Isenção ISS em alguns municípios']
  },
  [ActivityType.EDUCACAO]: {
    name: 'Educação',
    description: 'Ensino e treinamento',
    setor: BusinessSector.SERVICOS,
    anexoSimples: 3,
    cnaeExamples: ['85.11-2-00', '85.20-0-00', '85.91-1-00'],
    marginPresumida: {
      irpj: 0.32, // 32%
      csll: 0.32  // 32%
    },
    beneficios: ['Possível isenção de alguns tributos']
  },
  [ActivityType.FINANCEIRO]: {
    name: 'Serviços Financeiros',
    description: 'Bancos, seguros, investimentos',
    setor: BusinessSector.SERVICOS,
    anexoSimples: null, // Não pode ser Simples Nacional
    cnaeExamples: ['64.11-1-00', '64.21-2-00', '65.11-1-01'],
    marginPresumida: {
      irpj: 0.16, // 16%
      csll: 0.20  // 20%
    }
  },
  [ActivityType.OUTROS]: {
    name: 'Outras Atividades',
    description: 'Atividades não especificadas',
    setor: BusinessSector.SERVICOS,
    anexoSimples: 3,
    cnaeExamples: ['82.99-7-99', '96.09-2-99'],
    marginPresumida: {
      irpj: 0.32, // 32%
      csll: 0.32  // 32%
    }
  }
} as const;

// ==================== ESTÁGIOS DE STARTUP ====================

export const STARTUP_STAGES = {
  [StartupStage.PRE_REVENUE]: {
    name: 'Pré-Receita',
    description: 'Ainda não há faturamento',
    recomendacao: TaxRegime.MEI,
    color: 'text-gray-600',
    icon: '🌱'
  },
  [StartupStage.MVP]: {
    name: 'MVP',
    description: 'Produto mínimo viável em testes',
    recomendacao: TaxRegime.SIMPLES_NACIONAL,
    color: 'text-blue-600',
    icon: '🚀'
  },
  [StartupStage.GROWTH]: {
    name: 'Crescimento',
    description: 'Tração e crescimento acelerado',
    recomendacao: TaxRegime.SIMPLES_NACIONAL,
    color: 'text-green-600',
    icon: '📈'
  },
  [StartupStage.SCALE]: {
    name: 'Escala',
    description: 'Operação escalável e consolidada',
    recomendacao: TaxRegime.LUCRO_PRESUMIDO,
    color: 'text-purple-600',
    icon: '🏢'
  }
} as const;

// ==================== ESTADOS BRASILEIROS ====================

export const BRAZILIAN_STATES = [
  { code: 'AC', name: 'Acre', region: 'Norte' },
  { code: 'AL', name: 'Alagoas', region: 'Nordeste' },
  { code: 'AP', name: 'Amapá', region: 'Norte' },
  { code: 'AM', name: 'Amazonas', region: 'Norte' },
  { code: 'BA', name: 'Bahia', region: 'Nordeste' },
  { code: 'CE', name: 'Ceará', region: 'Nordeste' },
  { code: 'DF', name: 'Distrito Federal', region: 'Centro-Oeste' },
  { code: 'ES', name: 'Espírito Santo', region: 'Sudeste' },
  { code: 'GO', name: 'Goiás', region: 'Centro-Oeste' },
  { code: 'MA', name: 'Maranhão', region: 'Nordeste' },
  { code: 'MT', name: 'Mato Grosso', region: 'Centro-Oeste' },
  { code: 'MS', name: 'Mato Grosso do Sul', region: 'Centro-Oeste' },
  { code: 'MG', name: 'Minas Gerais', region: 'Sudeste' },
  { code: 'PA', name: 'Pará', region: 'Norte' },
  { code: 'PB', name: 'Paraíba', region: 'Nordeste' },
  { code: 'PR', name: 'Paraná', region: 'Sul' },
  { code: 'PE', name: 'Pernambuco', region: 'Nordeste' },
  { code: 'PI', name: 'Piauí', region: 'Nordeste' },
  { code: 'RJ', name: 'Rio de Janeiro', region: 'Sudeste' },
  { code: 'RN', name: 'Rio Grande do Norte', region: 'Nordeste' },
  { code: 'RS', name: 'Rio Grande do Sul', region: 'Sul' },
  { code: 'RO', name: 'Rondônia', region: 'Norte' },
  { code: 'RR', name: 'Roraima', region: 'Norte' },
  { code: 'SC', name: 'Santa Catarina', region: 'Sul' },
  { code: 'SP', name: 'São Paulo', region: 'Sudeste' },
  { code: 'SE', name: 'Sergipe', region: 'Nordeste' },
  { code: 'TO', name: 'Tocantins', region: 'Norte' }
] as const;

// ==================== ALÍQUOTAS BASE ====================

export const TAX_RATES = {
  // Lucro Presumido
  LUCRO_PRESUMIDO: {
    IRPJ: 0.15, // 15%
    IRPJ_ADICIONAL: 0.10, // 10% sobre valor acima de R$ 20.000/mês
    CSLL: 0.09, // 9%
    PIS: 0.0065, // 0,65%
    COFINS: 0.03, // 3%
    ICMS: 0.18, // Varia por estado (média 18%)
    ISS: 0.05 // Varia por município (2% a 5%)
  },

  // Lucro Real
  LUCRO_REAL: {
    IRPJ: 0.15, // 15%
    IRPJ_ADICIONAL: 0.10, // 10% sobre valor acima de R$ 20.000/mês
    CSLL: 0.09, // 9%
    PIS: 0.0165, // 1,65% (não cumulativo)
    COFINS: 0.076, // 7,6% (não cumulativo)
    ICMS: 0.18, // Varia por estado
    ISS: 0.05 // Varia por município
  },

  // MEI
  MEI: {
    DAS: {
      COMERCIO: 67.60, // R$ fixo mensal (2024)
      INDUSTRIA: 72.60, // R$ fixo mensal (2024)
      SERVICOS: 71.60 // R$ fixo mensal (2024)
    }
  }
} as const;

// ==================== LIMITES E THRESHOLDS ====================

export const LIMITS = {
  MEI: {
    MAX_REVENUE: 81000, // R$ 81.000/ano
    MAX_EMPLOYEES: 1,
    ACTIVITIES_ALLOWED: [
      ActivityType.COMERCIO_VAREJO,
      ActivityType.SERVICOS_GERAIS,
      ActivityType.INDUSTRIA_GERAL
    ]
  },

  SIMPLES_NACIONAL: {
    MAX_REVENUE: 4800000, // R$ 4.8 milhões/ano
    MAX_EMPLOYEES: null, // Sem limite de funcionários
    FORBIDDEN_ACTIVITIES: [
      ActivityType.FINANCEIRO
    ]
  },

  LUCRO_PRESUMIDO: {
    MAX_REVENUE: 78000000, // R$ 78 milhões/ano
    FORBIDDEN_ACTIVITIES: [
      ActivityType.FINANCEIRO // Algumas restrições
    ]
  },

  LUCRO_REAL: {
    MAX_REVENUE: Infinity, // Sem limite
    MANDATORY_ABOVE: 78000000 // Obrigatório acima de R$ 78 milhões/ano
  }
} as const;

// ==================== ACTIVITY MAPPINGS ====================

export const ACTIVITY_MAPPINGS = Object.entries(ACTIVITY_TYPES).map(([key, value]) => ({
  code: key as ActivityType,
  ...value
}));

// ==================== VALIDATION MESSAGES ====================

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo é obrigatório',
  MIN_VALUE: (min: number) => `Valor mínimo: ${min}`,
  MAX_VALUE: (max: number) => `Valor máximo: ${max}`,
  INVALID_EMAIL: 'Email inválido',
  INVALID_CNPJ: 'CNPJ inválido',
  INVALID_PHONE: 'Telefone inválido',
  REVENUE_TOO_HIGH: (regime: string, max: number) =>
    `Faturamento muito alto para ${regime}. Máximo: R$ ${max.toLocaleString('pt-BR')}`,
  ACTIVITY_NOT_ALLOWED: (regime: string) =>
    `Esta atividade não é permitida no regime ${regime}`
} as const;

// ==================== FORM OPTIONS ====================

export const FORM_OPTIONS = {
  EMPLOYEE_RANGES: [
    { value: '0', label: 'Apenas sócios' },
    { value: '1-5', label: '1 a 5 funcionários' },
    { value: '6-20', label: '6 a 20 funcionários' },
    { value: '21-50', label: '21 a 50 funcionários' },
    { value: '51-100', label: '51 a 100 funcionários' },
    { value: '100+', label: 'Mais de 100 funcionários' }
  ],

  REVENUE_RANGES: [
    { value: '0-81000', label: 'Até R$ 81 mil (MEI)' },
    { value: '81001-360000', label: 'R$ 81 mil a R$ 360 mil' },
    { value: '360001-720000', label: 'R$ 360 mil a R$ 720 mil' },
    { value: '720001-1800000', label: 'R$ 720 mil a R$ 1,8 milhão' },
    { value: '1800001-3600000', label: 'R$ 1,8 milhão a R$ 3,6 milhões' },
    { value: '3600001-4800000', label: 'R$ 3,6 milhões a R$ 4,8 milhões' },
    { value: '4800001+', label: 'Acima de R$ 4,8 milhões' }
  ]
} as const;

// ==================== CONSTANTS VERSION ====================

export const CONSTANTS_VERSION = '1.0.0';
export const LAST_UPDATE = '2024-09-16';
export const TAX_YEAR = 2024;