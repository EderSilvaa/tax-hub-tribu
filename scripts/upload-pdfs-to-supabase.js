/**
 * Script para fazer upload dos PDFs para o Supabase Vector Store
 *
 * Este script:
 * 1. Lê todos os PDFs da pasta TAX-HUB
 * 2. Extrai o texto de cada página
 * 3. Divide em chunks otimizados
 * 4. Gera embeddings usando OpenAI
 * 5. Armazena no Supabase com pgvector
 */

import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OpenAIEmbeddings } from '@langchain/openai';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { createClient } from '@supabase/supabase-js';
import { Document } from '@langchain/core/documents';
import PDFParser from 'pdf2json';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Configuração
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
  separators: ['\n\n', '\n', '. ', ' ', ''],
});

/**
 * Extrai texto de um PDF usando pdf2json
 */
function extractTextFromPDF(pdfPath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, true);

    pdfParser.on('pdfParser_dataError', errData => {
      reject(new Error(errData.parserError));
    });

    pdfParser.on('pdfParser_dataReady', pdfData => {
      try {
        const pages = [];

        if (pdfData.Pages) {
          pdfData.Pages.forEach((page, pageIndex) => {
            const texts = [];

            if (page.Texts) {
              page.Texts.forEach(text => {
                if (text.R && text.R.length > 0) {
                  text.R.forEach(r => {
                    if (r.T) {
                      texts.push(decodeURIComponent(r.T));
                    }
                  });
                }
              });
            }

            const pageText = texts.join(' ').trim();
            if (pageText) {
              pages.push({
                pageNumber: pageIndex + 1,
                text: pageText
              });
            }
          });
        }

        resolve(pages);
      } catch (error) {
        reject(error);
      }
    });

    pdfParser.loadPDF(pdfPath);
  });
}

/**
 * Função principal
 */
async function main() {
  try {
    console.log('\n🚀 Iniciando upload de PDFs para Supabase...\n');

    // Verificar variáveis de ambiente
    if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
      throw new Error('Variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY são obrigatórias');
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Variável de ambiente OPENAI_API_KEY é obrigatória');
    }

    // Inicializar Supabase client
    const supabaseClient = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );

    console.log('✅ Cliente Supabase inicializado\n');

    // Caminho para a pasta TAX-HUB
    const pdfDir = path.join(__dirname, '..', 'TAX-HUB');

    // Listar todos os PDFs
    const files = await fs.readdir(pdfDir);
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

    console.log(`📄 Encontrados ${pdfFiles.length} PDFs para processar\n`);

    if (pdfFiles.length === 0) {
      throw new Error('Nenhum PDF encontrado na pasta TAX-HUB');
    }

    // Carregar e processar todos os PDFs
    const allDocuments = [];

    for (const pdfFile of pdfFiles) {
      const pdfPath = path.join(pdfDir, pdfFile);
      console.log(`📖 Processando: ${pdfFile}...`);

      try {
        const pages = await extractTextFromPDF(pdfPath);

        // Criar documentos LangChain
        pages.forEach(page => {
          const doc = new Document({
            pageContent: page.text,
            metadata: {
              source: pdfFile,
              page: page.pageNumber,
            }
          });
          allDocuments.push(doc);
        });

        console.log(`  ✓ ${pages.length} páginas carregadas`);
      } catch (error) {
        console.error(`  ✗ Erro ao processar ${pdfFile}:`, error.message);
      }
    }

    console.log(`\n📝 Total de ${allDocuments.length} páginas carregadas`);

    if (allDocuments.length === 0) {
      throw new Error('Nenhuma página foi processada com sucesso');
    }

    console.log('\n✂️  Dividindo em chunks...');

    // Dividir documentos em chunks
    const splits = await textSplitter.splitDocuments(allDocuments);
    console.log(`✓ ${splits.length} chunks criados`);

    console.log('\n🔢 Gerando embeddings e fazendo upload para Supabase...');
    console.log('⏳ Isso pode levar alguns minutos...\n');

    // Criar embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'text-embedding-3-small',
    });

    // Fazer upload para Supabase em lotes
    const batchSize = 50; // Upload em lotes de 50 documentos
    for (let i = 0; i < splits.length; i += batchSize) {
      const batch = splits.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(splits.length / batchSize);

      console.log(`📦 Processando lote ${batchNum}/${totalBatches} (${batch.length} documentos)...`);

      await SupabaseVectorStore.fromDocuments(
        batch,
        embeddings,
        {
          client: supabaseClient,
          tableName: 'documents',
          queryName: 'match_documents',
        }
      );

      console.log(`  ✓ Lote ${batchNum} enviado com sucesso`);
    }

    console.log('\n✅ Upload concluído com sucesso!');
    console.log(`📊 Total: ${splits.length} chunks enviados para Supabase\n`);

  } catch (error) {
    console.error('\n❌ Erro ao fazer upload:', error);
    process.exit(1);
  }
}

// Executar
main();
