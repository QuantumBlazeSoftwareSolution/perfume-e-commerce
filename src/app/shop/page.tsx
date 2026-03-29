import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import SortDropdown from "@/components/shop/SortDropdown";

export const metadata = {
  title: "Shop Collection | Scentara Ceylon Haute Parfumerie",
  description: "Explore our curated collection of 240+ luxury fragrances.",
};

export default function ShopPage() {
  return (
    <main className="w-full min-h-screen bg-white pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="font-display italic text-5xl md:text-6xl text-ink mb-4">The Collection</h1>
          <p className="text-muted font-light max-w-lg">
            Discover our entire archive of rare extracts, parfums, and absolutes. Each bottle is a world unto itself.
          </p>
        </div>
        <SortDropdown />
      </div>

      {/* Main Content Split */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-10">
        <FilterSidebar />
        <ProductGrid />
      </div>
    </main>
  );
}
