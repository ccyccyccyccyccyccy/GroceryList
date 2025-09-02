export interface Product {
  name: string;
  quantity?: string;
  price: number;
  image_url: string;
  is_in_stock: boolean;
  brand: string;
}

export enum BrandNames {
  PARKNSHOP = "ParknShop",
  WELLCOME = "Wellcome"
}

export interface SearchParams {
  product_name: string;
  upper_px_limit?: number;
  lower_px_limit?: number;
  in_stock_only?: boolean;
  brand_filter?: BrandNames[];
  page?: number;
  per_page?: number;
}

export interface SearchResponse {
  products: Product[];
  total: number;
  page: number;
  per_page: number;
} 