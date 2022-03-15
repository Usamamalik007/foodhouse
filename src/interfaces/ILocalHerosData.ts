import {Country} from './ICountryData';
import {Product} from './IProductData';
export interface ILocalHeroDataResponse {
  message: string;
  response: ILocalHeroData[];
}
export interface ILocalHeroData {
  id: number;
  product: Product;
  country: Country;
}
