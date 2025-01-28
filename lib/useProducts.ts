import { useState, useEffect } from 'react'
import { Product } from './types'
import { getProducts } from './products'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getProducts()
        setProducts(fetchedProducts)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching products'))
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

