import { ProductBuyForm } from '@/components/product-buy-form'
import { productSchema } from '@/lib/schema'
import Image from 'next/image'
import { z } from 'zod'

export function ProductListThumbnail({
  product,
}: {
  product: z.infer<typeof productSchema>
}) {
  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg'}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-muted-foreground mb-4">{product.price.display_amount}</p>
        <ProductBuyForm 
          product={{
            id: product.id,
            name: product.name,
            price: product.price.amount || 0,
            sizes: product.sizes || [],
            stock: product.stock || 0
          }}
        />
      </div>
    </div>
  )
}

export function ProductListThumbnailSkeleton() {
  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden animate-pulse">
      <div className="bg-muted aspect-square"></div>
      <div className="p-4">
        <div className="h-6 bg-muted rounded mb-2"></div>
        <div className="h-4 bg-muted rounded mb-4"></div>
        <div className="h-10 bg-muted rounded"></div>
      </div>
    </div>
  )
}

