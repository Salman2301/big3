export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      user_chat: {
        Row: {
          chat: string
          created_at: string
          id: number
          team: string
          user_id: string | null
          username: string | null
        }
        Insert: {
          chat: string
          created_at?: string
          id?: number
          team: string
          user_id?: string | null
          username?: string | null
        }
        Update: {
          chat?: string
          created_at?: string
          id?: number
          team?: string
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_chat_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_data: {
        Row: {
          created_at: string
          id: number
          state_next: string
          team: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          state_next: string
          team?: string | null
          user_id?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          state_next?: string
          team?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_vote: {
        Row: {
          created_at: string
          creativity: string
          delivery: string
          id: string
          impact: string
          rebuttal: string
          strategy: string | null
          technicality: string
          user_id: string
        }
        Insert: {
          created_at?: string
          creativity: string
          delivery: string
          id?: string
          impact: string
          rebuttal: string
          strategy?: string | null
          technicality: string
          user_id?: string
        }
        Update: {
          created_at?: string
          creativity?: string
          delivery?: string
          id?: string
          impact?: string
          rebuttal?: string
          strategy?: string | null
          technicality?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_vote_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      votes: {
        Row: {
          created_at: string
          id: number
          total: number | null
          totalCreativityDrizzy: number | null
          totalCreativityKdot: number | null
          totalDeliveryDrizzy: number | null
          totalDeliveryKdot: number | null
          totalDrizzy: number | null
          totalImpactDrizzy: number | null
          totalImpactKdot: number | null
          totalKdot: number | null
          totalRebuttalDrizzy: number | null
          totalRebuttalKdot: number | null
          totalStrategyDrizzy: number | null
          totalStrategyKdot: number | null
          totalTechnicalityDrizzy: number | null
          totalTechnicalityKdot: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          total?: number | null
          totalCreativityDrizzy?: number | null
          totalCreativityKdot?: number | null
          totalDeliveryDrizzy?: number | null
          totalDeliveryKdot?: number | null
          totalDrizzy?: number | null
          totalImpactDrizzy?: number | null
          totalImpactKdot?: number | null
          totalKdot?: number | null
          totalRebuttalDrizzy?: number | null
          totalRebuttalKdot?: number | null
          totalStrategyDrizzy?: number | null
          totalStrategyKdot?: number | null
          totalTechnicalityDrizzy?: number | null
          totalTechnicalityKdot?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          total?: number | null
          totalCreativityDrizzy?: number | null
          totalCreativityKdot?: number | null
          totalDeliveryDrizzy?: number | null
          totalDeliveryKdot?: number | null
          totalDrizzy?: number | null
          totalImpactDrizzy?: number | null
          totalImpactKdot?: number | null
          totalKdot?: number | null
          totalRebuttalDrizzy?: number | null
          totalRebuttalKdot?: number | null
          totalStrategyDrizzy?: number | null
          totalStrategyKdot?: number | null
          totalTechnicalityDrizzy?: number | null
          totalTechnicalityKdot?: number | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
