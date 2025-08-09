import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
dotenv.config()

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'HireCraft AI Backend'
  })
})

// API Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/templates', require('./routes/templates'))
app.use('/api/resumes', require('./routes/resumes'))
app.use('/api/ai', require('./routes/ai'))
app.use('/api/ats', require('./routes/ats'))
app.use('/api/billing', require('./routes/billing'))
app.use('/api/admin', require('./routes/admin'))

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: { message: 'Route not found' } })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})