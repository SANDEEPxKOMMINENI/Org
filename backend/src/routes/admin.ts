import { Router } from 'express'
import { createClient } from '@supabase/supabase-js'

const router = Router()
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Get all providers
router.get('/providers', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json({ providers: data })
  } catch (error) {
    console.error('Providers fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create provider
router.post('/providers', async (req, res) => {
  try {
    const { name, type, base_url, auth_config } = req.body

    const { data, error } = await supabase
      .from('providers')
      .insert({
        name,
        type,
        base_url,
        auth_config,
        enabled: true
      })
      .select()
      .single()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ provider: data })
  } catch (error) {
    console.error('Provider creation error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all models
router.get('/models', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('models')
      .select(`
        *,
        providers (
          name,
          type
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json({ models: data })
  } catch (error) {
    console.error('Models fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create model
router.post('/models', async (req, res) => {
  try {
    const { provider_id, model_name, display_name, cost_per_token, tier_allowed } = req.body

    const { data, error } = await supabase
      .from('models')
      .insert({
        provider_id,
        model_name,
        display_name,
        cost_per_token,
        tier_allowed,
        enabled: true
      })
      .select()
      .single()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ model: data })
  } catch (error) {
    console.error('Model creation error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all plans
router.get('/plans', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('price', { ascending: true })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json({ plans: data })
  } catch (error) {
    console.error('Plans fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update plan model access
router.put('/plans/:id/models', async (req, res) => {
  try {
    const { id } = req.params
    const { allowed_provider_ids } = req.body

    const { data, error } = await supabase
      .from('plans')
      .update({ allowed_provider_ids })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ plan: data })
  } catch (error) {
    console.error('Plan update error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router