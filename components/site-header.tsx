import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Cart } from '@/components/cart'
import Image from 'next/image'
import { SearchBar } from '@/components/search-bar'
import { useStore } from '@/lib/store-context'
import { ThemeSwitcher } from '@/components/theme-switcher'

export function SiteHeader() {
  const { categories, storeName, logo } = useStore()

  return (
    <header className="bg-background sticky top-0 z-20">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-4 px-4">
        <div className="mr-7 flex items-center gap-3">
          <Sidebar categories={categories} />
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg" // Asegúrate de tener este archivo en la carpeta public
              alt="Logo"
              width={40}
              height={40}
              className="mr-2"
            />
          </Link>
          <Image
            src={logo || "/placeholder.svg"}
            alt={`${storeName} logo`}
            width={32}
            height={32}
            className="size-8 object-contain"
          />
          <Link
            href="/"
            className="flex items-center gap-2 px-2 text-xl font-bold tracking-tighter"
          >
            {storeName}
          </Link>
        </div>
        <nav className="text-muted-foreground hover:[&_a]:text-foreground hidden items-center gap-6 text-sm font-medium md:flex [&_a]:transition-colors">
          <Link href="/products">Productos</Link>
          {categories.map(category => (
            <Link key={category.id} href={`/category/${category.id}`}>{category.name}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchBar className="hidden sm:flex" />
          <Cart />
          <ThemeSwitcher />
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="border-border size-8 shrink-0 border">
              <AdminIcon className="size-4" />
              <span className="sr-only">Admin</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

function Sidebar({ categories }: { categories: typeof useStore extends () => infer R ? R['categories'] : never }) {
  return (
    <Sheet>
      <Tooltip>
        <SheetTrigger asChild>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="border-border size-8 shrink-0 border md:hidden"
            >
              <Menu className="size-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </TooltipTrigger>
        </SheetTrigger>
        <TooltipContent align="start">Menu</TooltipContent>
        <SheetContent
          side="left"
          className="flex w-full flex-col p-4 pt-12 md:w-3/4"
        >
          <SearchBar className="w-full sm:hidden" />
          {categories.map(category => (
            <Button key={category.id} className="justify-start" variant="ghost">
              <Link href={`/category/${category.id}`}>{category.name}</Link>
            </Button>
          ))}
        </SheetContent>
      </Tooltip>
    </Sheet>
  )
}

function AdminIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

