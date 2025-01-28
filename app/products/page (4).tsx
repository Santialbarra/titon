'use client'

import { useState } from 'react'
import { ProductGrid } from '@/components/product-grid'
import { CategoryNav } from '@/components/category-nav'
import { useProducts } from '@/lib/useProducts'
import { Checkbox } from '@/components/ui/checkbox'

export default function ProductsPage() {
  const { products, loading, error } = useProducts()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  if (loading) return <div>Cargando productos...</div>
  if (error) return <div>Error: {error.message}</div>

  const categories = Array.from(new Set(products.map(p => p.categoryId).filter(Boolean)))
  const sizes = Array.from(new Set(products.flatMap(p => p.sizes || [])))

  const filteredProducts = products.filter(product => 
    (selectedCategories.length === 0 || (product.categoryId && selectedCategories.includes(product.categoryId))) &&
    (selectedSizes.length === 0 || (product.sizes && product.sizes.some(size => selectedSizes.includes(size))))
  )

  return (
    <>
      <CategoryNav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categorías</h3>
              {categories.map((category) => (
                <div key={category} className="flex items-center mb-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([...selectedCategories, category])
                      } else {
                        setSelectedCategories(selectedCategories.filter(id => id !== category))
                      }
                    }}
                  />
                  <label htmlFor={category} className="ml-2">
                    {category === 'argentina' ? 'Argentina' :
                     category === 'spain' ? 'España' :
                     category === 'england' ? 'Inglaterra' :
                     category === 'germany' ? 'Alemania' : category}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Tallas</h3>
              {sizes.map((size) => (
                <div key={size} className="flex items-center mb-2">
                  <Checkbox
                    id={size}
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSizes([...selectedSizes, size])
                      } else {
                        setSelectedSizes(selectedSizes.filter(s => s !== size))
                      }
                    }}
                  />
                  <label htmlFor={size} className="ml-2">{size}</label>
                </div>
              ))}
            </div>
          </aside>
          <main className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Nuestros Productos</h1>
            <p className="text-lg mb-8">
              Explora nuestra amplia selección de camisetas de fútbol de los equipos más populares del mundo. 
              Cada camiseta está fabricada con materiales de alta calidad para garantizar comodidad y durabilidad. 
              Ya sea que busques la camiseta de tu equipo favorito o quieras ampliar tu colección, tenemos algo para cada aficionado.
            </p>
            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </>
  )
}

