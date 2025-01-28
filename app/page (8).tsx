import { Suspense } from "react"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { CategoryNav } from "@/components/category-nav"
import { getFeaturedProducts } from "@/lib/products"
import { useStore } from "@/lib/store-context"

export default async function HomePage() {
  return (
    <>
      <Hero />
      <CategoryNav />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Productos Destacados</h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </main>
    </>
  )
}

function FeaturedProducts() {
  const { products } = useStore()
  return <ProductGrid products={products.slice(0, 4)} />
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-300 h-64 rounded-lg mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  )
}

