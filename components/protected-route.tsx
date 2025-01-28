"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Role = "admin" | "user" | "guest"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: Role[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login")
      } else if (user && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized")
      } else {
        setIsAuthorized(true)
      }
    }
  }, [isAuthenticated, user, loading, router, allowedRoles])

  if (loading) {
    return <div>Cargando...</div>
  }

  return isAuthorized ? <>{children}</> : null
}

