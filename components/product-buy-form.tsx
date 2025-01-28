'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function ProductBuyForm({ product }: { product: { id: string, name: string, price: number, sizes: string[], stock: number } }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <Select onValueChange={setSelectedSize} defaultValue={selectedSize}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona un talle" />
        </SelectTrigger>
        <SelectContent>
          {product.sizes.map((size) => (
            <SelectItem key={size} value={size}>{size}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleAddToCart} className="w-full" disabled={product.stock === 0}>
        {product.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
      </Button>
    </div>
  )
}

