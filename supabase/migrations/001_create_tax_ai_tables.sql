-- Criar tabela para sessões de conversa
CREATE TABLE IF NOT EXISTS tax_ai_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT,
  message_count INTEGER DEFAULT 0
);

-- Criar tabela para mensagens
CREATE TABLE IF NOT EXISTS tax_ai_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES tax_ai_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_tax_ai_sessions_user_id ON tax_ai_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_ai_sessions_created_at ON tax_ai_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tax_ai_messages_session_id ON tax_ai_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_tax_ai_messages_timestamp ON tax_ai_messages(timestamp DESC);

-- RLS (Row Level Security)
ALTER TABLE tax_ai_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_ai_messages ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para sessões
CREATE POLICY "Users can view their own sessions" ON tax_ai_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions" ON tax_ai_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" ON tax_ai_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas de segurança para mensagens
CREATE POLICY "Users can view messages from their sessions" ON tax_ai_messages
  FOR SELECT USING (
    session_id IN (
      SELECT id FROM tax_ai_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their sessions" ON tax_ai_messages
  FOR INSERT WITH CHECK (
    session_id IN (
      SELECT id FROM tax_ai_sessions WHERE user_id = auth.uid()
    )
  );

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at em tax_ai_sessions
CREATE TRIGGER update_tax_ai_sessions_updated_at
  BEFORE UPDATE ON tax_ai_sessions
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Função para incrementar message_count
CREATE OR REPLACE FUNCTION increment_message_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tax_ai_sessions
  SET message_count = message_count + 1
  WHERE id = NEW.session_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para incrementar message_count quando uma mensagem é inserida
CREATE TRIGGER increment_session_message_count
  AFTER INSERT ON tax_ai_messages
  FOR EACH ROW
  EXECUTE PROCEDURE increment_message_count();