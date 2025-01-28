"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { z } from "zod"
import type { productSchema, categoryListSchema } from "./schema"
import { getProducts } from "./products"

type Product = z.infer<typeof productSchema>
type Category = z.infer<typeof categoryListSchema>[number]

interface ContactInfo {
  whatsapp: string
  instagram: string
  email: string
}

interface StoreState {
  products: Product[]
  categories: Category[]
  storeName: string
  logo: string
  banner: string
  primaryColor: string
  secondaryColor: string
  contactInfo: ContactInfo
  accentColor: string
  heroTitle: string
  heroSubtitle: string
}

interface StoreContextType extends StoreState {
  addProduct: (product: Product) => void
  updateCategories: (categories: Category[]) => void
  updateStoreName: (name: string) => void
  updateLogo: (logo: string) => void
  updateBanner: (banner: string) => void
  updatePrimaryColor: (color: string) => void
  updateSecondaryColor: (color: string) => void
  updateContactInfo: (info: ContactInfo) => void
  updateAccentColor: (color: string) => void
  updateHeroTitle: (title: string) => void
  updateHeroSubtitle: (subtitle: string) => void
  applyChanges: (changes: Partial<StoreState>) => void
  updateProduct: (updatedProduct: Product) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>({
    products: [],
    categories: [],
    storeName: "Premium Camisetas Pna",
    logo: "/logo.png",
    banner: "/banner.jpg",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    contactInfo: {
      whatsapp: "+54 9 3435 00-4153",
      instagram: "",
      email: "",
    },
    accentColor: "#3B82F6",
    heroTitle: "Bienvenido a nuestra Tienda de Fútbol",
    heroSubtitle: "Descubre las mejores camisetas de tus equipos favoritos",
  })

  const applyColors = (colors: { primaryColor: string; secondaryColor: string; accentColor: string }) => {
    document.documentElement.style.setProperty("--background", colors.secondaryColor)
    document.documentElement.style.setProperty("--foreground", colors.primaryColor)
    document.documentElement.style.setProperty("--primary", colors.primaryColor)
    document.documentElement.style.setProperty("--primary-foreground", colors.secondaryColor)
    document.documentElement.style.setProperty("--secondary", colors.secondaryColor)
    document.documentElement.style.setProperty("--secondary-foreground", colors.primaryColor)
    document.documentElement.style.setProperty("--accent", colors.accentColor)
  }

  useEffect(() => {
    const initializeStore = async () => {
      const savedState = localStorage.getItem("storeState")
      if (savedState) {
        const parsedState = JSON.parse(savedState)
        const products = await getProducts()
        setState({
          ...parsedState,
          products: products,
        })
      } else {
        const products = await getProducts()
        setState((prevState) => ({
          ...prevState,
          products: products,
        }))
      }
    }

    initializeStore()
  }, [])

  useEffect(() => {
    localStorage.setItem("storeState", JSON.stringify(state))
    applyColors({
      primaryColor: state.primaryColor,
      secondaryColor: state.secondaryColor,
      accentColor: state.accentColor,
    })
  }, [state]) // Removed applyColors from dependencies

  const addProduct = (product: Product) => {
    setState((prevState) => ({
      ...prevState,
      products: [...prevState.products, product],
    }))
  }

  const updateCategories = (categories: Category[]) => {
    setState((prevState) => ({
      ...prevState,
      categories,
    }))
  }

  const updateStoreName = (name: string) => {
    setState((prevState) => ({
      ...prevState,
      storeName: name,
    }))
  }

  const updateLogo = (logo: string) => {
    setState((prevState) => ({
      ...prevState,
      logo,
    }))
  }

  const updateBanner = (banner: string) => {
    setState((prevState) => ({
      ...prevState,
      banner,
    }))
  }

  const updatePrimaryColor = (color: string) => {
    setState((prevState) => ({
      ...prevState,
      primaryColor: color,
    }))
  }

  const updateSecondaryColor = (color: string) => {
    setState((prevState) => ({
      ...prevState,
      secondaryColor: color,
    }))
  }

  const updateContactInfo = (info: ContactInfo) => {
    setState((prevState) => ({
      ...prevState,
      contactInfo: info,
    }))
  }

  const updateAccentColor = (color: string) => {
    setState((prevState) => ({
      ...prevState,
      accentColor: color,
    }))
  }

  const updateHeroTitle = (title: string) => {
    setState((prevState) => ({
      ...prevState,
      heroTitle: title,
    }))
  }

  const updateHeroSubtitle = (subtitle: string) => {
    setState((prevState) => ({
      ...prevState,
      heroSubtitle: subtitle,
    }))
  }

  const applyChanges = (changes: Partial<StoreState>) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        ...changes,
      }
      applyColors({
        primaryColor: newState.primaryColor,
        secondaryColor: newState.secondaryColor,
        accentColor: newState.accentColor,
      })
      return newState
    })
  }

  const updateProduct = (updatedProduct: Product) => {
    setState((prevState) => ({
      ...prevState,
      products: prevState.products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    }))

    // Aquí podrías agregar lógica para guardar en una base de datos o API
    console.log("Producto actualizado:", JSON.stringify(updatedProduct, null, 2))
  }

  return (
    <StoreContext.Provider
      value={{
        ...state,
        addProduct,
        updateCategories,
        updateStoreName,
        updateLogo,
        updateBanner,
        updatePrimaryColor,
        updateSecondaryColor,
        updateContactInfo,
        updateAccentColor,
        updateHeroTitle,
        updateHeroSubtitle,
        applyChanges,
        updateProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

