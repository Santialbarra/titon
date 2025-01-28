"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price.amount,
      quantity: 1,
      size: product.sizes ? product.sizes[0] : undefined,
      image: product.images[0],
    })
  }

  return (
    <Button onClick={handleAddToCart} className="w-full">
      Agregar al carrito
    </Button>
  )
}

