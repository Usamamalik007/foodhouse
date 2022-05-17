export type ProductList = Product[];
export interface Product {
  id: number;
  name: string;
  image: string;
  key: string;
  amount?: string;
  restaurantId? : string;
  is_wishlist:boolean;
}


interface DefaultImageId {
  id: number;
  file_key: string;
  file_name: string;
  file_url: string;
  file_type: string;
  created_at: string;
  updated_at: string;
}

interface ProductDiscount {
  id: number;
  discount: Discount;
}

interface Discount {
  id: number;
  name: string;
  expiry_date: any;
  value: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface IProductByCategoryRequest {
  limit?: number;
  pageNo?: number;
  categoryId?: number;
}
