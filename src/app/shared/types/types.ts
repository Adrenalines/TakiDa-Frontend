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
  expanded: boolean;
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

export interface ItemResponse {
  status: number;
  success: boolean;
  data: Item;
}

export interface ItemsResponse {
  status: number;
  success: boolean;
  data: Item[];
  meta: MetaResponse;
}

export interface ItemsOrder {
  [itemId: string]: number;
}

export interface Slide {
  id: string;
  title: string;
  alt: string;
  src: string;
}

export interface Component {
  id: string;
  name: string;
}

export interface CallbackRequest {
  clientName: string;
  phone: string;
}

export interface PostResponse {
  status: number;
  success: boolean;
}

export interface AccountAccessData {
  phone: string;
  password: string;
}

export interface OrderFormData {
  clientName: string;
  phone: string;
  street: string;
  houseNo: number;
  apartment: number;
  addressMemo: string;
  deliveryType: boolean;
  deliveryDate: Date;
  paymentType: 'CASH';
  paymentMemo: string;
  pickup: boolean;
}

export interface OrderRequest {
  clientName: string;
  phone: string;
  street: string;
  houseNo: number;
  apartment: number;
  addressMemo: string;
  deliveryDate: number;
  paymentType: 'CASH';
  paymentMemo: string;
  pickup: boolean;
  metadata: string;
  goods: ItemsOrder;
}
