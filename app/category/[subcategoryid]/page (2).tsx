import { CategoryProducts } from '@/components/category-products'
import { Banner } from '@/components/banner'

export default function SubcategoryPage({ params }: { params: { categoryId: string, subcategoryId: string } }) {
  return (
    <div>
      <Banner />
      <CategoryProducts categoryId={params.categoryId} subcategoryId={params.subcategoryId} />
    </div>
  )
}

