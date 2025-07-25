#!/bin/bash

# TaskFlow Application Setup and Launch Script

echo "🚀 Setting up TaskFlow Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 22.15.1 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
echo "✅ Node.js version: $NODE_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."

# Backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Dependencies installed successfully!"

# Setup environment files
echo "🔧 Setting up environment files..."

# Backend environment
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Backend .env file created from example"
else
    echo "✅ Backend .env file already exists"
fi

# Frontend environment
if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo "✅ Frontend .env file created from example"
else
    echo "✅ Frontend .env file already exists"
fi

# Database setup instructions
echo ""
echo "🗄️  Database Setup Required:"
echo "1. Make sure PostgreSQL is running"
echo "2. Create a database called 'taskflow'"
echo "3. Run the migration script: psql -d taskflow -f backend/migration.sql"
echo "4. Update backend/.env with your database credentials"
echo ""

# Check if PostgreSQL is available
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL CLI is available"
    echo "To setup database automatically, run:"
    echo "  createdb taskflow"
    echo "  psql -d taskflow -f backend/migration.sql"
else
    echo "⚠️  PostgreSQL CLI not found. Please ensure PostgreSQL is installed and available."
fi

echo ""
echo "🎉 Setup complete! To start the application:"
echo ""
echo "1. Make sure your database is set up and running"
echo "2. Start the backend: cd backend && npm run start:dev"
echo "3. Start the frontend: cd frontend && npm run dev"
echo ""
echo "Then visit http://localhost:5173 to use TaskFlow!"
echo ""
echo "📝 Demo credentials:"
echo "Email: demo@taskflow.com"
echo "Password: demo123"