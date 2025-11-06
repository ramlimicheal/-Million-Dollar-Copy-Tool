<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🚀 Advanced Million-Dollar Copy Tool

An AI-powered website analysis platform that reverse-engineers successful web applications and generates comprehensive Product Requirements Documents (PRDs) with code scaffolding capabilities.

**Powered by Google Gemini AI** | Built with React + TypeScript + Vite

View your app in AI Studio: https://ai.studio/apps/drive/1wG-LGhF-6nTNXlE0K4Xfqcu0icdulrCc

---

## ✨ Features

### 🎯 Core Analysis Capabilities
- **Single URL Analysis** - Deep dive into any website with multi-agent AI analysis
- **Competitor Comparison** - Side-by-side analysis of multiple websites
- **Multi-Model Comparison** - Compare results from Gemini Flash, Pro, and other models
- **10-Agent System** - Specialized AI agents for comprehensive analysis:
  - 🎨 Frontend Architect
  - ⚙️ Backend Inference Engine
  - 🔍 Tech Stack Detective
  - 💰 Business Model Analyst
  - 🛡️ Performance & Security Auditor
  - 🎭 UX & Interaction Designer
  - 🏆 Competitive Advantage Finder
  - 🛸 Innovation & Future Forward Agent
  - 🗺️ Development Planner
  - 🏗️ Code Generation Architect (NEW!)

### 🎨 Advanced Options
- **Industry Templates** - Specialized analysis for:
  - SaaS applications
  - E-commerce platforms
  - Marketplaces
  - Social networks
  - FinTech apps
  - EdTech platforms
  - Healthcare systems
  - Productivity tools
  - AI-powered tools

- **Analysis Modes**
  - **Quick** - Fast overview (recommended for initial exploration)
  - **Standard** - Balanced depth and speed (default)
  - **Deep** - Comprehensive analysis (maximum detail)

- **AI Model Selection**
  - Gemini 2.5 Flash - Fastest, good quality, lowest cost
  - Gemini 2.0 Flash - Fast, better quality, low cost
  - Gemini 1.5 Pro - Slower, best quality, higher cost

### 📤 Export & Generation
- **📑 PDF Export** - Professional PDF reports
- **📄 Markdown Export** - Portable .md files
- **📋 Copy to Clipboard** - Quick sharing
- **🏗️ Code Generation** - Turn PRDs into React/TypeScript scaffolding

### 📚 Additional Features
- **History Tracking** - Save and revisit past analyses (localStorage)
- **Version Comparison** - Compare different analysis versions
- **Responsive Design** - Works on desktop and mobile

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- A Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd -Million-Dollar-Copy-Tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
     ```
     API_KEY=your_gemini_api_key_here
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start analyzing websites!

---

## 📖 How to Use

### Single URL Analysis
1. Select **"Single URL Analysis"** in Analysis Type
2. Choose your preferred AI model (Gemini Flash for speed, Pro for quality)
3. Select an industry template (optional but recommended)
4. Enter the target website URL
5. Click **"Analyze Website"**
6. Export results as PDF, Markdown, or generate code

### Competitor Comparison
1. Select **"Competitor Comparison"** in Analysis Type
2. Add 2-5 competitor URLs
3. Choose industry template
4. Click **"Compare Competitors"**
5. Receive side-by-side analysis with strategic insights

### Multi-Model Comparison
1. Select **"Model Comparison"** in Analysis Type
2. Enter target URL
3. Select multiple AI models to compare
4. Analyze to see different AI perspectives on the same website

---

## 🏗️ Project Structure

```
/src
  /components          # React components
    AdvancedOptions.tsx
    CompetitorInput.tsx
    ModelComparisonInput.tsx
    ExportOptions.tsx
    HistoryPanel.tsx
    ...
  /services           # API and business logic
    geminiService.ts  # Gemini AI integration
  /utils              # Helper functions
    pdfExport.ts      # Export utilities
  constants.ts        # Prompts and templates
  App.tsx            # Main application
  index.tsx          # Entry point
```

---

## 📋 Generated PRD Sections

Each analysis generates a comprehensive PRD with:

1. **📊 Analysis Report Metadata**
2. **Executive Summary** - Product overview, market context, key metrics
3. **Technical Architecture** - System diagrams, frontend/backend specs
4. **Frontend Specification** - Pages, routes, components, design system
5. **Backend Specification** - Database schema, API endpoints
6. **Development Roadmap** - 8-week implementation plan
7. **Innovation Opportunities** - 15+ AI/ML enhancement ideas
8. **Risk Assessment** - Identified risks with mitigation strategies
9. **Deployment Playbook** - Setup and deployment instructions
10. **Code Generation** - Ready-to-use code scaffolding
11. **Success Criteria** - MVP and 6-month goals
12. **Confidence Scores** - Per-section analysis reliability

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS (via inline classes)
- **Export**: jsPDF, react-markdown

---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
API_KEY=your_gemini_api_key
```

---

## 📦 Building for Production

```bash
npm run build
npm run preview
```

Deploy to:
- Vercel (recommended)
- Netlify
- Cloudflare Pages
- Any static hosting platform

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## ⚖️ Legal & Ethics

This tool is for **educational and competitive research purposes only**.

- ✅ Analyze publicly available websites
- ✅ Learn from successful products
- ✅ Generate PRDs for inspiration
- ❌ Do NOT plagiarize code or content
- ❌ Do NOT violate intellectual property
- ❌ Respect robots.txt and privacy laws

---

## 🙏 Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)

---

## 📞 Support

For issues or questions:
1. Check the [Issues](../../issues) page
2. View the app in [AI Studio](https://ai.studio/apps/drive/1wG-LGhF-6nTNXlE0K4Xfqcu0icdulrCc)

---

**Made with ❤️ for competitive analysis and learning**
