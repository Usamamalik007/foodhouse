export interface IFavouriteData {
  id: number;
}

export interface IAddFavouriteRequest {
  food_item_id: string;
}

export interface IFavouriteResponse {
  responseCode: number;
  data: Data;
}

export interface IRemoveFavouriteRequest {
  food_item_id: number;
}

export interface IRemoveFavouriteResponse {
  responseCode: number;
  data: Data;
}

export interface Data {
  message: string;
}
