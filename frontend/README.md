# PriceMatch Frontend

A modern, sleek React application for comparing grocery prices between ParknShop and Wellcome in Hong Kong.

## Features

- **🔍 Smart Search**: Intelligent product search with real-time results
- **🏪 Multi-Store Comparison**: Compare prices between ParknShop and Wellcome
- **💰 Price Filtering**: Filter by price range to find deals within your budget
- **📦 Stock Availability**: Filter for in-stock items only
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API calls

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # App header with branding
│   │   ├── SearchBar.tsx    # Search input with filters
│   │   ├── ProductCard.tsx  # Individual product display
│   │   └── ProductGrid.tsx  # Grid layout for products
│   ├── services/            # API integration
│   │   └── api.ts          # Backend communication
│   ├── types/              # TypeScript definitions
│   │   └── api.ts          # API response types
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # React entry point
│   └── index.css           # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## API Integration

The frontend connects to your FastAPI backend with the following features:

- **Product Search**: `/query_grocery/` endpoint
- **Advanced Filtering**: Price range, stock status, brand selection
- **Pagination**: Support for large result sets
- **Error Handling**: Graceful error states and loading indicators

## Design Features

### Modern UI/UX
- Clean, minimalist design with soft shadows
- Smooth animations and transitions
- Intuitive search and filter interface
- Responsive grid layout

### Brand Integration
- Color-coded store badges (ParknShop: Green, Wellcome: Blue)
- Stock status indicators
- Price comparison at a glance

### Performance
- Optimized image loading with fallbacks
- Efficient state management
- Fast search with debouncing
- Lazy loading for large product lists

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization

The app uses Tailwind CSS for styling. You can customize the design by:

1. **Colors**: Modify `tailwind.config.js` color palette
2. **Components**: Edit component styles in `src/index.css`
3. **Layout**: Adjust responsive breakpoints and spacing

## Backend Integration

Ensure your FastAPI backend is running on `http://localhost:8000` with:

- CORS enabled for `http://localhost:3000`
- `/query_grocery/` endpoint available
- Proper response format matching the TypeScript interfaces

## Contributing

1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain responsive design principles
4. Test on multiple screen sizes
5. Ensure accessibility standards 