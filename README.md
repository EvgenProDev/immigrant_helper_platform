# New Canadian Guide - Immigration Assistant Platform

A comprehensive web application designed to help newcomers navigate Canadian immigration processes with AI-powered assistance, community forums, and up-to-date information from official sources.

## 🌟 Features

### 🤖 AI Immigration Assistant
- **Interactive Chatbot**: Get instant answers to immigration questions
- **Category-Specific Guidance**: Tailored responses for different immigration pathways
- **Real-time Information**: Updated with latest immigration regulations
- **Disclaimer Integration**: Clear legal disclaimers for user protection

### 📚 Immigration Categories
- **Express Entry**: Federal skilled workers, Canadian Experience Class, Federal Skilled Trades
- **Family Sponsorship**: Spouse, children, parents, grandparents sponsorship
- **Study Permits**: Student visas and post-graduation work permits
- **Provincial Nominee Programs**: Province-specific immigration streams
- **Refugee Protection**: Government and privately sponsored refugee programs
- **Temporary Residence**: Visitor visas, work permits, and extensions

### 💬 Community Forum
- **Categorized Discussions**: Organized by immigration topics
- **User Authentication**: Secure login and profile management
- **Post & Comment System**: Share experiences and get community help
- **Real-time Updates**: Live forum activity and notifications

### 🔄 Knowledge Base Management
- **Automatic Web Scraping**: Scheduled updates from canada.ca every 6 hours
- **Verified Sources**: Only official government immigration pages
- **Smart Storage**: Efficient data processing for instant AI responses
- **Status Monitoring**: Real-time knowledge base health tracking

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** components with shadcn/ui
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **TanStack Query** for data fetching

### Backend & Database
- **Supabase** for authentication and database
- **PostgreSQL** with Row Level Security (RLS)
- **Real-time subscriptions** for live updates

### Development Tools
- **ESLint** for code linting
- **TypeScript** for type safety
- **PostCSS** with Autoprefixer

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account (for database and authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd newcanadian-guide-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the migration file located in `supabase/migrations/`
   - Copy your Supabase URL and anon key

4. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Chatbot.tsx      # AI assistant component
│   ├── Hero.tsx         # Landing page hero section
│   ├── ImmigrationCategories.tsx
│   ├── WebScraper.tsx   # Knowledge base status
│   └── ...
├── pages/               # Route components
│   ├── Index.tsx        # Home page
│   ├── Auth.tsx         # Authentication page
│   ├── Forum.tsx        # Community forum
│   └── NewPost.tsx      # Create new forum post
├── hooks/               # Custom React hooks
├── integrations/        # External service integrations
│   └── supabase/        # Supabase client and types
├── lib/                 # Utility functions
└── assets/              # Static assets
```

## 🗄️ Database Schema

### Tables
- **profiles**: User profile information
- **forum_categories**: Immigration discussion categories
- **forum_posts**: Community forum posts
- **forum_comments**: Comments on forum posts

### Security
- Row Level Security (RLS) enabled on all tables
- User-specific data access policies
- Secure authentication with Supabase Auth

## 🎨 Design System

### Color Palette
- **Canadian Red**: Primary brand color
- **Canadian Blue**: Secondary brand color
- **Accent Colors**: Supporting UI elements

### Components
- Built with Radix UI primitives
- Custom styled with Tailwind CSS
- Responsive design for all screen sizes
- Dark/light mode support

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⚠️ Important Disclaimers

- **Legal Notice**: This application provides general information only and should not be considered legal advice
- **Official Sources**: Always verify information with official government sources
- **Professional Consultation**: For specific legal matters, consult with qualified immigration lawyers
- **Data Accuracy**: While we strive for accuracy, immigration policies change frequently

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] Document upload and processing
- [ ] Application tracking system
- [ ] Integration with official IRCC APIs
- [ ] Mobile application
- [ ] Advanced AI features with document analysis

---

**Built with ❤️ for newcomers to Canada**
