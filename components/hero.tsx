'use client'

import { useStore } from '@/lib/store-context'
import Image from 'next/image'

export function Hero() {
  const { accentColor, banner, heroTitle, heroSubtitle } = useStore()

  return (
    <div className="relative">
      <div className="absolute inset-0">
        <Image
          src={banner || "/placeholder.svg"}
          alt="Banner de la tienda"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div 
        className="relative text-white py-20"
        style={{ 
          background: `linear-gradient(to right, ${accentColor}CC, ${adjustColor(accentColor, -20)}CC)` 
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-8">{heroSubtitle}</p>
          <a href="/products" className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300">
            Ver Productos
          </a>
        </div>
      </div>
    </div>
  )
}

// Función auxiliar para ajustar el color
function adjustColor(color: string, amount: number) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

