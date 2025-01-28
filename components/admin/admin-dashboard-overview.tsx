"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useStore } from "@/lib/store-context"

export function AdminDashboardOverview() {
  const { products } = useStore()
  const [salesData, setSalesData] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [lowStockProducts, setLowStockProducts] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [productsSold, setProductsSold] = useState(0)

  useEffect(() => {
    // Simular datos de ventas basados en los productos
    const simulatedSalesData = [
      { name: "Ene", total: Math.floor(Math.random() * 5000) },
      { name: "Feb", total: Math.floor(Math.random() * 5000) },
      { name: "Mar", total: Math.floor(Math.random() * 5000) },
      { name: "Abr", total: Math.floor(Math.random() * 5000) },
      { name: "May", total: Math.floor(Math.random() * 5000) },
      { name: "Jun", total: Math.floor(Math.random() * 5000) },
    ]
    setSalesData(simulatedSalesData)

    // Calcular productos más vendidos
    const sortedProducts = [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0))
    setTopProducts(sortedProducts.slice(0, 3))

    // Calcular productos con bajo stock
    setLowStockProducts(products.filter((p) => (p.stock || 0) < 5))

    // Calcular ventas totales y productos vendidos
    const total = products.reduce((sum, product) => sum + (product.sales || 0) * (product.price?.amount || 0), 0)
    setTotalSales(total)
    setProductsSold(products.reduce((sum, product) => sum + (product.sales || 0), 0))
  }, [products])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Productos Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{productsSold}</div>
          <p className="text-xs text-muted-foreground">+201 desde la semana pasada</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Productos con Bajo Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{lowStockProducts.length}</div>
          <p className="text-xs text-muted-foreground">Requieren atención</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nuevos Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+54</div>
          <p className="text-xs text-muted-foreground">+19% desde el mes pasado</p>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Resumen de Ventas</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Productos Más Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {topProducts.map((product, index) => (
              <li key={index} className="mb-2 flex justify-between">
                <span>{product.name}</span>
                <span>{product.sales || 0} vendidos</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Productos con Bajo Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {lowStockProducts.map((product, index) => (
              <li key={index} className="mb-2 flex justify-between">
                <span>{product.name}</span>
                <span className="text-red-500">{product.stock || 0} en stock</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

