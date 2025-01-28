import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, X } from "lucide-react"
import type { productSchema } from "@/lib/schema"
import type { z } from "zod"
import { useStore } from "@/lib/store-context"
import { EditProductForm } from "./edit-product-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

type Product = z.infer<typeof productSchema>

export function EditableProductList() {
  const { products, updateProduct } = useStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const handleUpdate = (updatedProduct: Product) => {
    updateProduct(updatedProduct)
    setIsDialogOpen(false)
    setEditingProduct(null)
    toast({
      title: "Producto actualizado",
      description: "El producto ha sido actualizado exitosamente.",
    })
  }

  const handleClose = () => {
    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.amount.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          {editingProduct && <EditProductForm product={editingProduct} onUpdate={handleUpdate} onClose={handleClose} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

