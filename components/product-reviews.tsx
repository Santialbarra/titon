'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { getProductReviews, submitProductReview } from '@/lib/api'

export function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState([])
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    await submitProductReview(productId, data)
    const updatedReviews = await getProductReviews(productId)
    setReviews(updatedReviews)
    reset()
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Reseñas de clientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="font-semibold">{review.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{review.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Por {review.author} el {new Date(review.date).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Escribe una reseña</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="rating" className="block mb-1">Calificación</label>
              <select
                {...register('rating', { required: true })}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecciona una calificación</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>{value} estrellas</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="title" className="block mb-1">Título</label>
              <input
                {...register('title', { required: true })}
                className="w-full p-2 border rounded"
                placeholder="Resume tu experiencia"
              />
            </div>
            <div>
              <label htmlFor="content" className="block mb-1">Reseña</label>
              <textarea
                {...register('content', { required: true })}
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Cuéntanos más sobre tu experiencia con el producto"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Enviar reseña
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

