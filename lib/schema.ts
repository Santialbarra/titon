import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  images: z.array(z.string()).max(3).default([]),
  price: z.object({
    id: z.string(),
    amount: z.number().optional().default(0),
    display_amount: z.string().optional(),
  }),
  sizes: z.array(z.string()).default([]),
  stock: z.number().default(0),
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
})

export const productListSchema = z.object({
  data: z.array(productSchema),
  has_more: z.boolean(),
  starting_after: z.string().optional().nullable(),
})

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  subcategories: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })),
})

export const categoryListSchema = z.array(categorySchema)

