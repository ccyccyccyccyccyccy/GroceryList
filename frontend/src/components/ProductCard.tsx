import { Package, AlertCircle } from 'lucide-react';
import { Product } from '../types/api';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return `HK$${price.toFixed(2)}`;
  };

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case 'ParknShop':
        return 'bg-green-100 text-green-800';
      case 'Wellcome':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square w-full mb-4 bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgODBDMTA2LjYyNyA4MCAxMTIgODUuMzczIDExMiA5MkMxMTIgOTguNjI3IDEwNi42MjcgMTA0IDEwMCAxMDRDOTMuMzczIDEwNCA4OCA5OC42MjcgODggOTJDODggODUuMzczIDkzLjM3MyA4MCAxMDAgODBaIiBmaWxsPSIjOUI5QjlCIi8+CjxwYXRoIGQ9Ik04MCA2NEMxMTAuOTI4IDY0IDEzNiA4OS4wNzIxIDEzNiAxMjBDMTM2IDE1MC45MjggMTEwLjkyOCAxNzYgODAgMTc2QzQ5LjA3MjEgMTc2IDI0IDE1MC45MjggMjQgMTIwQzI0IDg5LjA3MjEgNDkuMDcyMSA2NCA4MCA2NFoiIHN0cm9rZT0iIzlCOUI5QiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=';
            }}
          />
        </div>

        {/* Stock Status Badge */}
        {!product.is_in_stock && (
          <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <AlertCircle className="w-3 h-3" />
            <span>Out of Stock</span>
          </div>
        )}

        {/* Brand Badge */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getBrandColor(product.brand)}`}>
          {product.brand}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-primary-700 transition-colors">
            {product.name}
          </h3>
          {product.quantity && (
            <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
              <Package className="w-3 h-3" />
              <span>{product.quantity}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            product.is_in_stock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-500'
          }`}>
            {product.is_in_stock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 