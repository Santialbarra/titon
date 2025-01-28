import type { Product } from "./types"

// This is a mock implementation. In a real application, you would fetch this data from an API or database.
export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulating an API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock featured products
  return [
    {
      id: "1",
      name: "Camiseta Boca Juniors",
      price: { amount: 5000, display_amount: "$50.00" },
      images: ["/placeholder.svg"],
      sizes: ["S", "M", "L"],
      categoryId: "argentina",
      stock: 50,
    },
    {
      id: "2",
      name: "Camiseta River Plate",
      price: { amount: 5500, display_amount: "$55.00" },
      images: ["/placeholder.svg"],
      sizes: ["M", "L", "XL"],
      categoryId: "argentina",
      stock: 40,
    },
    {
      id: "3",
      name: "Camiseta Barcelona",
      price: { amount: 6000, display_amount: "$60.00" },
      images: ["/placeholder.svg"],
      sizes: ["S", "M", "L", "XL"],
      categoryId: "spain",
      stock: 30,
    },
    {
      id: "4",
      name: "Camiseta Real Madrid",
      price: { amount: 6000, display_amount: "$60.00" },
      images: ["/placeholder.svg"],
      sizes: ["S", "M", "L", "XL"],
      categoryId: "spain",
      stock: 35,
    },
  ]
}

export async function getProducts(): Promise<Product[]> {
  // Simulating an API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock all products
  return [
    {
      id: "1",
      name: "Camiseta Boca Juniors",
      price: { amount: 5000, display_amount: "$50.00" },
      images: ["/placeholder.svg"],
      sizes: ["S", "M", "L"],
      categoryId: "argentina",
      stock: 50,
    },
    {
      id: "2",
      name: "Camiseta River Plate",
      price: { amount: 5500, display_amount: "$55.00" },
      images: ["/placeholder.svg"],
      sizes: ["M", "L", "XL"],
      categoryId: "argentina",
      stock: 40,
    },
    {
      id: "3",
      name: "Camiseta Barcelona",
      price: { amount: 6000, display_amount: "$60.00" },
      images: ["/placeholder.svg"],
      sizes: ["S", "M", "L", "XL"],
      categoryId: "spain",
      stock: 30,
    },
    {
      id: "4",
      name: "Camiseta Real Madrid",
      price: { amount: 6000, display_amount: "$60.00" },
      images: ["/placeholder.svg"],
      sizes: ["S", "M", "L", "XL"],
      categoryId: "spain",
      stock: 35,
    },
    {
      id: "5",
      name: "Camiseta Manchester United",
      price: { amount: 5800, display_amount: "$58.00" },
      images: ["/placeholder.svg"],
      sizes: ["S", "M", "L"],
      categoryId: "england",
      stock: 45,
    },
    {
      id: "6",
      name: "Camiseta Bayern Munich",
      price: { amount: 5700, display_amount: "$57.00" },
      images: ["/placeholder.svg"],
      sizes: ["M", "L", "XL"],
      categoryId: "germany",
      stock: 38,
    },
  ]
}

export async function getProduct(id: string): Promise<Product | null> {
  // Simulating an API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const products = await getProducts()
  return products.find((product) => product.id === id) || null
}

