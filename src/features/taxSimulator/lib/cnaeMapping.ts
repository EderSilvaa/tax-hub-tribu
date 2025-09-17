/**
 * CNAE Mapping - Mapeamento de CNAEs para Anexos do Simples Nacional
 *
 * Classificação Nacional de Atividades Econômicas oficial
 * Mapeamento correto para anexos do Simples Nacional 2024
 */

import { ActivityType, BusinessSector } from './types';

// ==================== INTERFACES ====================

export interface CNAEInfo {
  codigo: string;           // Código CNAE (ex: "47.11-3-02")
  descricao: string;        // Descrição oficial da atividade
  anexoSimples: number;     // Anexo do Simples Nacional (1, 2, 3, 4, 5)
  activityType: ActivityType;
  businessSector: BusinessSector;
  observacoes?: string[];   // Observações específicas
  restricoes?: string[];    // Restrições para o Simples Nacional
}

export interface CNAECategory {
  secao: string;           // Seção CNAE (A, B, C, etc.)
  divisao: string;         // Divisão (01, 02, etc.)
  nome: string;            // Nome da categoria
  anexoPadrao: number;     // Anexo padrão para a categoria
}

// ==================== CNAE ANEXO I - COMÉRCIO ====================

export const CNAE_ANEXO_I: CNAEInfo[] = [
  // COMÉRCIO VAREJISTA
  {
    codigo: "47.11-3-01",
    descricao: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados",
    anexoSimples: 1,
    activityType: ActivityType.COMERCIO_VAREJO,
    businessSector: BusinessSector.COMERCIO
  },
  {
    codigo: "47.11-3-02",
    descricao: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - supermercados",
    anexoSimples: 1,
    activityType: ActivityType.COMERCIO_VAREJO,
    businessSector: BusinessSector.COMERCIO
  },
  {
    codigo: "47.12-1-00",
    descricao: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados, mercearias e armazéns",
    anexoSimples: 1,
    activityType: ActivityType.COMERCIO_VAREJO,
    businessSector: BusinessSector.COMERCIO
  },
  {
    codigo: "47.21-1-02",
    descricao: "Comércio varejista de produtos de padaria, laticínio, doces, balas e semelhantes",
    anexoSimples: 1,
    activityType: ActivityType.COMERCIO_VAREJO,
    businessSector: BusinessSector.COMERCIO
  },
  {
    codigo: "47.22-9-01",
    descricao: "Comércio varejista de carnes e pescados - açougues",
    anexoSimples: 1,
    activityType: ActivityType.COMERCIO_VAREJO,
    businessSector: BusinessSector.COMERCIO
  },
  {
    codigo: "47.81-4-00",
    descricao: "Comércio varejista de artigos do vestuário e acessórios",
    anexoSimples: 1,
    activityType: ActivityType.COMERCIO_VAREJO,
    businessSector: BusinessSector.COMERCIO
  },
  {
    codigo: "47.82-2-01",
    descricao: "Comércio varejista de calçados",
    anexoSimples: 1,
    activityType: ActivityType.COMERCIO_VAREJO,
    businessSector: BusinessSector.COMERCIO
  },
  {
    codigo: "47.51-2-01",
    descricao: "Comércio varejista especializado de equipamentos e suprimentos de informática",
    anexoSimples: 1,
    activityType: ActivityType.COMERCIO_VAREJO,
    businessSector: BusinessSector.COMERCIO
  },

  // COMÉRCIO ATACADISTA
  {
    codigo: "46.11-7-01",
    descricao: "Representantes comerciais e agentes do comércio de matérias-primas agrícolas e animais vivos",
    anexoSimples: 1,
    activityType: ActivityType.COMERCIO_ATACADO,
    businessSector: BusinessSector.COMERCIO
  },
  {
    codigo: "46.21-4-00",
    descricao: "Comércio atacadista de café em grão",
    anexoSimples: 1,
    activityType: ActivityType.COMERCIO_ATACADO,
    businessSector: BusinessSector.COMERCIO
  },
  {
    codigo: "46.91-5-01",
    descricao: "Comércio atacadista de mercadorias em geral, com predominância de produtos alimentícios",
    anexoSimples: 1,
    activityType: ActivityType.COMERCIO_ATACADO,
    businessSector: BusinessSector.COMERCIO
  }
];

// ==================== CNAE ANEXO III - SERVIÇOS ====================

export const CNAE_ANEXO_III: CNAEInfo[] = [
  // TECNOLOGIA E SOFTWARE
  {
    codigo: "62.01-5-01",
    descricao: "Desenvolvimento de programas de computador sob encomenda",
    anexoSimples: 3,
    activityType: ActivityType.TECNOLOGIA,
    businessSector: BusinessSector.SERVICOS,
    observacoes: [
      "Pode ser enquadrado como exportação de serviços",
      "Possível aplicação da Lei do Bem"
    ]
  },
  {
    codigo: "62.02-3-00",
    descricao: "Desenvolvimento e licenciamento de programas de computador customizáveis",
    anexoSimples: 3,
    activityType: ActivityType.TECNOLOGIA,
    businessSector: BusinessSector.SERVICOS
  },
  {
    codigo: "62.03-1-00",
    descricao: "Desenvolvimento e licenciamento de programas de computador não customizáveis",
    anexoSimples: 3,
    activityType: ActivityType.TECNOLOGIA,
    businessSector: BusinessSector.SERVICOS
  },
  {
    codigo: "63.11-9-00",
    descricao: "Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet",
    anexoSimples: 3,
    activityType: ActivityType.TECNOLOGIA,
    businessSector: BusinessSector.SERVICOS
  },

  // EDUCAÇÃO
  {
    codigo: "85.11-2-00",
    descricao: "Educação infantil - creche",
    anexoSimples: 3,
    activityType: ActivityType.EDUCACAO,
    businessSector: BusinessSector.SERVICOS,
    observacoes: ["Possível isenção de alguns tributos"]
  },
  {
    codigo: "85.12-1-00",
    descricao: "Educação infantil - pré-escola",
    anexoSimples: 3,
    activityType: ActivityType.EDUCACAO,
    businessSector: BusinessSector.SERVICOS
  },
  {
    codigo: "85.91-1-00",
    descricao: "Ensino de idiomas",
    anexoSimples: 3,
    activityType: ActivityType.EDUCACAO,
    businessSector: BusinessSector.SERVICOS
  },

  // SERVIÇOS GERAIS
  {
    codigo: "73.11-4-00",
    descricao: "Agências de publicidade",
    anexoSimples: 3,
    activityType: ActivityType.SERVICOS_GERAIS,
    businessSector: BusinessSector.SERVICOS
  },
  {
    codigo: "82.11-3-00",
    descricao: "Serviços combinados de escritório e apoio administrativo",
    anexoSimples: 3,
    activityType: ActivityType.SERVICOS_GERAIS,
    businessSector: BusinessSector.SERVICOS
  },
  {
    codigo: "96.02-5-01",
    descricao: "Cabeleireiros, manicure e pedicure",
    anexoSimples: 3,
    activityType: ActivityType.SERVICOS_GERAIS,
    businessSector: BusinessSector.SERVICOS
  }
];

// ==================== CNAE ANEXO IV - SERVIÇOS ESPECÍFICOS ====================

export const CNAE_ANEXO_IV: CNAEInfo[] = [
  // CONSTRUÇÃO CIVIL
  {
    codigo: "41.20-4-00",
    descricao: "Construção de edifícios",
    anexoSimples: 4,
    activityType: ActivityType.SERVICOS_GERAIS,
    businessSector: BusinessSector.SERVICOS_ANEXO_IV
  },
  {
    codigo: "42.11-1-01",
    descricao: "Construção de rodovias e ferrovias",
    anexoSimples: 4,
    activityType: ActivityType.SERVICOS_GERAIS,
    businessSector: BusinessSector.SERVICOS_ANEXO_IV
  },
  {
    codigo: "43.11-4-00",
    descricao: "Demolição e preparação de canteiro de obras",
    anexoSimples: 4,
    activityType: ActivityType.SERVICOS_GERAIS,
    businessSector: BusinessSector.SERVICOS_ANEXO_IV
  },

  // VIGILÂNCIA E LIMPEZA
  {
    codigo: "80.11-1-01",
    descricao: "Atividades de vigilância e segurança privada",
    anexoSimples: 4,
    activityType: ActivityType.SERVICOS_GERAIS,
    businessSector: BusinessSector.SERVICOS_ANEXO_IV
  },
  {
    codigo: "81.21-4-00",
    descricao: "Limpeza em prédios e em domicílios",
    anexoSimples: 4,
    activityType: ActivityType.SERVICOS_GERAIS,
    businessSector: BusinessSector.SERVICOS_ANEXO_IV
  }
];

// ==================== CNAE ANEXO V - SERVIÇOS PROFISSIONAIS ====================

export const CNAE_ANEXO_V: CNAEInfo[] = [
  // ADVOCACIA
  {
    codigo: "69.11-7-01",
    descricao: "Atividades jurídicas, exceto cartórios",
    anexoSimples: 5,
    activityType: ActivityType.CONSULTORIA,
    businessSector: BusinessSector.SERVICOS_ANEXO_V,
    restricoes: ["Limitação de participação de pessoa jurídica como sócia"]
  },

  // CONTABILIDADE
  {
    codigo: "69.20-6-01",
    descricao: "Atividades de contabilidade",
    anexoSimples: 5,
    activityType: ActivityType.CONSULTORIA,
    businessSector: BusinessSector.SERVICOS_ANEXO_V
  },

  // MEDICINA
  {
    codigo: "86.10-1-01",
    descricao: "Atividades de atendimento hospitalar, exceto pronto-socorro e unidades para cuidados prolongados",
    anexoSimples: 5,
    activityType: ActivityType.SAUDE,
    businessSector: BusinessSector.SERVICOS_ANEXO_V,
    observacoes: ["Possível isenção de ISS em alguns municípios"]
  },
  {
    codigo: "86.20-2-99",
    descricao: "Atividades de profissionais da área médica, exceto médicos",
    anexoSimples: 5,
    activityType: ActivityType.SAUDE,
    businessSector: BusinessSector.SERVICOS_ANEXO_V
  },
  {
    codigo: "86.30-5-02",
    descricao: "Atividades de fisioterapia",
    anexoSimples: 5,
    activityType: ActivityType.SAUDE,
    businessSector: BusinessSector.SERVICOS_ANEXO_V
  },

  // ENGENHARIA E ARQUITETURA
  {
    codigo: "71.11-1-00",
    descricao: "Serviços de arquitetura",
    anexoSimples: 5,
    activityType: ActivityType.CONSULTORIA,
    businessSector: BusinessSector.SERVICOS_ANEXO_V
  },
  {
    codigo: "71.12-0-00",
    descricao: "Serviços de engenharia",
    anexoSimples: 5,
    activityType: ActivityType.CONSULTORIA,
    businessSector: BusinessSector.SERVICOS_ANEXO_V
  }
];

// ==================== ATIVIDADES PROIBIDAS NO SIMPLES ====================

export const CNAE_PROIBIDAS_SIMPLES: CNAEInfo[] = [
  // ATIVIDADES FINANCEIRAS
  {
    codigo: "64.11-1-00",
    descricao: "Banco Central",
    anexoSimples: 0,
    activityType: ActivityType.FINANCEIRO,
    businessSector: BusinessSector.SERVICOS,
    restricoes: ["Proibida no Simples Nacional"]
  },
  {
    codigo: "64.21-2-00",
    descricao: "Bancos comerciais",
    anexoSimples: 0,
    activityType: ActivityType.FINANCEIRO,
    businessSector: BusinessSector.SERVICOS,
    restricoes: ["Proibida no Simples Nacional"]
  },
  {
    codigo: "65.11-1-01",
    descricao: "Seguros de vida",
    anexoSimples: 0,
    activityType: ActivityType.FINANCEIRO,
    businessSector: BusinessSector.SERVICOS,
    restricoes: ["Proibida no Simples Nacional"]
  }
];

// ==================== CONSOLIDAÇÃO DE TODOS OS CNAEs ====================

export const ALL_CNAES: CNAEInfo[] = [
  ...CNAE_ANEXO_I,
  ...CNAE_ANEXO_III,
  ...CNAE_ANEXO_IV,
  ...CNAE_ANEXO_V,
  ...CNAE_PROIBIDAS_SIMPLES
];

// ==================== MAPEAMENTO POR CATEGORIA ====================

export const CNAE_CATEGORIES: CNAECategory[] = [
  {
    secao: "G",
    divisao: "47",
    nome: "Comércio varejista",
    anexoPadrao: 1
  },
  {
    secao: "G",
    divisao: "46",
    nome: "Comércio atacadista",
    anexoPadrao: 1
  },
  {
    secao: "J",
    divisao: "62",
    nome: "Atividades dos serviços de tecnologia da informação",
    anexoPadrao: 3
  },
  {
    secao: "P",
    divisao: "85",
    nome: "Educação",
    anexoPadrao: 3
  },
  {
    secao: "F",
    divisao: "41-43",
    nome: "Construção",
    anexoPadrao: 4
  },
  {
    secao: "M",
    divisao: "69",
    nome: "Atividades jurídicas, de contabilidade e de auditoria",
    anexoPadrao: 5
  },
  {
    secao: "Q",
    divisao: "86",
    nome: "Atividades de atenção à saúde humana",
    anexoPadrao: 5
  }
];

// ==================== HELPER FUNCTIONS ====================

export function findCNAEByCode(codigo: string): CNAEInfo | null {
  return ALL_CNAES.find(cnae => cnae.codigo === codigo) || null;
}

export function findCNAEsByActivity(activityType: ActivityType): CNAEInfo[] {
  return ALL_CNAES.filter(cnae => cnae.activityType === activityType);
}

export function findCNAEsByAnexo(anexo: number): CNAEInfo[] {
  return ALL_CNAES.filter(cnae => cnae.anexoSimples === anexo);
}

export function searchCNAEByDescription(searchTerm: string): CNAEInfo[] {
  const term = searchTerm.toLowerCase();
  return ALL_CNAES.filter(cnae =>
    cnae.descricao.toLowerCase().includes(term) ||
    cnae.codigo.includes(term)
  );
}

export function isProhibitedInSimples(codigo: string): boolean {
  const cnae = findCNAEByCode(codigo);
  return cnae ? cnae.anexoSimples === 0 : false;
}

export function getAnexoByCNAE(codigo: string): number | null {
  const cnae = findCNAEByCode(codigo);
  return cnae ? cnae.anexoSimples : null;
}

export function validateCNAEForActivity(
  codigo: string,
  activityType: ActivityType
): boolean {
  const cnae = findCNAEByCode(codigo);
  return cnae ? cnae.activityType === activityType : false;
}

// ==================== POPULAR CNAEs POR ATIVIDADE ====================

export const POPULAR_CNAES = {
  [ActivityType.COMERCIO_VAREJO]: [
    "47.11-3-02", // Supermercados
    "47.12-1-00", // Minimercados
    "47.81-4-00", // Vestuário
    "47.82-2-01", // Calçados
    "47.51-2-01"  // Informática
  ],

  [ActivityType.COMERCIO_ATACADO]: [
    "46.91-5-01", // Mercadorias em geral
    "46.21-4-00", // Café em grão
    "46.11-7-01"  // Representantes comerciais
  ],

  [ActivityType.TECNOLOGIA]: [
    "62.01-5-01", // Desenvolvimento sob encomenda
    "62.02-3-00", // Software customizável
    "63.11-9-00"  // Hospedagem internet
  ],

  [ActivityType.CONSULTORIA]: [
    "69.11-7-01", // Advocacia
    "69.20-6-01", // Contabilidade
    "71.11-1-00", // Arquitetura
    "71.12-0-00"  // Engenharia
  ],

  [ActivityType.SAUDE]: [
    "86.10-1-01", // Hospital
    "86.20-2-99", // Profissionais médicos
    "86.30-5-02"  // Fisioterapia
  ],

  [ActivityType.EDUCACAO]: [
    "85.11-2-00", // Educação infantil
    "85.91-1-00"  // Idiomas
  ],

  [ActivityType.SERVICOS_GERAIS]: [
    "73.11-4-00", // Publicidade
    "82.11-3-00", // Apoio administrativo
    "96.02-5-01"  // Cabeleireiros
  ]
} as const;

// ==================== EXPORT TYPES ====================

export type {
  CNAEInfo,
  CNAECategory
};

// ==================== EXPORT MAIN OBJECT ====================

export const CNAE_MAPPING = {
  ANEXO_I: CNAE_ANEXO_I,
  ANEXO_III: CNAE_ANEXO_III,
  ANEXO_IV: CNAE_ANEXO_IV,
  ANEXO_V: CNAE_ANEXO_V,
  PROIBIDAS: CNAE_PROIBIDAS_SIMPLES,
  ALL: ALL_CNAES,
  CATEGORIES: CNAE_CATEGORIES,
  POPULAR: POPULAR_CNAES,
  HELPERS: {
    findCNAEByCode,
    findCNAEsByActivity,
    findCNAEsByAnexo,
    searchCNAEByDescription,
    isProhibitedInSimples,
    getAnexoByCNAE,
    validateCNAEForActivity
  }
} as const;