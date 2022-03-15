export interface ICatagoryResponse {
  message: string;
  statusCode: number;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  level: number;
  created_at: string;
  updated_at: string;
  parentCategory: any;
  sub: CategorySub[];
}

export interface ParentCategory {
  id: number;
  name: string;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface CategorySub {
  id: number;
  name: string;
  level: number;
  created_at: string;
  updated_at: string;
  parentCategory: ParentCategory | null;
  sub: CategorySub[] | null;
}
