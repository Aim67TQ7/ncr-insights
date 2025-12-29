export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      api_credentials: {
        Row: {
          created_at: string
          created_by: string
          credential_id: string
          expires_at: string | null
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          rate_limit: number | null
          scopes_json: Json
          status: Database["public"]["Enums"]["credential_status"]
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          credential_id?: string
          expires_at?: string | null
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          rate_limit?: number | null
          scopes_json?: Json
          status?: Database["public"]["Enums"]["credential_status"]
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          credential_id?: string
          expires_at?: string | null
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          rate_limit?: number | null
          scopes_json?: Json
          status?: Database["public"]["Enums"]["credential_status"]
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_credentials_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "api_credentials_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["tenant_id"]
          },
        ]
      }
      audit_events: {
        Row: {
          action: Database["public"]["Enums"]["audit_action"]
          created_at: string
          credential_id: string | null
          entity_id: string | null
          entity_type: string
          event_id: string
          ip_address: unknown
          payload_json: Json | null
          tenant_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["audit_action"]
          created_at?: string
          credential_id?: string | null
          entity_id?: string | null
          entity_type: string
          event_id?: string
          ip_address?: unknown
          payload_json?: Json | null
          tenant_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["audit_action"]
          created_at?: string
          credential_id?: string | null
          entity_id?: string | null
          entity_type?: string
          event_id?: string
          ip_address?: unknown
          payload_json?: Json | null
          tenant_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_credential_id_fkey"
            columns: ["credential_id"]
            isOneToOne: false
            referencedRelation: "api_credentials"
            referencedColumns: ["credential_id"]
          },
          {
            foreignKeyName: "audit_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "audit_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      auth_identities: {
        Row: {
          auth_id: string
          created_at: string
          email: string
          mfa_enabled: boolean
          password_hash: string | null
          status: Database["public"]["Enums"]["auth_status"]
          updated_at: string
        }
        Insert: {
          auth_id?: string
          created_at?: string
          email: string
          mfa_enabled?: boolean
          password_hash?: string | null
          status?: Database["public"]["Enums"]["auth_status"]
          updated_at?: string
        }
        Update: {
          auth_id?: string
          created_at?: string
          email?: string
          mfa_enabled?: boolean
          password_hash?: string | null
          status?: Database["public"]["Enums"]["auth_status"]
          updated_at?: string
        }
        Relationships: []
      }
      modules: {
        Row: {
          created_at: string
          description: string | null
          display_name: string
          key: string
          module_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_name: string
          key: string
          module_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_name?: string
          key?: string
          module_id?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          created_at: string
          description: string | null
          key: string
          module_id: string | null
          permission_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          key: string
          module_id?: string | null
          permission_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          key?: string
          module_id?: string | null
          permission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_permissions_module"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["module_id"]
          },
        ]
      }
      platform_admins: {
        Row: {
          admin_id: string
          auth_id: string
          created_at: string | null
        }
        Insert: {
          admin_id?: string
          auth_id: string
          created_at?: string | null
        }
        Update: {
          admin_id?: string
          auth_id?: string
          created_at?: string | null
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          created_at: string
          key: string
          setting_id: string
          tenant_id: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          key: string
          setting_id?: string
          tenant_id: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          key?: string
          setting_id?: string
          tenant_id?: string
          updated_at?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "platform_settings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["tenant_id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          granted_at: string
          permission_id: string
          role_id: string
        }
        Insert: {
          granted_at?: string
          permission_id: string
          role_id: string
        }
        Update: {
          granted_at?: string
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          description: string | null
          name: string
          role_id: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          name: string
          role_id?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          name?: string
          role_id?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["tenant_id"]
          },
        ]
      }
      tenant_invites: {
        Row: {
          created_at: string | null
          created_by: string
          email: string | null
          expires_at: string | null
          invite_code: string
          invite_id: string
          is_active: boolean | null
          max_uses: number | null
          role_id: string | null
          tenant_id: string
          use_count: number | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          email?: string | null
          expires_at?: string | null
          invite_code: string
          invite_id?: string
          is_active?: boolean | null
          max_uses?: number | null
          role_id?: string | null
          tenant_id: string
          use_count?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          email?: string | null
          expires_at?: string | null
          invite_code?: string
          invite_id?: string
          is_active?: boolean | null
          max_uses?: number | null
          role_id?: string | null
          tenant_id?: string
          use_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tenant_invites_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "tenant_invites_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["tenant_id"]
          },
        ]
      }
      tenant_modules: {
        Row: {
          created_at: string
          limits_json: Json | null
          module_id: string
          status: Database["public"]["Enums"]["module_status"]
          tenant_id: string
          trial_ends_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          limits_json?: Json | null
          module_id: string
          status?: Database["public"]["Enums"]["module_status"]
          tenant_id: string
          trial_ends_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          limits_json?: Json | null
          module_id?: string
          status?: Database["public"]["Enums"]["module_status"]
          tenant_id?: string
          trial_ends_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["module_id"]
          },
          {
            foreignKeyName: "tenant_modules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["tenant_id"]
          },
        ]
      }
      tenants: {
        Row: {
          brand_logo_url: string | null
          created_at: string
          name: string
          status: Database["public"]["Enums"]["tenant_status"]
          tenant_id: string
          theme_config: Json | null
          updated_at: string
        }
        Insert: {
          brand_logo_url?: string | null
          created_at?: string
          name: string
          status?: Database["public"]["Enums"]["tenant_status"]
          tenant_id?: string
          theme_config?: Json | null
          updated_at?: string
        }
        Update: {
          brand_logo_url?: string | null
          created_at?: string
          name?: string
          status?: Database["public"]["Enums"]["tenant_status"]
          tenant_id?: string
          theme_config?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      usage_events: {
        Row: {
          created_at: string
          event_id: string
          metadata_json: Json | null
          metric_key: string
          module_id: string
          quantity: number
          tenant_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id?: string
          metadata_json?: Json | null
          metric_key: string
          module_id: string
          quantity: number
          tenant_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          metadata_json?: Json | null
          metric_key?: string
          module_id?: string
          quantity?: number
          tenant_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_events_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["module_id"]
          },
          {
            foreignKeyName: "usage_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "usage_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      usage_summaries: {
        Row: {
          computed_at: string
          metric_key: string
          module_id: string
          period_start: string
          period_type: Database["public"]["Enums"]["period_type"]
          summary_id: string
          tenant_id: string
          total_quantity: number
        }
        Insert: {
          computed_at?: string
          metric_key: string
          module_id: string
          period_start: string
          period_type: Database["public"]["Enums"]["period_type"]
          summary_id?: string
          tenant_id: string
          total_quantity: number
        }
        Update: {
          computed_at?: string
          metric_key?: string
          module_id?: string
          period_start?: string
          period_type?: Database["public"]["Enums"]["period_type"]
          summary_id?: string
          tenant_id?: string
          total_quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "usage_summaries_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["module_id"]
          },
          {
            foreignKeyName: "usage_summaries_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["tenant_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          granted_at: string
          granted_by: string | null
          role_id: string
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          role_id: string
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string
          avatar_url: string | null
          created_at: string
          display_name: string
          job_title: string | null
          manager_user_id: string | null
          status: Database["public"]["Enums"]["user_status"]
          tenant_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auth_id: string
          avatar_url?: string | null
          created_at?: string
          display_name: string
          job_title?: string | null
          manager_user_id?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          tenant_id: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          auth_id?: string
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          job_title?: string | null
          manager_user_id?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          tenant_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "auth_identities"
            referencedColumns: ["auth_id"]
          },
          {
            foreignKeyName: "users_manager_user_id_fkey"
            columns: ["manager_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["tenant_id"]
          },
        ]
      }
      verification_codes: {
        Row: {
          code: string
          code_id: string
          created_at: string | null
          email: string
          expires_at: string
          purpose: string
          used_at: string | null
        }
        Insert: {
          code: string
          code_id?: string
          created_at?: string | null
          email: string
          expires_at: string
          purpose?: string
          used_at?: string | null
        }
        Update: {
          code?: string
          code_id?: string
          created_at?: string | null
          email?: string
          expires_at?: string
          purpose?: string
          used_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_tenant_id:
        | { Args: never; Returns: string }
        | { Args: { _auth_id: string }; Returns: string }
      is_platform_admin: { Args: never; Returns: boolean }
      is_tenant_admin: { Args: never; Returns: boolean }
      user_belongs_to_tenant: {
        Args: { _auth_id: string; _tenant_id: string }
        Returns: boolean
      }
      user_has_role: {
        Args: { _role_name: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      audit_action:
        | "create"
        | "read"
        | "update"
        | "delete"
        | "login"
        | "logout"
        | "export"
        | "permission_denied"
      auth_status: "active" | "locked" | "disabled"
      credential_status: "active" | "revoked"
      module_status: "enabled" | "disabled" | "trial"
      period_type: "daily" | "monthly"
      tenant_status: "active" | "suspended"
      user_status: "active" | "inactive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      audit_action: [
        "create",
        "read",
        "update",
        "delete",
        "login",
        "logout",
        "export",
        "permission_denied",
      ],
      auth_status: ["active", "locked", "disabled"],
      credential_status: ["active", "revoked"],
      module_status: ["enabled", "disabled", "trial"],
      period_type: ["daily", "monthly"],
      tenant_status: ["active", "suspended"],
      user_status: ["active", "inactive"],
    },
  },
} as const
