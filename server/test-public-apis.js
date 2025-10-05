import {
  consultarCNPJ,
  consultarIndiceBancoCentral,
  obterFaixasSimplesNacional,
  obterFeriadosNacionais,
  listarBancos,
} from './services/publicDataAPI.js';

console.log('🧪 Testando APIs Públicas do TaxHub\n');
console.log('=' .repeat(60));

async function testarTodas() {
  // Teste 1: Simples Nacional (dados estáticos)
  console.log('\n📊 1. Testando Simples Nacional...');
  try {
    const simples = obterFaixasSimplesNacional();
    console.log('✅ Simples Nacional:', simples.ano);
    console.log('   Anexos disponíveis:', Object.keys(simples.anexos).join(', '));
    console.log('   Exemplo Anexo I - Faixa 1:', simples.anexos.I.faixas[0]);
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }

  // Teste 2: CNPJ (BrasilAPI)
  console.log('\n🏢 2. Testando consulta de CNPJ...');
  try {
    // CNPJ da Receita Federal (exemplo público)
    const cnpj = await consultarCNPJ('00394460005887');
    console.log('✅ CNPJ consultado com sucesso!');
    console.log('   Razão Social:', cnpj.razao_social);
    console.log('   CNAE:', cnpj.cnae_fiscal_descricao);
    console.log('   Município/UF:', `${cnpj.municipio}/${cnpj.uf}`);
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }

  // Teste 3: Índice SELIC (Banco Central)
  console.log('\n📈 3. Testando índice SELIC...');
  try {
    const selic = await consultarIndiceBancoCentral('SELIC');
    console.log('✅ SELIC obtida com sucesso!');
    console.log('   Último valor:', selic.ultimo_valor);
    console.log('   Total de registros:', selic.valores.length);
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }

  // Teste 4: Feriados (BrasilAPI)
  console.log('\n📅 4. Testando feriados nacionais...');
  try {
    const feriados = await obterFeriadosNacionais(2024);
    console.log('✅ Feriados obtidos com sucesso!');
    console.log('   Total de feriados 2024:', feriados.length);
    if (feriados.length > 0) {
      console.log('   Próximo:', feriados[0].name, '-', feriados[0].date);
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }

  // Teste 5: Bancos (BrasilAPI)
  console.log('\n🏦 5. Testando lista de bancos...');
  try {
    const bancos = await listarBancos();
    console.log('✅ Bancos obtidos com sucesso!');
    console.log('   Total de bancos:', bancos.length);
    if (bancos.length > 0) {
      console.log('   Exemplo:', bancos[0].name, '-', bancos[0].code);
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Testes concluídos!\n');
}

testarTodas().catch(console.error);
