'use client'

import { useState, useEffect } from 'react'
import { Hero } from '@/components/hero'
import { ProductList } from '@/components/product-list'
import { productListSchema, categoryListSchema } from '@/lib/schema'
import { z } from 'zod'

type CategoryProductsProps = {
  categoryId: string
  subcategoryId?: string
}

export function CategoryProducts({ categoryId, subcategoryId }: CategoryProductsProps) {
  const [products, setProducts] = useState<z.infer<typeof productListSchema>>({ data: [], has_more: false })
  const [categories, setCategories] = useState<z.infer<typeof categoryListSchema>>([])

  useEffect(() => {
    // Aquí cargaríamos los productos y categorías desde el backend
    const mockProducts = [
      {
        id: '1',
        name: 'Camiseta Boca Juniors 2018',
        description: 'Camiseta oficial de Boca Juniors temporada 2018-2019',
        images: ['/placeholder.svg'],
        price: {
          id: 'price_1',
          amount: 5000,
          display_amount: '$50.00',
        },
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 10,
        categoryId: '1',
        subcategoryId: '1-1',
      },
      {
        id: '2',
        name: 'Camiseta River Plate 2019',
        description: 'Camiseta oficial de River Plate temporada 2019-2020',
        images: ['/placeholder.svg'],
        price: {
          id: 'price_2',
          amount: 5500,
          display_amount: '$55.00',
        },
        sizes: ['M', 'L', 'XL'],
        stock: 5,
        categoryId: '1',
        subcategoryId: '1-2',
      },
      {
        id: '3',
        name: 'Camiseta Barcelona 2023',
        description: 'Camiseta oficial del FC Barcelona temporada 2023-2024',
        images: ['/placeholder.svg'],
        price: {
          id: 'price_3',
          amount: 6000,
          display_amount: '$60.00',
        },
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 15,
        categoryId: '2',
        subcategoryId: null,
      },
    ]

    const initialCategories = [
      { id: '1', name: 'Campeonato Argentino', subcategories: [
        { id: '1-1', name: 'Temporada 2018-2019' },
        { id: '1-2', name: 'Temporada 2019-2020' },
      ]},
      { id: '2', name: 'Liga Española', subcategories: [] },
      { id: '3', name: 'Premier League', subcategories: [] },
    ]

    setProducts({
      data: mockProducts.filter(p => 
        p.categoryId === categoryId && 
        (subcategoryId ? p.subcategoryId === subcategoryId : true)
      ),
      has_more: false,
    })
    setCategories(initialCategories)
  }, [categoryId, subcategoryId])

  const category = categories.find(c => c.id === categoryId)
  const subcategory = category?.subcategories.find(s => s.id === subcategoryId)

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4">
      <Hero 
        title={`${category?.name || 'Categoría'} ${subcategory ? `- ${subcategory.name}` : ''}`}
        subtitle="Explora nuestra colección de camisetas de fútbol"
      />
      <ProductList list={products} />
    </div>
  )
}

