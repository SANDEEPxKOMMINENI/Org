import { z } from 'zod'

// User types
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['user', 'admin']).default('user'),
  plan_id: z.string().optional(),
  profile_json: z.record(z.any()).optional(),
  created_at: z.string(),
  updated_at: z.string().optional()
})

export type User = z.infer<typeof UserSchema>

// Template types
export const TemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  preview_url: z.string().optional(),
  tex_blob_path: z.string(),
  categories: z.array(z.string()).optional(),
  ats_score_estimate: z.number().min(0).max(100).optional(),
  active: z.boolean().default(true),
  created_at: z.string(),
  updated_at: z.string().optional()
})

export type Template = z.infer<typeof TemplateSchema>

// Resume types
export const ResumeSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  template_id: z.string(),
  title: z.string(),
  tex_content: z.string(),
  pdf_path: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  created_at: z.string(),
  updated_at: z.string().optional()
})

export type Resume = z.infer<typeof ResumeSchema>

// AI Provider types
export const ProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['openai', 'gemini', 'anthropic', 'mistral']),
  base_url: z.string().optional(),
  auth_config: z.record(z.any()),
  enabled: z.boolean().default(true),
  created_at: z.string()
})

export type Provider = z.infer<typeof ProviderSchema>

// AI Model types
export const ModelSchema = z.object({
  id: z.string(),
  provider_id: z.string(),
  model_name: z.string(),
  display_name: z.string(),
  cost_per_token: z.number().min(0),
  tier_allowed: z.enum(['free', 'pro', 'enterprise']),
  enabled: z.boolean().default(true),
  created_at: z.string()
})

export type Model = z.infer<typeof ModelSchema>

// Plan types
export const PlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().min(0),
  features: z.array(z.string()),
  allowed_provider_ids: z.array(z.string()),
  usage_limits: z.record(z.number()),
  created_at: z.string()
})

export type Plan = z.infer<typeof PlanSchema>

// Job Description types
export const JobDescriptionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  title: z.string(),
  company: z.string().optional(),
  text: z.string(),
  extracted_keywords: z.array(z.string()).optional(),
  created_at: z.string()
})

export type JobDescription = z.infer<typeof JobDescriptionSchema>

// ATS Report types
export const ATSReportSchema = z.object({
  id: z.string(),
  resume_id: z.string(),
  job_description_id: z.string(),
  score: z.number().min(0).max(100),
  missing_keywords: z.array(z.string()),
  suggestions: z.array(z.string()),
  created_at: z.string()
})

export type ATSReport = z.infer<typeof ATSReportSchema>

// API Response types
export interface ApiResponse<T = any> {
  data?: T
  error?: {
    message: string
    code?: string
  }
  meta?: {
    total?: number
    page?: number
    limit?: number
  }
}

// AI Request types
export interface AIRewriteRequest {
  text: string
  jobDescription: string
  provider?: string
  model?: string
  userId: string
}

export interface AIRewriteResponse {
  rewrittenText: string
  provider: string
  model: string
  tokensUsed: number
}