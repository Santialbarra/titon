"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

type Role = "admin" | "user" | "guest"

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  user: { id: string; username: string; role: Role } | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<AuthContextType["user"]>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken")
      if (token) {
        try {
          const decodedToken = jwtDecode(token) as { id: string; username: string; role: Role } | null
          if (decodedToken) {
            setIsAuthenticated(true)
            setUser(decodedToken)
          }
        } catch (err) {
          console.error("Error decoding token:", err)
          localStorage.removeItem("adminToken")
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("adminToken", data.token)
        setIsAuthenticated(true)
        setUser({ id: data.id, username: data.username, role: data.role })
      } else {
        setError("Credenciales inválidas")
      }
    } catch (err) {
      setError("Ocurrió un error. Por favor, intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("adminToken")
    setIsAuthenticated(false)
    setUser(null)
  }

  const contextValue: AuthContextType = {
    isAuthenticated,
    loading,
    error,
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

