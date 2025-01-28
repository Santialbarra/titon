"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CategoryManager } from "./category-manager"
import { BusinessAccounts } from "./business-accounts"
import type { productSchema } from "@/lib/schema"
import type { z } from "zod"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useStore } from "@/lib/store-context"
import { toast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"
import { AdminDashboardOverview } from "./admin-dashboard-overview"
import { BackupAndSecurity } from "./backup-and-security"
import { AdminTutorial } from "./admin-tutorial"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash } from "lucide-react"
import { ProductList } from "./product-list"
import { EditableProductList } from "./editable-product-list"

export function AdminDashboard() {
  const { logout } = useAuth()
  const { setTheme, theme } = useTheme()
  const {
    products,
    categories,
    storeName,
    logo,
    banner,
    contactInfo,
    heroTitle,
    heroSubtitle,
    addProduct,
    updateCategories,
    applyChanges,
  } = useStore()

  const [newProduct, setNewProduct] = useState<z.infer<typeof productSchema>>({
    id: "",
    name: "",
    description: "",
    images: [],
    price: { id: "", amount: 0, display_amount: "" },
    sizes: [],
    stock: 0,
    categoryId: "",
    subcategoryId: "",
  })
  const [tempChanges, setTempChanges] = useState({
    storeName,
    logo,
    banner,
    contactInfo,
    categories,
    theme,
    accentColor: "",
    heroTitle,
    heroSubtitle,
  })

  const [editingProduct, setEditingProduct] = useState<z.infer<typeof productSchema> | null>(null)

  useEffect(() => {
    setTempChanges({
      storeName,
      logo,
      banner,
      contactInfo,
      categories,
      theme: theme || "light",
      accentColor: "",
      heroTitle,
      heroSubtitle,
    })
  }, [storeName, logo, banner, contactInfo, categories, theme, heroTitle, heroSubtitle])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file))
    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 3), // Limit to 3 images
    }))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 3,
  })

  const onDropLogo = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setTempChanges((prev) => ({ ...prev, logo: URL.createObjectURL(file) }))
  }, [])

  const {
    getRootProps: getLogoRootProps,
    getInputProps: getLogoInputProps,
    isDragActive: isLogoDragActive,
  } = useDropzone({
    onDrop: onDropLogo,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  })

  const onDropBanner = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setTempChanges((prev) => ({ ...prev, banner: URL.createObjectURL(file) }))
  }, [])

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
    isDragActive: isBannerDragActive,
  } = useDropzone({
    onDrop: onDropBanner,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  })

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const newProductWithId = {
      ...newProduct,
      id: Date.now().toString(),
      price: {
        ...newProduct.price,
        display_amount: `$${newProduct.price.amount.toFixed(2)}`,
      },
    }
    addProduct(newProductWithId)
    setNewProduct({
      id: "",
      name: "",
      description: "",
      images: [],
      price: { id: "", amount: 0, display_amount: "" },
      sizes: [],
      stock: 0,
      categoryId: "",
      subcategoryId: "",
    })
    toast({
      title: "Producto agregado",
      description: "El producto ha sido agregado exitosamente.",
    })
  }

  const handleApplyChanges = (e: React.FormEvent) => {
    e.preventDefault()
    applyChanges(tempChanges)
    toast({
      title: "Cambios aplicados",
      description: "Los cambios han sido aplicados y guardados exitosamente.",
    })
  }

  const handleApplyAllChanges = () => {
    applyChanges({
      ...tempChanges,
      accentColor: tempChanges.accentColor,
    })
    setTheme(tempChanges.theme)
    toast({
      title: "Cambios aplicados",
      description: "Todos los cambios han sido aplicados y guardados exitosamente.",
    })
  }

  const handleEditProduct = (product: z.infer<typeof productSchema>) => {
    setEditingProduct(product)
  }

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      // Aquí iría la lógica para actualizar el producto en la tienda
      // Por ahora, solo actualizaremos el estado local
      const updatedProducts = products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      applyChanges({ ...tempChanges, products: updatedProducts })
      setEditingProduct(null)
      toast({
        title: "Producto actualizado",
        description: "El producto ha sido actualizado exitosamente.",
      })
    }
  }

  const handleDeleteProduct = (productId: string) => {
    // Aquí iría la lógica para eliminar el producto de la tienda
    // Por ahora, solo actualizaremos el estado local
    const updatedProducts = products.filter((p) => p.id !== productId)
    applyChanges({ ...tempChanges, products: updatedProducts })
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado exitosamente.",
    })
  }

  return (
    <div className="container mx-auto mt-8 max-w-7xl">
      <h1 className="mb-6 text-3xl font-bold">Panel de Administración</h1>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="edit-products">Editar Productos</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
          <TabsTrigger value="accounts">Cuentas</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
          <TabsTrigger value="style">Estilo</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AdminDashboardOverview />
        </TabsContent>

        <TabsContent value="products">
          <h2 className="mb-4 text-2xl font-semibold">Agregar Nuevo Producto</h2>

          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <Label htmlFor="productName">Nombre del producto</Label>
              <Input
                id="productName"
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="productPrice">Precio</Label>
              <Input
                id="productPrice"
                type="number"
                value={newProduct.price.amount === 0 ? "" : newProduct.price.amount}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: { ...newProduct.price, amount: e.target.value === "" ? 0 : Number(e.target.value) },
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="productDescription">Descripción</Label>
              <Textarea
                id="productDescription"
                value={newProduct.description || ""}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="productSizes">Talles disponibles</Label>
              <Input
                id="productSizes"
                type="text"
                placeholder="Separados por coma (ej: S, M, L, XL)"
                value={newProduct.sizes.join(", ")}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, sizes: e.target.value.split(",").map((s) => s.trim()) })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="productStock">Stock</Label>
              <Input
                id="productStock"
                type="number"
                value={newProduct.stock === 0 ? "" : newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value === "" ? 0 : Number(e.target.value) })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="productCategory">Categoría</Label>
              <Select
                onValueChange={(value) => setNewProduct({ ...newProduct, categoryId: value })}
                value={newProduct.categoryId}
              >
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
            {newProduct.categoryId && (
              <div>
                <Label htmlFor="productSubcategory">Subcategoría</Label>
                <Select
                  onValueChange={(value) => setNewProduct({ ...newProduct, subcategoryId: value })}
                  value={newProduct.subcategoryId}
                >
                  <SelectTrigger id="productSubcategory">
                    <SelectValue placeholder="Selecciona una subcategoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .find((c) => c.id === newProduct.categoryId)
                      ?.subcategories.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>Imágenes del producto</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                  isDragActive ? "border-primary" : "border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Suelta las imágenes aquí...</p>
                ) : (
                  <p>Arrastra y suelta hasta 3 imágenes aquí, o haz clic para seleccionar archivos</p>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                {newProduct.images.map((image, index) => (
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
            <Button type="submit">Agregar Producto</Button>
          </form>
        </TabsContent>

        <TabsContent value="edit-products">
          <h2 className="mb-4 text-2xl font-semibold">Editar Productos</h2>
          <EditableProductList />
        </TabsContent>

        <TabsContent value="product-list">
          <ProductList products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
        </TabsContent>

        <TabsContent value="categories">
          <h2 className="mb-4 text-2xl font-semibold">Gestionar Categorías</h2>
          <CategoryManager
            categories={tempChanges.categories}
            onChange={(newCategories) => setTempChanges((prev) => ({ ...prev, categories: newCategories }))}
          />
          <Button onClick={handleApplyChanges} className="mt-4">
            Aplicar Cambios
          </Button>
        </TabsContent>

        <TabsContent value="accounts">
          <h2 className="mb-4 text-2xl font-semibold">Cuentas del Negocio</h2>
          <BusinessAccounts />
          <Button onClick={handleApplyChanges} className="mt-4">
            Aplicar Cambios
          </Button>
        </TabsContent>

        <TabsContent value="contact">
          <h2 className="mb-4 text-2xl font-semibold">Información de Contacto</h2>
          <form onSubmit={handleApplyChanges} className="space-y-4">
            <div>
              <Label htmlFor="whatsapp">Número de WhatsApp</Label>
              <Input
                id="whatsapp"
                type="text"
                placeholder="Ej: 5491112345678"
                value={tempChanges.contactInfo.whatsapp}
                onChange={(e) =>
                  setTempChanges({
                    ...tempChanges,
                    contactInfo: { ...tempChanges.contactInfo, whatsapp: e.target.value },
                  })
                }
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Ingresa el número completo con código de país, sin espacios ni guiones.
              </p>
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                type="text"
                placeholder="Ej: @tutienda"
                value={tempChanges.contactInfo.instagram}
                onChange={(e) =>
                  setTempChanges({
                    ...tempChanges,
                    contactInfo: { ...tempChanges.contactInfo, instagram: e.target.value },
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ej: contacto@tutienda.com"
                value={tempChanges.contactInfo.email}
                onChange={(e) =>
                  setTempChanges({ ...tempChanges, contactInfo: { ...tempChanges.contactInfo, email: e.target.value } })
                }
                required
              />
            </div>
            <Button type="submit">Aplicar Cambios</Button>
          </form>
        </TabsContent>

        <TabsContent value="style">
          <h2 className="mb-4 text-2xl font-semibold">Personalizar Estilo</h2>
          <form onSubmit={handleApplyChanges} className="space-y-4">
            <div>
              <Label htmlFor="storeName">Nombre de la Tienda</Label>
              <Input
                id="storeName"
                type="text"
                value={tempChanges.storeName}
                onChange={(e) => setTempChanges({ ...tempChanges, storeName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Logo</Label>
              <div
                {...getLogoRootProps()}
                className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                  isLogoDragActive ? "border-primary" : "border-gray-300"
                }`}
              >
                <input {...getLogoInputProps()} />
                {isLogoDragActive ? (
                  <p>Suelta el logo aquí...</p>
                ) : (
                  <p>Arrastra y suelta el logo aquí, o haz clic para seleccionar un archivo</p>
                )}
              </div>
              {tempChanges.logo && (
                <div className="mt-2">
                  <Image
                    src={tempChanges.logo || "/placeholder.svg"}
                    alt="Logo de la tienda"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            <div>
              <Label>Banner</Label>
              <div
                {...getBannerRootProps()}
                className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                  isBannerDragActive ? "border-primary" : "border-gray-300"
                }`}
              >
                <input {...getBannerInputProps()} />
                {isBannerDragActive ? (
                  <p>Suelta el banner aquí...</p>
                ) : (
                  <p>Arrastra y suelta el banner aquí, o haz clic para seleccionar un archivo</p>
                )}
              </div>
              {tempChanges.banner && (
                <div className="mt-2">
                  <Image
                    src={tempChanges.banner || "/placeholder.svg"}
                    alt="Banner de la tienda"
                    width={200}
                    height={100}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="heroTitle">Título del Hero</Label>
              <Input
                id="heroTitle"
                type="text"
                value={tempChanges.heroTitle}
                onChange={(e) => setTempChanges({ ...tempChanges, heroTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="heroSubtitle">Subtítulo del Hero</Label>
              <Input
                id="heroSubtitle"
                type="text"
                value={tempChanges.heroSubtitle}
                onChange={(e) => setTempChanges({ ...tempChanges, heroSubtitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="theme">Tema</Label>
              <Select
                onValueChange={(value) => setTempChanges({ ...tempChanges, theme: value })}
                value={tempChanges.theme}
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Selecciona un tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Oscuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accentColor">Color de Acento</Label>
              <Input
                id="accentColor"
                type="color"
                value={tempChanges.accentColor}
                onChange={(e) => setTempChanges({ ...tempChanges, accentColor: e.target.value })}
              />
            </div>
            <Button type="submit">Aplicar Cambios</Button>
          </form>
        </TabsContent>

        <TabsContent value="security">
          <h2 className="mb-4 text-2xl font-semibold">Seguridad y Respaldos</h2>
          <BackupAndSecurity />
        </TabsContent>

        <TabsContent value="tutorial">
          <h2 className="mb-4 text-2xl font-semibold">Tutorial del Panel de Administración</h2>
          <AdminTutorial />
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-between items-center">
        <Button onClick={logout} variant="outline">
          Cerrar Sesión
        </Button>
        <Button onClick={handleApplyAllChanges} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Aplicar Todos los Cambios
        </Button>
      </div>
    </div>
  )
}

