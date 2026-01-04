#!/bin/bash

# Development startup script for Metropolitan Website
# This script starts both the Spring Boot backend and React frontend

set -e

echo "========================================="
echo "Starting Metropolitan Website Development"
echo "========================================="
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  Warning: DATABASE_URL is not set"
    echo "Using default: jdbc:postgresql://localhost:5432/metropolitan"
    export DATABASE_URL="jdbc:postgresql://localhost:5432/metropolitan"
fi

# Start Spring Boot backend in background
echo "🚀 Starting Spring Boot backend on port 5000..."
cd metropolitan-website/backend
mvn spring-boot:run > backend.log 2>&1 &
BACKEND_PID=$!
echo "✓ Backend started (PID: $BACKEND_PID)"

# Wait a bit for backend to start
sleep 5

# Start React frontend
echo ""
echo "🚀 Starting React frontend on port 3000..."
cd ../../frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo "✓ Starting Vite dev server..."
npm run dev

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    kill $BACKEND_PID 2>/dev/null || true
    echo "✓ Services stopped"
    exit 0
}

# Trap Ctrl+C
trap cleanup INT TERM

# Wait for frontend to exit
wait
