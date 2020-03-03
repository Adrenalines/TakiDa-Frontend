import { Observable } from 'rxjs';

export type OrderType = 'fast' | 'detailed';

export type ProfileInfoType = 'registration' | 'address' | 'history';

export interface MetaResponse {
  limit: number;
  offset: number;
  count: number;
}

export interface Category {
  id: string;
  name: string;
  items: Observable<Item[]>;
}

export interface CategoryResponse {
  status: number;
  success: boolean;
  data: Category[];
}

export interface Item {
  id: string;
  name: string;
  pieces: number;
  weight: number;
  oldPrice?: number;
  price: number;
  components: Component[];
}

export interface ItemsCount {
  item: Item;
  count: number;
}

export interface ItemsResponse {
  status: number;
  success: boolean;
  data: Item[];
  meta: MetaResponse;
}

export interface Component {
  id: string;
  name: string;
}

export interface CallbackRequest {
  clientName: string;
  phone: string;
}

export interface CallbackResponse {
  status: number;
  success: boolean;
}

export interface AccountAccessData {
  phone: string;
  password: string;
}
