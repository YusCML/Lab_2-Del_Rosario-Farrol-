"use client";

import { ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Header() {
  const { totalCartItems, dispatch } = useStore();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Nobie Hardware Store</p>
          <h1 className="text-xl font-bold text-slate-900">Premium tech essentials</h1>
        </div>

        <button
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          className="relative rounded-full border border-slate-200 bg-slate-900 p-3 text-white transition hover:bg-slate-700"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[11px] font-semibold text-slate-950">
            {totalCartItems}
          </span>
        </button>
      </div>
    </header>
  );
}
