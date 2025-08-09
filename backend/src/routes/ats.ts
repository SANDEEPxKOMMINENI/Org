import { Router } from 'express'
import { createClient } from '@supabase/supabase-js'

const router = Router()
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Score resume against job description
router.post('/score', async (req, res) => {
  try {
    const { resume_id, job_description_id, resume_text, job_description_text } = req.body

    // Simple keyword matching algorithm
    const jobKeywords = extractKeywords(job_description_text)
    const resumeKeywords = extractKeywords(resume_text)
    
    const matchedKeywords = jobKeywords.filter(keyword => 
      resumeKeywords.some(resumeKeyword => 
        resumeKeyword.toLowerCase().includes(keyword.toLowerCase())
      )
    )
    
    const missingKeywords = jobKeywords.filter(keyword => 
      !resumeKeywords.some(resumeKeyword => 
        resumeKeyword.toLowerCase().includes(keyword.toLowerCase())
      )
    )

    const score = Math.round((matchedKeywords.length / jobKeywords.length) * 100)

    // Generate suggestions
    const suggestions = generateSuggestions(missingKeywords, score)

    // Save ATS report
    const { data, error } = await supabase
      .from('ats_reports')
      .insert({
        resume_id,
        job_description_id,
        score,
        missing_keywords: missingKeywords,
        suggestions
      })
      .select()
      .single()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ 
      report: data,
      score,
      missing_keywords: missingKeywords,
      suggestions
    })
  } catch (error) {
    console.error('ATS scoring error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get ATS report
router.get('/report/:id', async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('ats_reports')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return res.status(404).json({ error: 'Report not found' })
    }

    res.json({ report: data })
  } catch (error) {
    console.error('ATS report fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Helper functions
function extractKeywords(text: string): string[] {
  // Simple keyword extraction - in production, use NLP libraries
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'a', 'an']
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .filter((word, index, arr) => arr.indexOf(word) === index) // Remove duplicates
    .slice(0, 50) // Limit to top 50 keywords
}

function generateSuggestions(missingKeywords: string[], score: number): string[] {
  const suggestions = []
  
  if (score < 30) {
    suggestions.push('Your resume has low keyword match. Consider restructuring your experience section.')
  }
  
  if (score < 60) {
    suggestions.push('Add more relevant skills and technologies mentioned in the job description.')
  }
  
  if (missingKeywords.length > 10) {
    suggestions.push(`Consider incorporating these key terms: ${missingKeywords.slice(0, 5).join(', ')}`)
  }
  
  if (score > 80) {
    suggestions.push('Great job! Your resume has strong keyword alignment with this position.')
  }
  
  return suggestions
}

module.exports = router