'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { categoryListSchema } from '@/lib/schema'
import { z } from 'zod'

type Category = z.infer<typeof categoryListSchema>[number]

interface CategoryManagerProps {
  categories: Category[]
  onChange: (categories: Category[]) => void
}

export function CategoryManager({ categories, onChange }: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState('')
  const [newSubcategory, setNewSubcategory] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleAddCategory = () => {
    if (newCategory) {
      onChange([...categories, { id: Date.now().toString(), name: newCategory, subcategories: [] }])
      setNewCategory('')
    }
  }

  const handleAddSubcategory = () => {
    if (selectedCategory && newSubcategory) {
      onChange(categories.map(cat => 
        cat.id === selectedCategory 
          ? { ...cat, subcategories: [...cat.subcategories, { id: Date.now().toString(), name: newSubcategory }] }
          : cat
      ))
      setNewSubcategory('')
    }
  }

  const handleUpdateCategory = (id: string, newName: string) => {
    onChange(categories.map(cat => 
      cat.id === id ? { ...cat, name: newName } : cat
    ))
  }

  const handleUpdateSubcategory = (categoryId: string, subcategoryId: string, newName: string) => {
    onChange(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, subcategories: cat.subcategories.map(sub => 
            sub.id === subcategoryId ? { ...sub, name: newName } : sub
          )}
        : cat
    ))
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="newCategory">Nueva Categoría Principal</Label>
        <div className="flex items-center gap-2">
          <Input
            id="newCategory"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nombre de la categoría"
          />
          <Button onClick={handleAddCategory}>Agregar</Button>
        </div>
      </div>

      {categories.map(category => (
        <div key={category.id} className="border p-4 rounded-md">
          <Input
            value={category.name}
            onChange={(e) => handleUpdateCategory(category.id, e.target.value)}
            className="font-bold mb-2"
          />
          <div className="ml-4 space-y-2">
            {category.subcategories.map(subcategory => (
              <Input
                key={subcategory.id}
                value={subcategory.name}
                onChange={(e) => handleUpdateSubcategory(category.id, subcategory.id, e.target.value)}
              />
            ))}
            <div className="flex items-center gap-2">
              <Input
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                placeholder="Nueva subcategoría"
              />
              <Button onClick={() => {
                setSelectedCategory(category.id)
                handleAddSubcategory()
              }}>Agregar</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

