# HireCraft AI - AI-Powered Resume Builder

A full-stack application for creating ATS-optimized resumes with AI assistance, LaTeX compilation, and multi-provider AI orchestration.

## 🏗️ Architecture

This project is organized as a monorepo with separate frontend and backend applications:

```
├── frontend/          # Next.js React application (Port 3000)
├── backend/           # Express.js API server (Port 3001)
├── shared/            # Shared types and utilities
└── package.json       # Root workspace configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- AI provider API keys (OpenAI, Google AI, etc.)
- Stripe account for payments

### Installation

1. **Clone and install dependencies:**
```bash
npm run install:all
```

2. **Set up environment variables:**
```bash
# Frontend
cp frontend/.env.example frontend/.env.local
# Backend  
cp backend/.env.example backend/.env
```

3. **Configure your environment files with your API keys and database URLs**

4. **Start both applications:**
```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run dev:frontend  # Frontend only (port 3000)
npm run dev:backend   # Backend only (port 3001)
```

## 📁 Project Structure

### Frontend (`/frontend`)
- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **UI Components:** Headless UI, Lucide React
- **Editor:** Monaco Editor for LaTeX editing
- **PDF Viewer:** PDF.js for resume preview
- **Auth:** Supabase Auth UI

### Backend (`/backend`)
- **Framework:** Express.js with TypeScript
- **Database:** Supabase (PostgreSQL)
- **AI Providers:** OpenAI, Google Gemini, Anthropic
- **Payments:** Stripe
- **File Storage:** Supabase Storage
- **Authentication:** Supabase Auth

### Shared (`/shared`)
- **Types:** Zod schemas and TypeScript types
- **Utilities:** Common functions used by both apps

## 🔧 Development

### Running Individual Services

**Frontend Development:**
```bash
cd frontend
npm run dev
```
Access at: http://localhost:3000

**Backend Development:**
```bash
cd backend
npm run dev
```
API available at: http://localhost:3001

### Building for Production

```bash
# Build all packages
npm run build

# Build individually
npm run build:frontend
npm run build:backend
npm run build:shared
```

## 🗄️ Database Setup

1. Create a new Supabase project
2. Run the SQL migrations in `/supabase/migrations`
3. Set up Row Level Security (RLS) policies
4. Configure Storage buckets for templates and resumes

### Core Tables
- `users` - User profiles and plan information
- `templates` - LaTeX resume templates
- `resumes` - User-created resumes
- `providers` - AI provider configurations
- `models` - Available AI models
- `plans` - Subscription plans
- `job_descriptions` - Saved job postings
- `ats_reports` - ATS scoring results

## 🤖 AI Integration

The application supports multiple AI providers through a unified orchestration layer:

- **Google Gemini** - Primary free tier provider
- **OpenAI GPT** - Premium tier models
- **Anthropic Claude** - Enterprise tier
- **Custom Models** - Configurable endpoints

### Admin Controls
- Configure which models are available per subscription tier
- Set usage quotas and rate limits
- Override model access for specific users
- Monitor usage and costs

## 💳 Billing & Subscriptions

- **Free Tier:** Basic templates, Gemini Flash model
- **Pro Tier:** Premium templates, GPT models, advanced features
- **Enterprise:** Custom models, unlimited usage, priority support

## 🔐 Security Features

- Row Level Security (RLS) on all database tables
- API rate limiting and request validation
- Secure credential storage
- CORS configuration
- Input sanitization and validation

## 📊 Key Features

### Resume Builder
- 50+ professional LaTeX templates
- Live LaTeX editor with syntax highlighting
- Real-time PDF preview
- Auto-save and version history

### AI-Powered Optimization
- Job description analysis
- ATS score calculation
- Intelligent content rewriting
- Keyword optimization suggestions

### Multi-Format Export
- PDF (primary format)
- LaTeX source code
- Word document (via Pandoc)

### Admin Dashboard
- Provider and model management
- User plan administration
- Usage analytics and monitoring
- Template management

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
cd backend
npm run build
npm start
```

### Environment Variables
Ensure all required environment variables are set in your deployment platform.

## 🧪 Testing

```bash
# Run tests for all packages
npm test

# Test individual packages
cd frontend && npm test
cd backend && npm test
```

## 📚 API Documentation

The backend API provides the following endpoints:

- `POST /api/auth/signup` - User registration
- `GET /api/templates` - Fetch resume templates
- `POST /api/ai/rewrite` - AI content rewriting
- `POST /api/ats/score` - ATS scoring
- `GET /api/admin/models` - Admin model management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in `/docs`
- Contact the development team

---

Built with ❤️ using Next.js, Express.js, Supabase, and AI