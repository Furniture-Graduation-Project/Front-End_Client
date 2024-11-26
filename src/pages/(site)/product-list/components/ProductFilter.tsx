import { Columns2, SlidersHorizontal } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { useMultipleCategoryQuery } from '@/hooks/queries/useCategoryQuery'
import { useState } from 'react'
import { useMultipleMaterialQuery } from '@/hooks/queries/useMaterialQuery'
import { useTranslate } from '@/hooks/useTranslate'
import ComboboxDropdownMenu from './ProductFilterMobile'

const ProductFilter = () => {
  const { t } = useTranslate('productFilter')

  const {
    data: categoriesResponse,
    isLoading: isLoadingCategories,
    error: categoriesError
  } = useMultipleCategoryQuery()

  const { data: materialsResponse, isLoading: isLoadingMaterials, error: materialsError } = useMultipleMaterialQuery()

  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllMaterials, setShowAllMaterials] = useState(false)

  if (isLoadingCategories || isLoadingMaterials) {
    return <p>{t('loading')}</p>
  }

  if (categoriesError || materialsError) {
    return <p>{t('error')}</p>
  }

  const categories = categoriesResponse?.data || []
  const materials = materialsResponse?.data || []

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 5)
  const visibleMaterials = showAllMaterials ? materials : materials.slice(0, 5)

  return (
    <div className='flex flex-col w-full md:w-[262px] my-2 md:my-0'>
      <div className='sticky top-32'>
        {/* Header */}
        <div className='flex justify-between items-center md:mb-8'>
          <div className='flex items-center'>
            <SlidersHorizontal className='w-6 h-6 mr-2' />
            <p className='font-semibold text-xl'>{t('filter')}</p>
            <div className='md:hidden flex items-center'>
              <ComboboxDropdownMenu />
            </div>
          </div>
          <div className='md:hidden block'>
            <button className='px-[11px] py-2 border hover:bg-[#E8ECEF] transform duration-200'>
              <Columns2 className='w-5 h-5' />
            </button>
            <button className='px-[11px] py-2 border rounded-e-sm border-l-0 hover:bg-[#E8ECEF] transform duration-200'>
              <Columns2 className='rotate-90 w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className='md:flex flex-col space-y-3 mb-8 hidden'>
          <p className='font-semibold uppercase'>{t('categories')}</p>
          <ul className={`flex flex-col space-y-2 ${!showAllCategories ? 'h-36 overflow-y-auto' : ''}`}>
            {visibleCategories.map((category) => (
              <NavLink
                to={`/products?category=${category._id}`}
                key={category._id}
                className='text-sm font-semibold text-[#807E7E] hover:text-black hover:underline transform duration-200'
              >
                {category.categoryName}
              </NavLink>
            ))}
          </ul>
          {categories.length > 5 && (
            <button
              onClick={() => setShowAllCategories((prev) => !prev)}
              className='mt-2 text-sm font-semibold text-blue-600 hover:underline'
            >
              {showAllCategories ? t('showLess') : t('showMore')}
            </button>
          )}
        </div>

        {/* Materials */}
        <div className='md:flex hidden flex-col space-y-4'>
          <p className='text-base font-semibold uppercase'>{t('materials')}</p>
          <ul className={`flex flex-col space-y-2 ${!showAllMaterials ? 'h-36 overflow-y-auto' : ''}`}>
            {visibleMaterials.map((material) => (
              <NavLink
                to={`/products?material=${material._id}`}
                key={material._id}
                className='text-sm font-semibold text-[#807E7E] hover:text-black hover:underline transform duration-200'
              >
                {material.materialName || t('noMaterialName')}
              </NavLink>
            ))}
          </ul>
          {materials.length > 5 && (
            <button
              onClick={() => setShowAllMaterials((prev) => !prev)}
              className='mt-2 text-sm font-semibold text-blue-600 hover:underline'
            >
              {showAllMaterials ? t('showLess') : t('showMore')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
