# Hopemeals Guardian - Frontend

A professional cyber-forensics investigation dashboard for donation transparency and fraud detection.

## 🛡️ Features

- **Security Alerts Dashboard** - Monitor anomalies and suspicious activities
- **Event Creation** - Record donation events with GPS and metadata tracking  
- **Evidence Upload** - Submit files for forensic analysis with tamper-proof storage
- **Ledger Verification** - Verify blockchain-style evidence chain integrity
- **ELA Analysis** - Detect image tampering using Error Level Analysis
- **NLP Summarization** - Extract insights from text evidence

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Running Hopemeals Guardian backend (FastAPI)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd hopemeals-guardian-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and set your backend URL:
   # VITE_API_BASE_URL=http://127.0.0.1:8000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:8080
   ```

## 🔧 Configuration

### API Base URL
Change the backend API URL by setting the environment variable:

**For Vite/React:**
```env
VITE_API_BASE_URL=http://your-backend-url:8000
```

**For Next.js:**
```env
NEXT_PUBLIC_API_BASE_URL=http://your-backend-url:8000
```

### Demo Credentials
```
Email: admin@example.com
Password: admin123
```

## 🏗️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router
- **State**: React Query
- **Icons**: Lucide React

## 📚 API Integration

The app connects to a FastAPI backend with endpoints for:

- Authentication (`POST /auth/login`)
- Event management (`GET/POST /events`)  
- Evidence upload (`POST /evidence/upload`)
- Anomaly analysis (`POST /analyze/run`, `GET /analyze/alerts`)
- Forensic tools (`POST /forensics/ela`, `POST /nlp/summarize`)
- Ledger verification (`GET /evidence/ledger/verify`)

## 🔒 Security Features

- **Tamper-Proof Storage**: SHA-256 hashing for all evidence
- **Chain Verification**: Blockchain-style integrity checking
- **Image Forensics**: Error Level Analysis for tampering detection
- **Access Control**: JWT-based authentication with role management

## 🎨 Design System

The app uses a comprehensive design system with:
- Semantic color tokens for consistent theming
- Professional forensic-themed UI components
- Responsive layouts for mobile and desktop
- Accessibility-first approach

## 📱 Pages Overview

| Page | Purpose |
|------|---------|
| **Dashboard** | Landing page with feature overview |
| **Login** | JWT authentication with role-based access |
| **Alerts** | Security alerts dashboard with filtering |
| **Create Event** | Record new donation events |
| **Upload Evidence** | Submit files for forensic analysis |
| **Ledger** | Verify chain-of-custody integrity |
| **Tools** | ELA analysis and NLP summarization |
| **About** | System information and documentation |

## 🚢 Deployment

### Using Lovable
1. Open your [Lovable Project](https://lovable.dev/projects/d68042ca-f844-47de-8e19-dc6f9d5b0630)
2. Click **Share** → **Publish**
3. Configure custom domain if needed

### Manual Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## 🛠️ Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production  
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Project Structure
```
src/
├── components/     # Reusable UI components
├── lib/           # API client, types, utilities
├── pages/         # Route components
├── hooks/         # Custom React hooks
└── assets/        # Static assets
```

## 📖 Documentation

- [Lovable Documentation](https://docs.lovable.dev/)
- [Backend API Docs](http://127.0.0.1:8000/docs) (when running)
- [Component Library](https://ui.shadcn.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Hopemeals Guardian suite for donation transparency and fraud prevention.

---

**Need Help?** 
- Check the [API documentation](http://127.0.0.1:8000/docs)
- Review the [Lovable docs](https://docs.lovable.dev/)
- Ensure your backend is running on the correct port