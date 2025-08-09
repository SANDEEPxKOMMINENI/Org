import { Router } from 'express'
import { createClient } from '@supabase/supabase-js'

const router = Router()
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Get user resumes
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json({ resumes: data })
  } catch (error) {
    console.error('Resumes fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create new resume
router.post('/', async (req, res) => {
  try {
    const { user_id, template_id, title, tex_content } = req.body

    const { data, error } = await supabase
      .from('resumes')
      .insert({
        user_id,
        template_id,
        title,
        tex_content
      })
      .select()
      .single()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ resume: data })
  } catch (error) {
    console.error('Resume creation error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update resume
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, tex_content } = req.body

    const { data, error } = await supabase
      .from('resumes')
      .update({ title, tex_content, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ resume: data })
  } catch (error) {
    console.error('Resume update error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router