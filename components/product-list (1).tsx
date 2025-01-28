import { ProductListThumbnail } from '@/components/product-list-thumbnail'
import { productListSchema } from '@/lib/schema'
import { z } from 'zod'

export function ProductList({
  list,
}: {
  list: z.infer<typeof productListSchema>
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {list.data.map(product => (
        <ProductListThumbnail key={product.id} product={product} />
      ))}
    </div>
  )
}

