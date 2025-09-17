/**
 * Test Calculations - Teste das Calculadoras Tributárias
 *
 * Arquivo temporário para validar as calculadoras implementadas
 */

import {
  CompanyData,
  TaxRegime,
  ActivityType,
  BusinessSector
} from './types';

import {
  compareAllRegimes,
  getRecommendedRegime,
  getBestEconomicOption
} from './taxCalculations';

// ==================== DADOS DE TESTE ====================

export const mockStartupTech: CompanyData = {
  faturamentoAnual: 500000, // R$ 500k
  atividade: ActivityType.TECNOLOGIA,
  setor: BusinessSector.SERVICOS,
  regimeAtual: TaxRegime.SIMPLES_NACIONAL,
  estadoOperacao: 'SP',
  numeroFuncionarios: 3,
  lucroLiquido: 50000, // R$ 50k (10% margem)
  createdAt: new Date(),
  updatedAt: new Date()
};

export const mockComercio: CompanyData = {
  faturamentoAnual: 1200000, // R$ 1.2M
  atividade: ActivityType.COMERCIO_VAREJO,
  setor: BusinessSector.COMERCIO,
  regimeAtual: TaxRegime.LUCRO_PRESUMIDO,
  estadoOperacao: 'SP',
  numeroFuncionarios: 8,
  lucroLiquido: 120000, // R$ 120k (10% margem)
  createdAt: new Date(),
  updatedAt: new Date()
};

export const mockMEI: CompanyData = {
  faturamentoAnual: 60000, // R$ 60k
  atividade: ActivityType.SERVICOS_GERAIS,
  setor: BusinessSector.SERVICOS,
  regimeAtual: TaxRegime.MEI,
  estadoOperacao: 'SP',
  numeroFuncionarios: 0,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const mockGrandeEmpresa: CompanyData = {
  faturamentoAnual: 50000000, // R$ 50M
  atividade: ActivityType.INDUSTRIA_GERAL,
  setor: BusinessSector.INDUSTRIA,
  regimeAtual: TaxRegime.LUCRO_REAL,
  estadoOperacao: 'SP',
  numeroFuncionarios: 150,
  lucroLiquido: 2500000, // R$ 2.5M (5% margem)
  createdAt: new Date(),
  updatedAt: new Date()
};

// ==================== FUNÇÕES DE TESTE ====================

export function testAllCalculations() {
  console.log('=== TESTE DAS CALCULADORAS TRIBUTÁRIAS ===\n');

  const testCases = [
    { name: 'Startup Tech (R$ 500k)', data: mockStartupTech },
    { name: 'Comércio (R$ 1.2M)', data: mockComercio },
    { name: 'MEI (R$ 60k)', data: mockMEI },
    { name: 'Grande Empresa (R$ 50M)', data: mockGrandeEmpresa }
  ];

  testCases.forEach(testCase => {
    console.log(`\n📊 ${testCase.name}`);
    console.log('=' + '='.repeat(testCase.name.length + 3));

    try {
      // Comparar todos os regimes
      const results = compareAllRegimes(testCase.data);

      console.log('\n💰 Resultados por Regime:');
      results.forEach(result => {
        const status = result.elegivel ? '✅' : '❌';
        const valor = result.elegivel ?
          `R$ ${result.impostos.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` :
          'Não elegível';

        console.log(`${status} ${result.regime.toUpperCase()}: ${valor}`);

        if (!result.elegivel && result.motivoInelegibilidade) {
          console.log(`   └─ ${result.motivoInelegibilidade}`);
        }

        if (result.elegivel) {
          console.log(`   └─ Alíquota efetiva: ${(result.impostos.aliquotaEfetiva * 100).toFixed(2)}%`);
          console.log(`   └─ Score: ${result.scoreRecomendacao}/100`);
        }
      });

      // Melhor opção econômica
      const bestOption = getBestEconomicOption(testCase.data);
      if (bestOption) {
        console.log(`\n🏆 Melhor opção econômica: ${bestOption.regime.toUpperCase()}`);
        console.log(`   └─ Valor: R$ ${bestOption.impostos.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      }

      // Regime recomendado
      const recommended = getRecommendedRegime(testCase.data);
      if (recommended) {
        console.log(`\n⭐ Regime recomendado: ${recommended.regime.toUpperCase()}`);
        console.log(`   └─ Score: ${recommended.scoreRecomendacao}/100`);
      }

    } catch (error) {
      console.error(`❌ Erro no teste ${testCase.name}:`, error);
    }
  });

  console.log('\n=== FIM DOS TESTES ===');
}

// ==================== COMPARAÇÃO DETALHADA ====================

export function compareRegimesDetailed(data: CompanyData) {
  console.log('\n🔍 ANÁLISE DETALHADA DE REGIMES');
  console.log('================================');

  try {
    const results = compareAllRegimes(data);
    const eligible = results.filter(r => r.elegivel);

    if (!eligible.length) {
      console.log('❌ Nenhum regime elegível para esta empresa');
      return;
    }

    console.log(`\n📈 Faturamento: R$ ${data.faturamentoAnual.toLocaleString('pt-BR')}`);
    console.log(`🏢 Atividade: ${data.atividade}`);
    console.log(`📍 Setor: ${data.setor}`);

    eligible.forEach(result => {
      console.log(`\n--- ${result.regime.toUpperCase()} ---`);

      // Breakdown de impostos
      console.log('💰 Breakdown de Impostos:');
      const impostos = result.impostos;

      if (impostos.simplesNacional) {
        console.log(`   Simples Nacional: R$ ${impostos.simplesNacional.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      }

      if (impostos.irpj) {
        console.log(`   IRPJ: R$ ${impostos.irpj.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      }

      if (impostos.csll) {
        console.log(`   CSLL: R$ ${impostos.csll.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      }

      if (impostos.pis) {
        console.log(`   PIS: R$ ${impostos.pis.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      }

      if (impostos.cofins) {
        console.log(`   COFINS: R$ ${impostos.cofins.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      }

      if (impostos.icms) {
        console.log(`   ICMS: R$ ${impostos.icms.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      }

      if (impostos.iss) {
        console.log(`   ISS: R$ ${impostos.iss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      }

      if (impostos.cpp) {
        console.log(`   CPP: R$ ${impostos.cpp.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      }

      console.log(`   ────────────────────────────────`);
      console.log(`   TOTAL: R$ ${impostos.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      console.log(`   Alíquota Efetiva: ${(impostos.aliquotaEfetiva * 100).toFixed(2)}%`);

      // Economia
      if (result.economia && result.economia > 0) {
        console.log(`   💸 Economia vs melhor opção: R$ ${result.economia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      }

      // Score e recomendação
      console.log(`   📊 Score de Recomendação: ${result.scoreRecomendacao}/100`);
      console.log(`   ${result.recomendado ? '✅' : '⚠️'} ${result.recomendado ? 'Recomendado' : 'Não recomendado'}`);

      // Principais vantagens
      if (result.vantagens.length > 0) {
        console.log(`   ✅ Principais vantagens:`);
        result.vantagens.slice(0, 3).forEach(vantagem => {
          console.log(`      • ${vantagem}`);
        });
      }

      // Principais limitações
      if (result.limitacoes.length > 0) {
        console.log(`   ⚠️ Principais limitações:`);
        result.limitacoes.slice(0, 2).forEach(limitacao => {
          console.log(`      • ${limitacao}`);
        });
      }
    });

  } catch (error) {
    console.error('❌ Erro na análise detalhada:', error);
  }
}

// ==================== EXPORTAR PARA CONSOLE (DESENVOLVIMENTO) ====================

// Uncomment para testar no console do navegador
// if (typeof window !== 'undefined') {
//   (window as any).testTaxCalculations = {
//     testAllCalculations,
//     compareRegimesDetailed,
//     mockData: {
//       mockStartupTech,
//       mockComercio,
//       mockMEI,
//       mockGrandeEmpresa
//     }
//   };
//
//   console.log('🧮 Tax Calculation Tests loaded!');
//   console.log('Run: testTaxCalculations.testAllCalculations()');
//   console.log('Or: testTaxCalculations.compareRegimesDetailed(testTaxCalculations.mockData.mockStartupTech)');
// }