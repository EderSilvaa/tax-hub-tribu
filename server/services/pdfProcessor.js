import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { Document } from '@langchain/core/documents';
import PDFParser from 'pdf2json';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração do splitter para chunks otimizados
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
  separators: ['\n\n', '\n', '. ', ' ', ''],
});

// Cache do vector store
let vectorStoreCache = null;
let lastInitTime = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hora

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

        // Processar cada página
        if (pdfData.Pages) {
          pdfData.Pages.forEach((page, pageIndex) => {
            const texts = [];

            if (page.Texts) {
              page.Texts.forEach(text => {
                if (text.R && text.R.length > 0) {
                  text.R.forEach(r => {
                    if (r.T) {
                      // Decodificar texto URI
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
 * Processa todos os PDFs da pasta TAX-HUB e cria vector store
 */
export async function initializeVectorStore() {
  try {
    // Verificar se cache ainda é válido
    if (vectorStoreCache && lastInitTime && (Date.now() - lastInitTime < CACHE_DURATION)) {
      console.log('✅ Usando vector store em cache');
      return vectorStoreCache;
    }

    console.log('📚 Iniciando processamento de PDFs...');

    // Caminho para a pasta TAX-HUB
    const pdfDir = path.join(__dirname, '..', '..', 'TAX-HUB');

    // Listar todos os PDFs
    const files = await fs.readdir(pdfDir);
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

    console.log(`📄 Encontrados ${pdfFiles.length} PDFs para processar`);

    if (pdfFiles.length === 0) {
      throw new Error('Nenhum PDF encontrado na pasta TAX-HUB');
    }

    // Carregar e processar todos os PDFs
    const allDocuments = [];

    for (const pdfFile of pdfFiles) {
      const pdfPath = path.join(pdfDir, pdfFile);
      console.log(`  📖 Processando: ${pdfFile}...`);

      try {
        const pages = await extractTextFromPDF(pdfPath);

        // Criar documentos LangChain
        pages.forEach(page => {
          const doc = new Document({
            pageContent: page.text,
            metadata: {
              source: pdfFile,
              page: page.pageNumber,
              sourcePath: pdfPath
            }
          });
          allDocuments.push(doc);
        });

        console.log(`    ✓ ${pages.length} páginas carregadas`);
      } catch (error) {
        console.error(`    ✗ Erro ao processar ${pdfFile}:`, error.message);
      }
    }

    console.log(`\n📝 Total de ${allDocuments.length} páginas carregadas`);

    if (allDocuments.length === 0) {
      throw new Error('Nenhuma página foi processada com sucesso');
    }

    console.log('✂️  Dividindo em chunks...');

    // Dividir documentos em chunks
    const splits = await textSplitter.splitDocuments(allDocuments);
    console.log(`✓ ${splits.length} chunks criados`);

    console.log('🔢 Gerando embeddings...');

    // Criar embeddings e vector store
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'text-embedding-3-small', // Modelo mais eficiente e barato
    });

    // Criar vector store em memória
    const vectorStore = await MemoryVectorStore.fromDocuments(
      splits,
      embeddings
    );

    console.log('✅ Vector store criado com sucesso!\n');

    // Atualizar cache
    vectorStoreCache = vectorStore;
    lastInitTime = Date.now();

    return vectorStore;
  } catch (error) {
    console.error('❌ Erro ao inicializar vector store:', error);
    throw error;
  }
}

/**
 * Busca documentos relevantes baseado na query
 */
export async function searchRelevantDocs(query, k = 4) {
  try {
    const vectorStore = await initializeVectorStore();

    // Buscar documentos mais relevantes
    const results = await vectorStore.similaritySearch(query, k);

    return results.map(doc => ({
      content: doc.pageContent,
      source: doc.metadata.source || 'Desconhecido',
      page: doc.metadata.page || 'N/A',
    }));
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    throw error;
  }
}

/**
 * Formata contexto para o prompt
 */
export function formatContextForPrompt(relevantDocs) {
  if (!relevantDocs || relevantDocs.length === 0) {
    return '';
  }

  const contextParts = relevantDocs.map((doc) => {
    return doc.content;
  });

  return `

CONTEXTO RELEVANTE DOS DOCUMENTOS:
==================================
${contextParts.join('\n\n---\n\n')}
==================================

Use as informações acima para responder à pergunta do usuário de forma natural e fluida, integrando o conhecimento organicamente sem citar fontes.
`;
}

/**
 * Limpa o cache (útil para desenvolvimento)
 */
export function clearCache() {
  vectorStoreCache = null;
  lastInitTime = null;
  console.log('🧹 Cache do vector store limpo');
}
