import axios from 'axios';
import { Product, SearchParams } from '../types/api';
import { config } from '../config/env';

const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
});

export const searchProducts = async (params: SearchParams): Promise<Product[]> => {
  try {
    const queryParams = new URLSearchParams();
    
    queryParams.append('product_name', params.product_name);
    
    if (params.upper_px_limit !== undefined) {
      queryParams.append('upper_px_limit', params.upper_px_limit.toString());
    }
    
    if (params.lower_px_limit !== undefined) {
      queryParams.append('lower_px_limit', params.lower_px_limit.toString());
    }
    
    if (params.in_stock_only !== undefined) {
      queryParams.append('in_stock_only', params.in_stock_only.toString());
    }
    
    if (params.brand_filter && params.brand_filter.length > 0) {
      params.brand_filter.forEach(brand => {
        queryParams.append('brand_filter', brand);
      });
    }
    
    if (params.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }
    
    if (params.per_page !== undefined) {
      queryParams.append('per_page', params.per_page.toString());
    }

    const response = await api.get(`/query_grocery/?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}; 