import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          credits: number
          plan: 'free' | 'pro' | 'business'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          credits?: number
          plan?: 'free' | 'pro' | 'business'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          credits?: number
          plan?: 'free' | 'pro' | 'business'
          created_at?: string
        }
      }
      apps: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          config: any
          published: boolean
          subdomain: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description: string
          config: any
          published?: boolean
          subdomain: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          config?: any
          published?: boolean
          subdomain?: string
          created_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          config: any
          price: number
          author_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          category: string
          config: any
          price: number
          author_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          config?: any
          price?: number
          author_id?: string
          created_at?: string
        }
      }
    }
  }
}