export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Filters {
  searchQuery: string;
  category: string;
  maxPrice: number;
  sortBy: 'low-to-high' | 'high-to-low' | 'title';
}

export interface State {
  products: Product[];
  cart: CartItem[];
  filters: Filters;
  isCartOpen: boolean;
}

export type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_MAX_PRICE'; payload: number }
  | { type: 'SET_SORT_BY'; payload: Filters['sortBy'] }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLEAR_CART' };
