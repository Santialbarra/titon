'use client'

import { useEffect, useState } from 'react'
import { AdminLoginForm } from './admin-login-form'
import { useAuth } from '@/lib/auth-context'

export function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <AdminLoginForm />
  }

  return <>{children}</>
}

