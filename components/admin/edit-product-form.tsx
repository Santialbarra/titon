import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import type { productSchema } from "@/lib/schema"
import type { z } from "zod"
import { useStore } from "@/lib/store-context"

type Product = z.infer<typeof productSchema>

interface EditProductFormProps {
  product: Product
  onUpdate: (updatedProduct: Product) => void
  onClose: () => void
}

export function EditProductForm({ product, onUpdate, onClose }: EditProductFormProps) {
  const [editedProduct, setEditedProduct] = useState<Product>(product)
  const { categories } = useStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(editedProduct)
  }

  const handleChange = (field: keyof Product, value: any) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="productName">Nombre del producto</Label>
          <Input
            id="productName"
            value={editedProduct.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="productPrice">Precio</Label>
          <Input
            id="productPrice"
            type="number"
            value={editedProduct.price.amount}
            onChange={(e) =>
              handleChange("price", {
                ...editedProduct.price,
                amount: Number(e.target.value),
                display_amount: `$${Number(e.target.value).toFixed(2)}`,
              })
            }
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="productDescription">Descripción</Label>
        <Textarea
          id="productDescription"
          value={editedProduct.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="productSizes">Talles disponibles</Label>
          <Input
            id="productSizes"
            value={editedProduct.sizes.join(", ")}
            onChange={(e) =>
              handleChange(
                "sizes",
                e.target.value.split(",").map((s) => s.trim()),
              )
            }
            placeholder="S, M, L, XL"
            required
          />
        </div>
        <div>
          <Label htmlFor="productStock">Stock</Label>
          <Input
            id="productStock"
            type="number"
            value={editedProduct.stock}
            onChange={(e) => handleChange("stock", Number(e.target.value))}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="productCategory">Categoría</Label>
          <Select value={editedProduct.categoryId} onValueChange={(value) => handleChange("categoryId", value)}>
            <SelectTrigger id="productCategory">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {editedProduct.categoryId && (
          <div>
            <Label htmlFor="productSubcategory">Subcategoría</Label>
            <Select
              value={editedProduct.subcategoryId || ""}
              onValueChange={(value) => handleChange("subcategoryId", value)}
            >
              <SelectTrigger id="productSubcategory">
                <SelectValue placeholder="Selecciona una subcategoría" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .find((c) => c.id === editedProduct.categoryId)
                  ?.subcategories.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div>
        <Label>Imágenes del producto</Label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {editedProduct.images.map((image, index) => (
            <Image
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Producto ${index + 1}`}
              width={100}
              height={100}
              className="object-cover rounded"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Guardar Cambios</Button>
      </div>
    </form>
  )
}

