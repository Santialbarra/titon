import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/lib/auth-context'
import { CartProvider } from '@/lib/cart-context'
import { StoreProvider } from '@/lib/store-context'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tienda Online',
  description: 'Una tienda online con venta directa por WhatsApp.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn('flex min-h-svh flex-col antialiased', inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>
              <StoreProvider>
                <TooltipProvider delayDuration={0}>
                  <SiteHeader />
                  <main className="flex-1">
                    <CartProvider>
                      {children}
                    </CartProvider>
                  </main>
                </TooltipProvider>
              </StoreProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

