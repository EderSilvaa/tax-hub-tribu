import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para o TAXia
export interface TaxAIMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
  session_id?: string
  metadata?: {
    tokens_used?: number
    model_used?: string
    response_time_ms?: number
  }
}

export interface TaxAISession {
  id: string
  user_id?: string
  created_at: string
  updated_at: string
  title?: string
  message_count: number
}