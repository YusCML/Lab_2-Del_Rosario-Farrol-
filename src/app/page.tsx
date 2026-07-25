import Header from '@/components/Header';
import FilterSidebar from '@/components/FilterSidebar';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import { StoreProvider } from '@/context/StoreContext';

export default function HomePage() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">GearHub</p>
            <h2 className="mt-2 text-3xl font-bold">Build your ideal setup with high-performance tech.</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Browse curated devices, filter by price or category, and manage your cart in one polished experience.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <FilterSidebar />
            <ProductGrid />
          </div>
        </main>
        <CartDrawer />
      </div>
    </StoreProvider>
  );
}
