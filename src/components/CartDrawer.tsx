"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function CartDrawer() {
  const { state, dispatch, subtotal } = useStore();

  if (!state.isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/40">
      <div className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Your cart</h2>
            <p className="text-sm text-slate-500">{state.cart.length} items selected</p>
          </div>
          <button onClick={() => dispatch({ type: 'TOGGLE_CART' })} className="text-sm font-semibold text-slate-600">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {state.cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <ShoppingCart className="mb-3 h-10 w-10 text-slate-400" />
              <p className="font-medium text-slate-700">Your cart is empty</p>
              <p className="mt-1 text-sm text-slate-500">Add a few premium gadgets to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.cart.map(item => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-500">{item.category}</p>
                    </div>
                    <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })} className="text-slate-400 hover:text-rose-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 p-1">
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                        className="rounded-full p-1 hover:bg-slate-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                        className="rounded-full p-1 hover:bg-slate-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-semibold text-slate-900">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span className="text-lg font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            className="mb-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Clear cart
          </button>
          <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700">
            Simulate checkout
          </button>
        </div>
      </div>
    </div>
  );
}
