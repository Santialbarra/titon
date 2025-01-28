import { CategoryProducts } from '@/components/category-products'
import { Banner } from '@/components/banner'

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  return (
    <div>
      <Banner />
      <CategoryProducts categoryId={params.categoryId} />
    </div>
  )
}

