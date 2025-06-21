# Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Material-UI. The site showcases my professional experience, projects, and technical skills with a clean, intuitive interface.

## 🌟 Features

- **Responsive Design**: Seamlessly adapts to all screen sizes
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Interactive Navigation**: Smooth transitions between sections
- **Tab-based Layout**: Organized content with dual-tab system
- **Skills Showcase**: Dynamic display of technical skills with animated marquee
- **Social Integration**: Direct links to professional profiles
- **Resume Download**: Quick access to latest resume

## 🤖 AI Integration

The portfolio now features two powerful AI-driven tools, supported by a custom Netlify Function project called [NetliFunk](https://github.com/Rakshit4045/NetliFunk):

- **AI Job Description Analyzer**: Recruiters can upload or paste a Job Description for any role and instantly analyze how well my portfolio profile matches the requirements. This tool provides insights into skills alignment and suitability for the position.

- **AI Assistant Chatbot**: Each section of the portfolio includes an AI-powered assistant. Visitors can ask any question not directly answered in the portfolio, and the chatbot will provide detailed, contextual responses. This feature is powered by Google's Gemini AI API, ensuring accurate and relevant answers about my experience, projects, skills, and more.

All AI response generation is handled by the [NetliFunk](https://github.com/Rakshit4045/NetliFunk) Netlify Function project, which securely manages requests and integrates with Gemini AI.

These AI features enhance interactivity and provide recruiters and visitors with deeper, personalized insights into my professional background.

## 🛠️ Built With

- React 18
- TypeScript
- Material-UI v7
- React Router v7
- Vite
- Google's Generative AI

## 🔧 Local Development

1. Clone the repository
```bash
git clone https://github.com/Rakshit4045/Portfolio.git
```

2. Create a `.env` file in the project root with the following variable:
```env
VITE_API_BASE_URL="http://localhost:8888"
```
Set the value to your NetliFunk deployment URL or your local NetliFunk server for testing.

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 🌐 Deployment

To utilize AI features through  [NetliFunk](https://github.com/Rakshit4045/NetliFunk), create a repository secret in GitHub with the name `VITE_API_BASE_URL` and set its value to your NetliFunk deployment URL.

The site is deployed using GitHub Pages. To deploy:
```bash
npm run deploy
```


## 💻 Code Structure

```
src/
├── assets/         # Static assets (images, icons, etc.)
├── components/     # Reusable UI components
│   ├── AIAssistantUI/   # AI Assistant related components
│   └── JDAnalysis/      # Job Description Analyzer components
├── context/        # React context providers
├── data/           # Static and AI context data
├── hooks/          # Custom React hooks
├── layout/         # Layout components
├── pages/          # Page components (404, etc.)
├── routes/         # Route configurations and constants
├── services/       # API service modules
├── types/          # TypeScript type definitions
├── utils/          # Utility functions (e.g., PDF.js init)
└── __tests__/      # Test files and sample data
```

## 🔗 Live Demo

Visit the live site at: [dev2th3core.site](https://dev2th3core.site)

## 📝 License

This project is open for contributions.

## 👤 Contact

- GitHub: [@Rakshit4045](https://github.com/Rakshit4045)
- LinkedIn: [Rakshit Shinde](https://www.linkedin.com/in/rakshit-shinde/)
- X: [@Dev2th3Core](https://x.com/Dev2th3Core)
