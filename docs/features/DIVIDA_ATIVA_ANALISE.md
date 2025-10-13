# 🚨 API de Dívida Ativa - Análise e Integração

## 🎯 Por Que Dívida Ativa é Essencial para o TaxHub?

### **Problema Real:**
Empresários precisam saber se uma empresa tem pendências fiscais ANTES de:
- ✅ Fazer parcerias comerciais
- ✅ Participar de licitações
- ✅ Solicitar financiamento
- ✅ Emitir certidões negativas

### **Valor para o Usuário:**
> "Consulte o CNPJ 45.814.695/0001-83 e me diga se tem dívidas"
>
> TaxIA: "A empresa NORTE STONE está **REGULAR**, sem registro na Dívida Ativa da União"

## 📊 O Que Descobri

### **1. PGFN - Dados Abertos** ✅ (GRATUITO)
- **Fonte**: Procuradoria-Geral da Fazenda Nacional
- **Formato**: CSV, ZIP
- **Atualização**: Trimestral
- **Conteúdo**: Base COMPLETA de devedores da União
- **URL**: https://www.gov.br/pgfn/pt-br/assuntos/divida-ativa-da-uniao/transparencia-fiscal-1/dados-abertos

**O que contém:**
- CPF/CNPJ do devedor
- Valor da dívida
- Data de inscrição
- Situação da dívida
- Tipo de débito (INSS, IR, FGTS, etc.)

### **2. SERPRO API** ❌ (PAGO)
- **Custo**: Pago por consulta
- **Vantagem**: Tempo real
- **Desvantagem**: Custo operacional
- **URL**: https://www.loja.serpro.gov.br/consulta-divida-ativa

### **3. Lista de Devedores PGFN** ✅ (PÚBLICO)
- **URL**: https://www.listadevedores.pgfn.gov.br/
- **Formato**: Consulta web individual
- **Limite**: Devedores acima de R$ 1 milhão

## 💡 Solução Recomendada

### **Opção 1: Download Dados Abertos PGFN** ⭐ (Implementar)

**Vantagens:**
- ✅ 100% Gratuito
- ✅ Base completa de devedores
- ✅ Dados oficiais do governo
- ✅ Sem limite de consultas

**Desvantagens:**
- ⚠️ Atualização trimestral (não é tempo real)
- ⚠️ Arquivo grande (~500MB compactado)
- ⚠️ Precisa processar CSV

**Fluxo:**
```
1. Download trimestral do CSV da PGFN
2. Processar e importar para banco de dados
3. Indexar por CNPJ para busca rápida
4. Cache de 3 meses (até próxima atualização)
```

### **Opção 2: Web Scraping Lista de Devedores** ⚠️

**Limitação:** Só devedores acima de R$ 1 milhão

### **Opção 3: API SERPRO** ❌ (Não Recomendado)

**Custo:** R$ por consulta (inviável para muitas consultas)

## 🛠️ Implementação Técnica

### **Arquitetura Proposta:**

```
┌─────────────────────┐
│  PGFN Dados Abertos │
│  (Download Trimestral)
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  CSV Processor      │
│  - Parse CSV        │
│  - Extract CNPJ     │
│  - Clean data       │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  Database (SQLite)  │
│  - Table: dividas   │
│  - Index: CNPJ      │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  API Service        │
│  consultarDividaAtiva(cnpj)
└─────────────────────┘
```

### **Estrutura de Dados:**

```javascript
// Tabela: dividas_ativas
{
  cnpj: '45814695000183',
  nome_devedor: 'NORTE STONE MARMORES E GRANITOS LTDA',
  valor_consolidado: 15000.50,
  data_inscricao: '2023-01-15',
  situacao: 'ATIVA',          // ATIVA, SUSPENSA, PARCELADA, QUITADA
  tipo_debito: 'INSS',         // INSS, IR, FGTS, OUTROS
  unidade_responsavel: 'RFB',
  data_atualizacao: '2024-12-31'
}
```

### **Código do Serviço:**

```javascript
// server/services/dividaAtivaAPI.js
import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(__dirname, '../data/divida_ativa.db'));

// 1. Consultar se empresa tem dívida ativa
export function consultarDividaAtiva(cnpj) {
  const cnpjLimpo = cnpj.replace(/\D/g, '');

  const query = db.prepare(`
    SELECT
      nome_devedor,
      SUM(valor_consolidado) as total_divida,
      COUNT(*) as quantidade_dividas,
      situacao,
      tipo_debito
    FROM dividas_ativas
    WHERE cnpj = ?
    GROUP BY cnpj
  `);

  const resultado = query.get(cnpjLimpo);

  if (!resultado) {
    return {
      tem_divida: false,
      situacao: 'REGULAR',
      mensagem: 'Empresa sem registro na Dívida Ativa da União'
    };
  }

  return {
    tem_divida: true,
    situacao: resultado.situacao,
    total_divida: resultado.total_divida,
    quantidade: resultado.quantidade_dividas,
    tipo_debito: resultado.tipo_debito,
    nome_devedor: resultado.nome_devedor,
    alerta: resultado.total_divida > 1000000
      ? '⚠️ Empresa consta na Lista de Grandes Devedores (PGFN)'
      : '⚠️ Empresa possui pendências fiscais'
  };
}

// 2. Estatísticas gerais
export function obterEstatisticasDivida() {
  const stats = db.prepare(`
    SELECT
      COUNT(DISTINCT cnpj) as total_devedores,
      SUM(valor_consolidado) as valor_total,
      AVG(valor_consolidado) as valor_medio
    FROM dividas_ativas
  `).get();

  return {
    total_devedores: stats.total_devedores,
    valor_total_dividas: stats.valor_total,
    valor_medio: stats.valor_medio,
    fonte: 'PGFN - Dados Abertos',
    ultima_atualizacao: '2024-Q4'
  };
}

// 3. Formatação para RAG
export function formatarDividaAtivaParaRAG(dados) {
  if (!dados.tem_divida) {
    return `
🟢 SITUAÇÃO FISCAL - DÍVIDA ATIVA:
- Status: REGULAR
- Não há registros na Dívida Ativa da União
- Empresa apta a emitir Certidão Negativa
`;
  }

  return `
🔴 ALERTA - DÍVIDA ATIVA DA UNIÃO:
- Status: ${dados.situacao}
- Valor Total: R$ ${dados.total_divida.toLocaleString('pt-BR')}
- Quantidade de Débitos: ${dados.quantidade}
- Tipo: ${dados.tipo_debito}
${dados.alerta}

⚠️ Empresa possui pendências fiscais que impedem:
- Emissão de Certidão Negativa de Débitos (CND)
- Participação em licitações públicas
- Obtenção de financiamentos governamentais
`;
}
```

### **Script de Processamento do CSV:**

```javascript
// server/scripts/processarDividaPGFN.js
import csv from 'csv-parser';
import fs from 'fs';
import Database from 'better-sqlite3';

async function processarCSVPGFN(arquivoCSV) {
  const db = new Database('./data/divida_ativa.db');

  // Criar tabela
  db.exec(`
    CREATE TABLE IF NOT EXISTS dividas_ativas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cnpj TEXT,
      nome_devedor TEXT,
      valor_consolidado REAL,
      data_inscricao TEXT,
      situacao TEXT,
      tipo_debito TEXT,
      unidade_responsavel TEXT,
      data_atualizacao TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_cnpj ON dividas_ativas(cnpj);
  `);

  // Insert preparado
  const insert = db.prepare(`
    INSERT INTO dividas_ativas (
      cnpj, nome_devedor, valor_consolidado,
      data_inscricao, situacao, tipo_debito
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((dividas) => {
    for (const divida of dividas) insert.run(
      divida.cnpj,
      divida.nome,
      divida.valor,
      divida.data,
      divida.situacao,
      divida.tipo
    );
  });

  // Processar CSV
  const dividas = [];

  fs.createReadStream(arquivoCSV)
    .pipe(csv())
    .on('data', (row) => {
      // Mapear colunas do CSV da PGFN
      dividas.push({
        cnpj: row['NUMERO_INSCRICAO'].replace(/\D/g, ''),
        nome: row['NOME_DEVEDOR'],
        valor: parseFloat(row['VALOR_CONSOLIDADO']),
        data: row['DATA_INSCRICAO'],
        situacao: row['SITUACAO_INSCRICAO'],
        tipo: row['TIPO_SITUACAO_INSCRICAO']
      });

      // Inserir em lotes de 10.000
      if (dividas.length >= 10000) {
        insertMany(dividas);
        dividas.length = 0;
      }
    })
    .on('end', () => {
      if (dividas.length > 0) {
        insertMany(dividas);
      }
      console.log('✅ CSV processado com sucesso!');
      db.close();
    });
}

// Executar: node processarDividaPGFN.js arquivo.csv
processarCSVPGFN(process.argv[2]);
```

## 🔄 Fluxo de Atualização

### **Cron Job Trimestral:**

```javascript
// server/jobs/atualizarDividaAtiva.js
import cron from 'node-cron';
import { exec } from 'child_process';

// Executar todo dia 15 dos meses 1, 4, 7, 10 (após divulgação PGFN)
cron.schedule('0 2 15 1,4,7,10 *', async () => {
  console.log('🔄 Iniciando atualização de Dívida Ativa...');

  // 1. Download do arquivo da PGFN
  const urlPGFN = 'https://www.gov.br/pgfn/.../divida_ativa_trimestral.zip';
  await downloadFile(urlPGFN, './temp/divida.zip');

  // 2. Extrair ZIP
  await extractZip('./temp/divida.zip', './temp/');

  // 3. Processar CSV
  exec('node ./scripts/processarDividaPGFN.js ./temp/divida.csv');

  console.log('✅ Dívida Ativa atualizada!');
});
```

## 📊 Casos de Uso

### **1. Validação de Parceiro Comercial**
```
Usuário: "Vou fazer negócio com o CNPJ 12.345.678/0001-90, ele é confiável?"

TaxIA: "⚠️ ATENÇÃO: Esta empresa possui R$ 2,5 milhões em dívida
ativa com a União (INSS). Recomendo cautela na negociação e
verificar garantias contratuais."
```

### **2. Due Diligence Fiscal**
```
Usuário: "Analise a situação fiscal do CNPJ 45.814.695/0001-83"

TaxIA: "✅ SITUAÇÃO FISCAL REGULAR
- CNPJ: NORTE STONE MARMORES
- Sem registros na Dívida Ativa da União
- Apta para emissão de CND
- Pode participar de licitações"
```

### **3. Alerta Preventivo**
```
Usuário: "Minha empresa está regular?"

TaxIA: "🔴 ALERTA: Identificada dívida de R$ 15.000 (INSS)
inscrita em 2023. Regularize para evitar:
- Protesto
- Inclusão em Serasa/SPC
- Impossibilidade de contratar com governo"
```

## 🎯 Integração com TaxHub

### **Detecção Automática:**

```javascript
// Em buscarDadosPublicosRelevantes()
export async function buscarDadosPublicosRelevantes(mensagem) {
  const dados = {};

  // Detectar CNPJ
  const cnpjMatch = mensagem.match(/\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}/);

  if (cnpjMatch) {
    dados.cnpj = await consultarCNPJ(cnpjMatch[0]);
    dados.divida_ativa = consultarDividaAtiva(cnpjMatch[0]); // NOVO!
  }

  // Detectar keywords
  if (mensagemLower.includes('dívida') ||
      mensagemLower.includes('débito') ||
      mensagemLower.includes('pendência')) {
    dados.estatisticas_divida = obterEstatisticasDivida();
  }

  return dados;
}
```

### **Contexto no Prompt:**

```javascript
const publicDataContext = formatarDadosPublicosParaRAG({
  cnpj: dados.cnpj,
  divida_ativa: dados.divida_ativa,  // NOVO!
  simples: dados.simples,
  indices: dados.indices
});
```

## 💾 Estimativa de Armazenamento

### **Tamanho dos Dados:**
- CSV PGFN: ~500MB compactado, ~2GB descompactado
- Banco SQLite: ~1.5GB (indexado)
- Atualização trimestral: Substituir arquivo completo

### **Performance:**
- Consulta por CNPJ: < 10ms (indexado)
- Importação CSV: ~5-10 minutos
- Storage necessário: 5GB (segurança)

## 🔐 Considerações Legais

### **Dados Públicos:**
- ✅ Dados abertos sob Lei de Acesso à Informação
- ✅ Publicados oficialmente pela PGFN
- ✅ Sem restrição de uso

### **LGPD:**
- ✅ Informação pública de interesse coletivo
- ✅ Dados já anonimizados quando necessário
- ✅ Finalidade: Transparência fiscal

## 📈 Benefícios

### **Para Usuários:**
- ✅ Due diligence fiscal instantânea
- ✅ Identificação de riscos de negócio
- ✅ Prevenção de fraudes
- ✅ Transparência nas relações comerciais

### **Para TaxHub:**
- ✅ Diferencial competitivo ENORME
- ✅ Dados que nenhum concorrente tem
- ✅ Valor agregado real
- ✅ Ferramenta de compliance

## ⏱️ Estimativa de Implementação

### **Fase 1 - MVP (4-6 horas):**
- ✅ Download manual do CSV PGFN
- ✅ Script de processamento
- ✅ Banco SQLite com índices
- ✅ Função de consulta básica
- ✅ Integração ao chat

### **Fase 2 - Automação (2-3 horas):**
- ✅ Cron job de atualização
- ✅ Download automático
- ✅ Processamento em background

### **Fase 3 - Melhorias (2-4 horas):**
- ✅ Cache Redis
- ✅ API REST dedicada
- ✅ Dashboard de estatísticas

## 🚀 Próximos Passos

1. **Download arquivo PGFN** (manual, primeira vez)
2. **Criar script de processamento**
3. **Implementar serviço de consulta**
4. **Integrar ao sistema RAG**
5. **Testar com CNPJs reais**

---

**Decisão:** ⭐ **IMPLEMENTAR URGENTE!**
**Impacto:** 🔥 ALTO (diferencial competitivo)
**Esforço:** ⏱️ 4-6 horas (MVP)
**ROI:** 📈 EXCELENTE
