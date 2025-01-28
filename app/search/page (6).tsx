'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductList } from '@/components/product-list'
import { productListSchema } from '@/lib/schema'
import { z } from 'zod'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const category = searchParams.get('category')
  const [searchResults, setSearchResults] = useState<z.infer<typeof productListSchema>>({ data: [], has_more: false })

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await fetch(`/api/search?q=${query}${category ? `&category=${category}` : ''}`)
      const data = await response.json()
      setSearchResults({ data: data.data, has_more: false })
    }
    if (query) {
      fetchSearchResults()
    }
  }, [query, category])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Resultados de búsqueda para: {query}</h1>
      {category && category !== 'all' && <p className="mb-4">Categoría: {category}</p>}
      <ProductList list={searchResults} />
    </div>
  )
}

