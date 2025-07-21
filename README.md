# Kanban Board Application

A full-stack kanban board application built with React (TypeScript) frontend and NestJS backend with PostgreSQL database.

## 🛠 Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **ESLint** for code linting

### Backend
- **NestJS** with TypeScript
- **TypeORM** for database management
- **PostgreSQL** database
- **Express** server

### Development
- **Node.js** 22.15.1 (pinned)
- **npm workspaces** for monorepo management
- **concurrently** for running both apps

## 🚀 Quick Start

### Prerequisites
- Node.js 22.15.1 (use `.nvmrc` for version management)
- PostgreSQL database
- npm (comes with Node.js)

### Setup Instructions

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd kanban-app
   npm run install:all
   ```

2. **Database setup:**
   ```bash
   # Create PostgreSQL database
   createdb kanban_db
   
   # Or using PostgreSQL CLI
   psql -U postgres
   CREATE DATABASE kanban_db;
   ```

3. **Environment configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📁 Project Structure

```
kanban-app/
├── frontend/          # React TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── backend/           # NestJS TypeScript backend
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── package.json       # Root workspace config
├── .env.example       # Environment template
└── README.md
```

## 🔧 Available Scripts

### Root Level Commands
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both applications for production
- `npm run install:all` - Install dependencies for all workspaces
- `npm run lint` - Run linting for frontend

### Frontend Commands
- `npm run dev:frontend` - Start frontend development server
- `npm run build:frontend` - Build frontend for production
- `npm run lint:frontend` - Run ESLint on frontend code

### Backend Commands
- `npm run dev:backend` - Start backend development server
- `npm run build:backend` - Build backend for production

## 🌍 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=kanban_db

# Application Environment
NODE_ENV=development

# Backend Configuration
BACKEND_PORT=3001

# Frontend Configuration
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:3001/api
```

## 🗄 Database

- **Type**: PostgreSQL
- **ORM**: TypeORM
- **Auto-sync**: Enabled in development (disabled in production)
- **Migration**: Handled by TypeORM

## 🔗 API Endpoints

Backend API is available at `http://localhost:3001/api`

- CORS enabled for frontend communication
- Global API prefix: `/api`

## 🚧 Development Workflow

1. **Start development environment:**
   ```bash
   npm run dev
   ```

2. **Make changes** to frontend (`/frontend/src`) or backend (`/backend/src`)

3. **Hot reload** is enabled for both applications

4. **Database changes** are automatically synchronized in development

## 📦 Production Build

```bash
# Build both applications
npm run build

# Frontend build output: frontend/dist/
# Backend build output: backend/dist/
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own purposes.
