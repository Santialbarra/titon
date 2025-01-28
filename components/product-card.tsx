'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import { useStore } from '@/lib/store-context'
import { Product } from '@/lib/types'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { accentColor } = useStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {product.description || `Camiseta oficial del ${product.name.split(' ').slice(1).join(' ')}. 
          Temporada ${new Date().getFullYear()}/${new Date().getFullYear() + 1}.`}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">
            Tallas: {product.sizes ? product.sizes.join(', ') : 'No disponible'}
          </span>
        </div>
        <button
          onClick={() => addToCart({
            id: product.id,
            name: product.name,
            price: product.price.amount,
            quantity: 1,
            size: product.sizes ? product.sizes[0] : undefined,
            image: product.images[0]
          })}
          className="w-full text-white py-2 px-4 rounded hover:opacity-90 transition-colors"
          style={{ backgroundColor: accentColor }}
        >
          Agregar al carrito
        </button>
      </div>
    </motion.div>
  )
}

