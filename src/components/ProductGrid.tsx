"use client";

import { useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import type { Product } from '@/types';

export default function ProductGrid() {
  const { state, dispatch } = useStore();

  const filteredProducts = useMemo(() => {
    let result = [...state.products];

    if (state.filters.searchQuery) {
      const query = state.filters.searchQuery.toLowerCase();
      result = result.filter(product => product.name.toLowerCase().includes(query));
    }

    if (state.filters.category !== 'All') {
      result = result.filter(product => product.category === state.filters.category);
    }

    result = result.filter(product => product.price <= state.filters.maxPrice);

    switch (state.filters.sortBy) {
      case 'high-to-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'title':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [state.products, state.filters]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Featured Nobie gear</h2>
          <p className="text-sm text-slate-500">Discover the latest tech essentials.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {filteredProducts.length} items
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map(product => (
          <article key={product.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src={product.image} alt={product.name} className="h-44 w-full object-cover" />
            <div className="p-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-500">{product.category}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {product.inStock ? 'In stock' : 'Out of stock'}
                </span>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-bold text-slate-900">${product.price}</p>
                <button
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                  disabled={!product.inStock}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
