"use client";

import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';
import type { Action, Product, State } from '@/types';
import productsData from '@/data/products.json';

const initialFilters = {
  searchQuery: '',
  category: 'All',
  maxPrice: 300,
  sortBy: 'low-to-high' as const,
};

const initialState: State = {
  products: productsData as Product[],
  cart: [],
  filters: initialFilters,
  isCartOpen: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    }
    case 'SET_SEARCH_QUERY':
      return { ...state, filters: { ...state.filters, searchQuery: action.payload } };
    case 'SET_CATEGORY':
      return { ...state, filters: { ...state.filters, category: action.payload } };
    case 'SET_MAX_PRICE':
      return { ...state, filters: { ...state.filters, maxPrice: action.payload } };
    case 'SET_SORT_BY':
      return { ...state, filters: { ...state.filters, sortBy: action.payload } };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
  totalCartItems: number;
  subtotal: number;
} | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalCartItems = useMemo(
    () => state.cart.reduce((total, item) => total + item.quantity, 0),
    [state.cart]
  );

  const subtotal = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.cart]
  );

  const value = useMemo(
    () => ({ state, dispatch, totalCartItems, subtotal }),
    [state, dispatch, totalCartItems, subtotal]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
