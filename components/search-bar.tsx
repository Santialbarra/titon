'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { searchProducts } from '@/lib/api'
import Link from 'next/link'
import { Product } from '@/lib/types'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 300)
  const [results, setResults] = useState<Product[]>([])
  const router = useRouter()

  useEffect(() => {
    if (debouncedQuery) {
      searchProducts(debouncedQuery).then(setResults)
    } else {
      setResults([])
    }
  }, [debouncedQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        type="search"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-10"
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      {results.length > 0 && (
        <div className="absolute z-10 w-full bg-white dark:bg-gray-800 mt-1 rounded-md shadow-lg">
          {results.map((result) => (
            <Link
              key={result.id}
              href={`/products/${result.id}`}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {result.name}
            </Link>
          ))}
        </div>
      )}
    </form>
  )
}

