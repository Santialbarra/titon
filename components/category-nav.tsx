import Link from 'next/link'
import { useStore } from '@/lib/store-context'

export function CategoryNav() {
  const { categories } = useStore()

  return (
    <nav className="bg-primary text-primary-foreground py-2 overflow-x-auto">
      <ul className="flex space-x-4 px-4">
        <li>
          <Link href="/products" className="hover:underline">
            Todos los productos
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`} className="hover:underline">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

