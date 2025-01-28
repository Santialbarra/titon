import { Product } from './types'

// This is a mock implementation. In a real application, you would make actual API calls.
export async function searchProducts(query: string): Promise<Product[]> {
  // Simulating an API call delay
  await new Promise(resolve => setTimeout(resolve, 300))

  // Mock data
  const allProducts: Product[] = [
    { id: '1', name: 'Camiseta Boca Juniors', price: { amount: 5000, display_amount: '$50.00' }, images: ['/placeholder.svg'] },
    { id: '2', name: 'Camiseta River Plate', price: { amount: 5500, display_amount: '$55.00' }, images: ['/placeholder.svg'] },
    { id: '3', name: 'Camiseta Barcelona', price: { amount: 6000, display_amount: '$60.00' }, images: ['/placeholder.svg'] },
    // Add more mock products as needed
  ]

  // Filter products based on the query
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase())
  )
}

export async function getProductReviews(productId: string) {
  // Simulating an API call delay
  await new Promise(resolve => setTimeout(resolve, 300))

  // Mock data
  return [
    { id: '1', rating: 5, title: 'Great product!', content: 'I love this product, it\'s amazing!', author: 'John Doe', date: '2023-06-01' },
    { id: '2', rating: 4, title: 'Good quality', content: 'The quality is good, but a bit pricey.', author: 'Jane Smith', date: '2023-05-28' },
    // Add more mock reviews as needed
  ]
}

export async function submitProductReview(productId: string, review: any) {
  // Simulating an API call delay
  await new Promise(resolve => setTimeout(resolve, 300))

  // In a real application, you would send the review to your backend
  console.log('Submitting review for product', productId, review)

  // Return a mock response
  return { success: true, message: 'Review submitted successfully' }
}

