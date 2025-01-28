'use client'

import { useStore } from '@/lib/store-context'
import Image from 'next/image'
import { CategoryNav } from '@/components/category-nav'

export function Banner() {
  const { banner } = useStore()

  return (
    <div className="w-full">
      <CategoryNav />
      <div className="h-40 relative overflow-hidden">
        <Image
          src={banner || "/placeholder.svg"}
          alt="Banner de la tienda"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  )
}

