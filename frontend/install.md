# PriceMatch Frontend Installation

## Quick Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## Prerequisites

- Ensure your backend is running on `http://localhost:8000`
- Node.js 16+ installed
- npm or yarn package manager

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Backend Connection

The frontend is configured to connect to your FastAPI backend at `http://localhost:8000`. The Vite proxy configuration automatically handles API requests.

Make sure your backend CORS settings allow requests from `http://localhost:3000` (which should already be configured in your `main.py`).

## Features Ready to Use

✅ Modern search interface with filters
✅ Responsive product grid
✅ Price comparison between stores
✅ Stock availability filtering
✅ Brand-specific filtering
✅ Error handling and loading states 