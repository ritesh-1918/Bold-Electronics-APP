
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  rating: number;
  stock: number;
  inStock?: boolean;
  salePrice?: number;
  brand?: string;
  dateAdded?: string | number | Date;
  specs: Record<string, string | number>;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}
