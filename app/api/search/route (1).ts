import { NextResponse } from 'next/server'
import Fuse from 'fuse.js'
import { getProducts } from '@/lib/products'
import { productSchema } from '@/lib/schema'
import { z } from 'zod'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const category = searchParams.get('category')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  const allProducts = await getProducts()
  let products = allProducts.data

  if (category && category !== 'all') {
    products = products.filter(product => product.categoryId === category)
  }

  const fuse = new Fuse(products, {
    keys: ['name', 'description'],
    includeScore: true,
    threshold: 0.4,
  })

  const searchResults = fuse.search(query)

  const results = searchResults.map(result => result.item)

  return NextResponse.json({ data: results })
}

