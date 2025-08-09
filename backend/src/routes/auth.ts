import { Router } from 'express'
import { createClient } from '@supabase/supabase-js'

const router = Router()
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Sign up endpoint
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name }
    })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ user: data.user })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Sign in endpoint
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ 
      user: data.user,
      session: data.session
    })
  } catch (error) {
    console.error('Signin error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user: data })
  } catch (error) {
    console.error('Profile fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router