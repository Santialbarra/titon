export type Product = {
  id: string
  name: string
  price: {
    amount: number
    display_amount: string
  }
  images: string[]
  description?: string
  sizes?: string[]
  stock?: number
  categoryId?: string
  subcategoryId?: string
}

export type Category = {
  id: string
  name: string
  subcategories: {
    id: string
    name: string
  }[]
}

