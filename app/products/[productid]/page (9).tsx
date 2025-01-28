import { Suspense } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProduct } from "@/lib/products"
import { AddToCartButton } from "@/components/add-to-cart-button"

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await getProduct(params.productId)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
              <p className="text-gray-500">Lo siento, este producto no cuenta con imágenes</p>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">{product.price.display_amount}</p>
          <p className="mb-6">{product.description}</p>
          <AddToCartButton product={product} />
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Detalles del producto</h2>
            {product.details && Array.isArray(product.details) && product.details.length > 0 ? (
              <ul className="list-disc pl-5">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            ) : (
              <p>No hay detalles disponibles para este producto.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

