export interface ICartDataResponse {
  statusCode: number;
  message: string;
  response: CartResponse;
}

export interface CartResponse {
  id: number;
  totalBill: number;
  salesTax: number;
  shipping_charges: number;
  created_at: string;
  updated_at: string;
  payment: any;
  shipping: any;
  billing_address: any;
  shipping_address: any;
  cartItems: CartItem[];
}

interface CartItem {
  id: number;
  price: number;
  salesTax: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

interface Product {
  id: number;
  name: string;
  amount: number;
  quantity: number;
  weight: string;
  description: string;
  stock_status: string;
  is_published: boolean;
  sku_code: string;
  sh_code: string;
  is_local: boolean;
  is_refundable: string;
  shipping_days: number;
  tax: string;
  badge_name: string;
  is_discount_active: boolean;
  stock_alert_quantity: number;
  created_at: string;
  updated_at: string;
  default_image_id: DefaultImageId;
  productDiscount: any;
}

interface DefaultImageId {
  id: number;
  key: string;
  location: string;
  eTag: string;
  bucket: string;
  created_at: string;
  updated_at: string;
}
