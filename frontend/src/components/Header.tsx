import { ShoppingCart, TrendingDown } from 'lucide-react';
import { config } from '../config/env';

const Header = () => {
  return (
    <header className="bg-white shadow-soft border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{config.appTitle}</h1>
              <p className="text-sm text-gray-500">{config.appDescription}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ShoppingCart className="w-4 h-4" />
              <span>ParknShop • Wellcome</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 