# 📚 BookHub

<div align="center">
   [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://book-hub-alu.netlify.app)
   [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/license/mit)
   [![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
   [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
   [![Supabase](https://img.shields.io/badge/Supabase-2.0-green.svg)](https://supabase.com/)
   
   A modern, full-featured book management platform built with React, TypeScript, and Supabase.
   
   [Live Demo](https://book-hub-alu.netlify.app) • [Documentation](#documentation) • [Features](#features) • [Getting Started](#getting-started)

</div>

## Features

- **Beautiful UI/UX** - Modern design with gradient accents and smooth animations
- **Responsive Design** - Perfect experience on all devices
- **Advanced Search** - Find books by title, author, or genre
- **Smart Filtering** - Filter and sort books by multiple criteria
- **User Management** - Secure authentication and authorization
- **Real-time Updates** - Instant data synchronization
- **Performance Optimized** - Fast loading and smooth interactions
- **Secure** - Built-in security with Supabase

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- A Supabase account (free tier works great!)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/iranziprince01/book-hub.git
   cd book-hub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Documentation

### Project Structure

```
book-hub/
├── src/
│   ├── components/    # Reusable UI components
│   ├── lib/          # Utilities and configurations
│   ├── store/        # State management (Zustand)
│   ├── types/        # TypeScript definitions
│   └── main.tsx      # Application entry
├── public/           # Static assets
└── supabase/         # Database migrations
```

### Key Technologies

- **Frontend**

  - React 18
  - TypeScript
  - Tailwind CSS
  - Redux (State Management)
  - Lucide React (Icons)

- **Backend**

  - Supabase (Database & Auth)
  - PostgreSQL
  - Row Level Security

- **Development**
  - Vite
  - ESLint
  - TypeScript

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Supabase](https://supabase.com/) for the amazing backend & Database platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful react icons
- [Unsplash](https://unsplash.com/) for the stunning book cover images

---

<div align="center">

Made with ❤️ by [Prince Iranzi](https://github.com/iranziprince01)

</div>
