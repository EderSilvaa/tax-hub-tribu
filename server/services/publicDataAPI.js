import axios from 'axios';
import { obterDividaPublicaFederal, formatarDividaPublicaParaRAG } from './dividaPublicaAPI.js';
import { consultarDividaAtiva, formatarDividaAtivaParaRAG } from './dividaAtivaAPI.js';

/**
 * Serviço de integração com APIs públicas brasileiras
 * Fornece dados atualizados sobre tributação, empresas e economia
 */

// Cache simples em memória (pode ser migrado para Redis posteriormente)
const cache = new Map();
const CACHE_DURATION = {
  CNPJ: 1000 * 60 * 60 * 24, // 24 horas
  INDICES: 1000 * 60 * 60, // 1 hora
  BANCOS: 1000 * 60 * 60 * 24 * 7, // 7 dias
  SIMPLES: 1000 * 60 * 60 * 24, // 24 horas
};

/**
 * Função auxiliar para cache
 */
function getCached(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < cached.duration) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function setCache(key, data, duration) {
  cache.set(key, { data, timestamp: Date.now(), duration });
}

/**
 * 1. BRASIL API - Dados gerais do Brasil
 * https://brasilapi.com.br/docs
 */
export async function consultarCNPJ(cnpj) {
  try {
    const cnpjLimpo = cnpj.replace(/[^\d]/g, '');
    const cacheKey = `cnpj_${cnpjLimpo}`;

    const cached = getCached(cacheKey);
    if (cached) {
      console.log('📦 CNPJ cache hit:', cnpjLimpo);
      return cached;
    }

    console.log('🌐 Consultando CNPJ:', cnpjLimpo);
    const response = await axios.get(
      `https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`,
      { timeout: 10000 }
    );

    const data = {
      cnpj: response.data.cnpj,
      razao_social: response.data.razao_social,
      nome_fantasia: response.data.nome_fantasia,
      cnae_fiscal: response.data.cnae_fiscal,
      cnae_fiscal_descricao: response.data.cnae_fiscal_descricao,
      natureza_juridica: response.data.natureza_juridica,
      porte: response.data.porte,
      capital_social: response.data.capital_social,
      municipio: response.data.municipio,
      uf: response.data.uf,
      situacao_cadastral: response.data.situacao_cadastral,
      data_situacao_cadastral: response.data.data_situacao_cadastral,
      data_inicio_atividade: response.data.data_inicio_atividade,
    };

    setCache(cacheKey, data, CACHE_DURATION.CNPJ);
    return data;
  } catch (error) {
    console.error('❌ Erro ao consultar CNPJ:', error.message);
    throw new Error('Não foi possível consultar o CNPJ. Verifique se o número está correto.');
  }
}

/**
 * 2. Consultar bancos brasileiros
 */
export async function listarBancos() {
  try {
    const cacheKey = 'bancos_brasil';
    const cached = getCached(cacheKey);
    if (cached) return cached;

    console.log('🏦 Consultando lista de bancos...');
    const response = await axios.get(
      'https://brasilapi.com.br/api/banks/v1',
      { timeout: 10000 }
    );

    setCache(cacheKey, response.data, CACHE_DURATION.BANCOS);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao listar bancos:', error.message);
    return [];
  }
}

/**
 * 3. BANCO CENTRAL - Índices econômicos
 * https://api.bcb.gov.br
 */
export async function consultarIndiceBancoCentral(codigoIndice) {
  try {
    const indices = {
      SELIC: 432,
      IPCA: 433,
      CDI: 12,
      TJLP: 256,
    };

    const codigo = indices[codigoIndice] || codigoIndice;
    const cacheKey = `bcb_${codigo}`;

    const cached = getCached(cacheKey);
    if (cached) return cached;

    // Buscar últimos 30 dias
    const dataFim = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const dataInicio = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
      .replace(/-/g, '');

    console.log(`📊 Consultando ${codigoIndice} no Banco Central...`);
    const response = await axios.get(
      `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados`,
      {
        params: {
          formato: 'json',
          dataInicial: dataInicio,
          dataFinal: dataFim,
        },
        timeout: 10000,
      }
    );

    const data = {
      indice: codigoIndice,
      codigo: codigo,
      valores: response.data,
      ultimo_valor: response.data[response.data.length - 1],
    };

    setCache(cacheKey, data, CACHE_DURATION.INDICES);
    return data;
  } catch (error) {
    console.error('❌ Erro ao consultar índice:', error.message);
    return null;
  }
}

/**
 * 4. Consultar faixas do Simples Nacional (dados estáticos 2024)
 * TODO: Implementar scraping do portal oficial para dados dinâmicos
 */
export function obterFaixasSimplesNacional() {
  const cacheKey = 'simples_faixas_2024';
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const faixas = {
    ano: 2024,
    anexos: {
      I: {
        descricao: 'Comércio',
        faixas: [
          { faixa: 1, receita_bruta_ate: 180000, aliquota: 4.0, deducao: 0 },
          { faixa: 2, receita_bruta_ate: 360000, aliquota: 7.3, deducao: 5940 },
          { faixa: 3, receita_bruta_ate: 720000, aliquota: 9.5, deducao: 13860 },
          { faixa: 4, receita_bruta_ate: 1800000, aliquota: 10.7, deducao: 22500 },
          { faixa: 5, receita_bruta_ate: 3600000, aliquota: 14.3, deducao: 87300 },
          { faixa: 6, receita_bruta_ate: 4800000, aliquota: 19.0, deducao: 378000 },
        ],
      },
      II: {
        descricao: 'Indústria',
        faixas: [
          { faixa: 1, receita_bruta_ate: 180000, aliquota: 4.5, deducao: 0 },
          { faixa: 2, receita_bruta_ate: 360000, aliquota: 7.8, deducao: 5940 },
          { faixa: 3, receita_bruta_ate: 720000, aliquota: 10.0, deducao: 13860 },
          { faixa: 4, receita_bruta_ate: 1800000, aliquota: 11.2, deducao: 22500 },
          { faixa: 5, receita_bruta_ate: 3600000, aliquota: 14.7, deducao: 85500 },
          { faixa: 6, receita_bruta_ate: 4800000, aliquota: 30.0, deducao: 720000 },
        ],
      },
      III: {
        descricao: 'Serviços',
        faixas: [
          { faixa: 1, receita_bruta_ate: 180000, aliquota: 6.0, deducao: 0 },
          { faixa: 2, receita_bruta_ate: 360000, aliquota: 11.2, deducao: 9360 },
          { faixa: 3, receita_bruta_ate: 720000, aliquota: 13.5, deducao: 17640 },
          { faixa: 4, receita_bruta_ate: 1800000, aliquota: 16.0, deducao: 35640 },
          { faixa: 5, receita_bruta_ate: 3600000, aliquota: 21.0, deducao: 125640 },
          { faixa: 6, receita_bruta_ate: 4800000, aliquota: 33.0, deducao: 648000 },
        ],
      },
      V: {
        descricao: 'Serviços especializados',
        faixas: [
          { faixa: 1, receita_bruta_ate: 180000, aliquota: 15.5, deducao: 0 },
          { faixa: 2, receita_bruta_ate: 360000, aliquota: 18.0, deducao: 4500 },
          { faixa: 3, receita_bruta_ate: 720000, aliquota: 19.5, deducao: 9900 },
          { faixa: 4, receita_bruta_ate: 1800000, aliquota: 20.5, deducao: 17100 },
          { faixa: 5, receita_bruta_ate: 3600000, aliquota: 23.0, deducao: 62100 },
          { faixa: 6, receita_bruta_ate: 4800000, aliquota: 30.5, deducao: 540000 },
        ],
      },
    },
    observacoes: [
      'Valores atualizados para 2024',
      'Receita bruta anual em R$',
      'Alíquotas em percentual',
      'Deduções em R$',
    ],
  };

  setCache(cacheKey, faixas, CACHE_DURATION.SIMPLES);
  return faixas;
}

/**
 * 5. Obter feriados nacionais
 */
export async function obterFeriadosNacionais(ano = new Date().getFullYear()) {
  try {
    const cacheKey = `feriados_${ano}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    console.log(`📅 Consultando feriados de ${ano}...`);
    const response = await axios.get(
      `https://brasilapi.com.br/api/feriados/v1/${ano}`,
      { timeout: 10000 }
    );

    setCache(cacheKey, response.data, CACHE_DURATION.BANCOS);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao consultar feriados:', error.message);
    return [];
  }
}

/**
 * 6. Formatar dados públicos para contexto do RAG
 */
export function formatarDadosPublicosParaRAG(dados) {
  let contexto = '\n\nDADOS PÚBLICOS ATUALIZADOS:\n';
  contexto += '=' .repeat(50) + '\n\n';

  // CNPJ
  if (dados.cnpj) {
    contexto += `📋 INFORMAÇÕES DA EMPRESA:\n`;
    contexto += `- CNPJ: ${dados.cnpj.cnpj}\n`;
    contexto += `- Razão Social: ${dados.cnpj.razao_social}\n`;
    if (dados.cnpj.nome_fantasia) {
      contexto += `- Nome Fantasia: ${dados.cnpj.nome_fantasia}\n`;
    }
    contexto += `- CNAE: ${dados.cnpj.cnae_fiscal_descricao} (${dados.cnpj.cnae_fiscal})\n`;
    contexto += `- Porte: ${dados.cnpj.porte}\n`;
    contexto += `- Localização: ${dados.cnpj.municipio}/${dados.cnpj.uf}\n`;
    contexto += `- Situação: ${dados.cnpj.situacao_cadastral}\n\n`;
  }

  // Dívida Ativa (formatação detalhada)
  if (dados.divida_ativa) {
    contexto += formatarDividaAtivaParaRAG(dados.divida_ativa);
    contexto += '\n';
  }

  // Índices econômicos
  if (dados.indices && dados.indices.length > 0) {
    contexto += `📊 ÍNDICES ECONÔMICOS ATUAIS:\n`;
    dados.indices.forEach((indice) => {
      if (indice && indice.ultimo_valor) {
        contexto += `- ${indice.indice}: ${indice.ultimo_valor.valor}% (${indice.ultimo_valor.data})\n`;
      }
    });
    contexto += '\n';
  }

  // Dívida Pública (formatação detalhada)
  if (dados.divida_publica) {
    contexto += formatarDividaPublicaParaRAG(dados.divida_publica);
    contexto += '\n';
  }

  // Simples Nacional
  if (dados.simples) {
    contexto += `💼 TABELAS DO SIMPLES NACIONAL ${dados.simples.ano}:\n`;
    Object.entries(dados.simples.anexos).forEach(([anexo, info]) => {
      contexto += `\nAnexo ${anexo} - ${info.descricao}:\n`;
      info.faixas.forEach((faixa) => {
        contexto += `  Faixa ${faixa.faixa}: até R$ ${faixa.receita_bruta_ate.toLocaleString('pt-BR')} - Alíquota ${faixa.aliquota}%\n`;
      });
    });
    contexto += '\n';
  }

  // Info sobre dívida ativa (sem CNPJ)
  if (dados.info_divida_ativa) {
    contexto += `ℹ️  CONSULTA DE DÍVIDA ATIVA:\n`;
    contexto += `- ${dados.info_divida_ativa.descricao}\n`;
    contexto += `- ${dados.info_divida_ativa.como_usar}\n\n`;
  }

  contexto += '=' .repeat(50) + '\n';
  return contexto;
}

/**
 * 7. Buscar dados relevantes baseado na mensagem do usuário
 */
export async function buscarDadosPublicosRelevantes(mensagem) {
  const dados = {};
  const mensagemLower = mensagem.toLowerCase();

  try {
    // Detectar se há CNPJ na mensagem
    const cnpjMatch = mensagem.match(/\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}/);
    if (cnpjMatch) {
      dados.cnpj = await consultarCNPJ(cnpjMatch[0]);

      // Consultar dívida ativa automaticamente quando há CNPJ
      dados.divida_ativa = consultarDividaAtiva(cnpjMatch[0]);
    }

    // Detectar menção a índices econômicos
    const indices = [];
    if (mensagemLower.includes('selic')) {
      const selic = await consultarIndiceBancoCentral('SELIC');
      if (selic) indices.push(selic);
    }
    if (mensagemLower.includes('ipca')) {
      const ipca = await consultarIndiceBancoCentral('IPCA');
      if (ipca) indices.push(ipca);
    }
    if (mensagemLower.includes('cdi')) {
      const cdi = await consultarIndiceBancoCentral('CDI');
      if (cdi) indices.push(cdi);
    }

    if (indices.length > 0) {
      dados.indices = indices;
    }

    // Detectar menção ao Simples Nacional
    if (
      mensagemLower.includes('simples nacional') ||
      mensagemLower.includes('simples') ||
      mensagemLower.includes('faixa') ||
      mensagemLower.includes('alíquota')
    ) {
      dados.simples = obterFaixasSimplesNacional();
    }

    // Detectar menção à dívida pública
    if (
      mensagemLower.includes('dívida pública') ||
      mensagemLower.includes('divida publica') ||
      mensagemLower.includes('dívida do governo') ||
      mensagemLower.includes('dívida federal') ||
      mensagemLower.includes('endividamento')
    ) {
      dados.divida_publica = obterDividaPublicaFederal();
    }

    // Detectar menção à dívida ativa (sem CNPJ específico)
    if (
      (mensagemLower.includes('dívida ativa') ||
       mensagemLower.includes('divida ativa') ||
       mensagemLower.includes('débito') ||
       mensagemLower.includes('pendência fiscal')) &&
      !cnpjMatch
    ) {
      // Retornar informações gerais sobre dívida ativa
      dados.info_divida_ativa = {
        descricao: 'Sistema de consulta de débitos com a União disponível',
        como_usar: 'Informe um CNPJ para verificar pendências fiscais'
      };
    }

    return dados;
  } catch (error) {
    console.error('❌ Erro ao buscar dados públicos:', error.message);
    return {};
  }
}

/**
 * 8. Limpar cache (útil para desenvolvimento)
 */
export function limparCache() {
  cache.clear();
  console.log('🧹 Cache de APIs públicas limpo');
}
