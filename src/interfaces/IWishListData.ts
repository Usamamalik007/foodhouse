import {Product} from './IProductData';

export interface WishListResponse {
  statusCode: number;
  message: string;
  wishlist: Wishlist[];
}

export interface Wishlist {
  id: number;
  created_at: string;
  updated_at: string;
  product: Product;
} 

export interface Wishlist4{
  data:data
}


export interface data{
  statusCode: number;
  message: string;
  wishlist: Wishlist3[]
}

export interface Wishlist3 {
  id: number;
  created_at: string;
  updated_at: string;
  product: Product;

}
