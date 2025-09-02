// Environment configuration
export const config = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  
  // App Configuration
  appTitle: import.meta.env.VITE_APP_TITLE || 'PriceMatch',
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || 'Compare grocery prices in Hong Kong',
  
  // Development
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Validate required environment variables
export const validateEnv = () => {
  const required = ['VITE_API_BASE_URL'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
    console.warn('Using default values. Create a .env file for production use.');
  }
};

// Call validation in development
if (import.meta.env.DEV) {
  validateEnv();
} 