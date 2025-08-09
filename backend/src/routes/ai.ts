import { Router } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import OpenAI from 'openai'

const router = Router()

// Initialize AI providers
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

// AI orchestrator endpoint
router.post('/rewrite', async (req, res) => {
  try {
    const { 
      text, 
      jobDescription, 
      provider = 'gemini', 
      model = 'gemini-pro',
      userId 
    } = req.body

    // TODO: Check user permissions and quotas here
    // TODO: Validate provider/model access based on user plan

    let rewrittenText = ''

    if (provider === 'gemini') {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
      
      const prompt = `
        Rewrite the following resume section to better match the job description.
        IMPORTANT: Do not invent facts or add information not present in the original text.
        Only rephrase and reorganize existing information to better align with the job requirements.
        
        Original text: ${text}
        
        Job description: ${jobDescription}
        
        Rewritten text:
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      rewrittenText = response.text()
      
    } else if (provider === 'openai') {
      const completion = await openai.chat.completions.create({
        model: model || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writer. Rewrite resume content to better match job descriptions without inventing facts.'
          },
          {
            role: 'user',
            content: `Rewrite this resume section: "${text}" to better match this job: "${jobDescription}"`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })

      rewrittenText = completion.choices[0]?.message?.content || ''
    }

    // TODO: Log usage for billing
    // TODO: Store AI job record

    res.json({ 
      rewrittenText,
      provider,
      model,
      tokensUsed: rewrittenText.length // Rough estimate
    })

  } catch (error) {
    console.error('AI rewrite error:', error)
    res.status(500).json({ error: 'AI service error' })
  }
})

// Get available models for user
router.get('/models/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    // TODO: Fetch user plan and determine available models
    // For now, return basic models
    const availableModels = [
      {
        provider: 'gemini',
        model: 'gemini-pro',
        name: 'Gemini Pro',
        tier: 'free'
      },
      {
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        tier: 'pro'
      }
    ]

    res.json({ models: availableModels })
  } catch (error) {
    console.error('Models fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router