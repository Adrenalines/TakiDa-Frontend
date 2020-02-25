export type OrderType = 'fast' | 'detailed';

export type ProfileInfoType = 'registration' | 'address' | 'history';

export interface Category {
  id: string;
  name: string;
  nameEng: string;
}

export interface CategoryResponse {
  status: number;
  success: boolean;
  data: Category[];
}
