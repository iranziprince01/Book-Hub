export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string
          title: string
          author: string
          description: string | null
          cover_url: string | null
          genre: string[]
          publication_date: string | null
          rating: number
          isbn: string | null
          created_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          author: string
          description?: string | null
          cover_url?: string | null
          genre?: string[]
          publication_date?: string | null
          rating?: number
          isbn?: string | null
          created_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          author?: string
          description?: string | null
          cover_url?: string | null
          genre?: string[]
          publication_date?: string | null
          rating?: number
          isbn?: string | null
          created_at?: string | null
          user_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          role: string
          created_at: string | null
          username: string
        }
        Insert: {
          id: string
          role?: string
          created_at?: string | null
          username: string
        }
        Update: {
          id?: string
          role?: string
          created_at?: string | null
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}