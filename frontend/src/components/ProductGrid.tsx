import { Loader2, Package } from 'lucide-react';
import { Product } from '../types/api';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  searchQuery?: string;
}

const ProductGrid = ({ products, loading, searchQuery }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin mb-4" />
        <p className="text-gray-600">Searching for products...</p>
      </div>
    );
  }

  if (products.length === 0 && searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600 max-w-md">
          We couldn't find any products matching "{searchQuery}". Try adjusting your search terms or filters.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
        <p className="text-gray-600 max-w-md">
          Search for groceries to compare prices between ParknShop and Wellcome.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={`${product.name}-${product.brand}-${index}`} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid; 