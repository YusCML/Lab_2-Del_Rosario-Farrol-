"use client";

import { useStore } from '@/context/StoreContext';

export default function FilterSidebar() {
  const { state, dispatch } = useStore();
  const categories = ['All', ...Array.from(new Set(state.products.map(product => product.category)))];

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Filter products</h2>
        <p className="text-sm text-slate-500">Refine your ideal setup.</p>
      </div>

      <div className="space-y-5">
        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-2 block">Search</span>
          <input
            type="text"
            value={state.filters.searchQuery}
            onChange={e => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            placeholder="Search gear"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-500"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-2 block">Category</span>
          <select
            value={state.filters.category}
            onChange={e => dispatch({ type: 'SET_CATEGORY', payload: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-2 flex items-center justify-between">
            <span>Max price</span>
            <span className="text-slate-500">${state.filters.maxPrice}</span>
          </span>
          <input
            type="range"
            min="15"
            max="300"
            value={state.filters.maxPrice}
            onChange={e => dispatch({ type: 'SET_MAX_PRICE', payload: Number(e.target.value) })}
            className="w-full accent-slate-900"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-2 block">Sort by</span>
          <select
            value={state.filters.sortBy}
            onChange={e => dispatch({ type: 'SET_SORT_BY', payload: e.target.value as 'low-to-high' | 'high-to-low' | 'title' })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          >
            <option value="low-to-high">Price: Low to high</option>
            <option value="high-to-low">Price: High to low</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
    </aside>
  );
}
