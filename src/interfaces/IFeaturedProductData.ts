import {Product} from './IProductData';

export interface IFeatureProductResponse {
  message: string;
  response: IFeaturedProduct[];
}
export interface IFeaturedProduct {
  id: number;
  product: Product;
}
