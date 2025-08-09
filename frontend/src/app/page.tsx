import Link from 'next/link'
import { ArrowRight, Zap, FileText, Target, Download } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">HireCraft AI</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/templates" className="text-gray-600 hover:text-gray-900">Templates</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link href="/signup" className="btn-primary">Get Started</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create ATS-Optimized Resumes with{' '}
              <span className="text-primary-600">AI Power</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Build professional resumes using LaTeX templates, get AI-powered suggestions, 
              and optimize for Applicant Tracking Systems. Land your dream job faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-primary text-lg px-8 py-3 inline-flex items-center">
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/templates" className="btn-secondary text-lg px-8 py-3">
                Browse Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to land your next job
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed to make your resume stand out
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <Zap className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Writing</h3>
              <p className="text-gray-600">
                Get intelligent suggestions to improve your resume content and match job descriptions
              </p>
            </div>
            
            <div className="card text-center">
              <FileText className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">LaTeX Templates</h3>
              <p className="text-gray-600">
                Choose from 50+ professional LaTeX templates with live preview and editing
              </p>
            </div>
            
            <div className="card text-center">
              <Target className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">ATS Optimization</h3>
              <p className="text-gray-600">
                Score your resume against ATS systems and get recommendations for improvement
              </p>
            </div>
            
            <div className="card text-center">
              <Download className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
              <p className="text-gray-600">
                Export your resume as PDF, LaTeX source, or Word document
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to build your perfect resume?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of job seekers who've landed their dream jobs with HireCraft AI
          </p>
          <Link href="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center">
            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-primary-400" />
                <span className="ml-2 text-lg font-bold">HireCraft AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered resume builder for the modern job seeker
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/templates">Templates</Link></li>
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HireCraft AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}