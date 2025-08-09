import { Router } from 'express'
import { createClient } from '@supabase/supabase-js'

const router = Router()
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Get all templates
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json({ templates: data })
  } catch (error) {
    console.error('Templates fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get template by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return res.status(404).json({ error: 'Template not found' })
    }

    res.json({ template: data })
  } catch (error) {
    console.error('Template fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get template categories
router.get('/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('categories')
      .not('categories', 'is', null)

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    // Extract unique categories
    const allCategories = data.flatMap(item => item.categories || [])
    const uniqueCategories = [...new Set(allCategories)]

    res.json({ categories: uniqueCategories })
  } catch (error) {
    console.error('Categories fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router