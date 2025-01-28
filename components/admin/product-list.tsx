import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import type { productSchema } from "@/lib/schema"
import type { z } from "zod"
import { useStore } from "@/lib/store-context"
import { EditProductForm } from "./edit-product-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

type Product = z.infer<typeof productSchema>

export function ProductList() {
  const { products, applyChanges } = useStore()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setEditingProductId(product.id)
  }

  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter((p) => p.id !== productId)
    applyChanges({ products: updatedProducts })
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado exitosamente.",
    })
  }

  const handleUpdate = (updatedProduct: Product) => {
    const updatedProducts = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    applyChanges({ products: updatedProducts })
    setEditingProduct(null)
    setEditingProductId(null)
    toast({
      title: "Producto actualizado",
      description: "El producto ha sido actualizado exitosamente.",
    })
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Lista de Productos</h2>
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
                <div className="flex space-x-2">
                  <Dialog
                    open={editingProductId === product.id}
                    onOpenChange={(open) => !open && setEditingProductId(null)}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editar Producto</DialogTitle>
                      </DialogHeader>
                      {editingProduct && editingProduct.id === product.id && (
                        <EditProductForm product={editingProduct} onUpdate={handleUpdate} />
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

