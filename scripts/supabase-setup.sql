-- Ativar extensão pgvector (se ainda não estiver ativa)
CREATE EXTENSION IF NOT EXISTS vector;

-- Criar tabela para documentos com embeddings
CREATE TABLE IF NOT EXISTS documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(1536)
);

-- Criar índice para busca por similaridade
CREATE INDEX IF NOT EXISTS documents_embedding_idx
ON documents
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Criar função para busca por similaridade
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding VECTOR(1536),
  match_count INT DEFAULT 4,
  filter JSONB DEFAULT '{}'
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE metadata @> filter
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Comentários para documentação
COMMENT ON TABLE documents IS 'Armazena documentos PDF processados com embeddings para busca semântica';
COMMENT ON COLUMN documents.content IS 'Conteúdo textual do chunk do documento';
COMMENT ON COLUMN documents.metadata IS 'Metadados incluindo source (nome do PDF) e page (número da página)';
COMMENT ON COLUMN documents.embedding IS 'Embedding vetorial gerado pela OpenAI (text-embedding-3-small, 1536 dimensões)';
COMMENT ON FUNCTION match_documents IS 'Função de busca por similaridade usando cosseno';
