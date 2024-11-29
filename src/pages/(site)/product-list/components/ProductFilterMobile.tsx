import { MoreHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useMultipleCategoryQuery } from '@/hooks/queries/useCategoryQuery'
import { useMultipleMaterialQuery } from '@/hooks/queries/useMaterialQuery'
import { useTranslate } from '@/hooks/useTranslate'

const ComboboxDropdownMenu = () => {
  const { t } = useTranslate('comboboxDropdownMenu')
  const [category, setCategory] = useState<string>('')
  const [material, setMaterial] = useState<string>('')

  const {
    data: categoriesResponse,
    isLoading: isLoadingCategories,
    error: categoriesError
  } = useMultipleCategoryQuery()
  const { data: materialsResponse, isLoading: isLoadingMaterials, error: materialsError } = useMultipleMaterialQuery()

  const [open, setOpen] = useState(false)

  const reset = () => {
    setCategory('')
    setMaterial('')
  }

  if (isLoadingCategories || isLoadingMaterials) {
    return <p>{t('loading')}</p>
  }

  if (categoriesError || materialsError) {
    return <p>{t('error')}</p>
  }

  const categories = categoriesResponse?.data || []
  const materials = materialsResponse?.data || []

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm'>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[200px]'>
        <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t('categories')}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className='p-0'>
              <Command>
                <CommandInput placeholder={t('filterLabel')} autoFocus={true} />
                <CommandList>
                  <CommandEmpty>{t('noCategoryFound')}</CommandEmpty>
                  <CommandGroup>
                    {categories.map((categoryItem) => (
                      <CommandItem
                        key={categoryItem._id}
                        value={categoryItem.categoryName}
                        onSelect={(value) => {
                          setCategory(value)
                          setOpen(false)
                        }}
                      >
                        {categoryItem.categoryName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t('materials')}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className='p-0'>
              <Command>
                <CommandInput placeholder={t('filterLabel')} autoFocus={true} />
                <CommandList>
                  <CommandEmpty>{t('noMaterialFound')}</CommandEmpty>
                  <CommandGroup>
                    {materials.map((materialItem) => (
                      <CommandItem
                        key={materialItem._id}
                        value={materialItem.materialName}
                        onSelect={(value) => {
                          setMaterial(value)
                          setOpen(false)
                        }}
                      >
                        {materialItem.materialName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={reset}>
            <X className='w-4 h-4 mr-2 text-rose-500' />
            {t('clearAll')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>

      {category && (
        <Badge className='relative mr-2'>
          <button
            onClick={() => setCategory('')}
            className='absolute w-4 h-4 rounded-full bg-white -top-2 -right-2 border text-black flex items-center justify-center'
          >
            <X className='w-2 h-2' />
          </button>
          {category}
        </Badge>
      )}
      {material && (
        <Badge className='relative'>
          <button
            onClick={() => setMaterial('')}
            className='absolute w-4 h-4 rounded-full bg-white -top-2 -right-2 border text-black flex items-center justify-center'
          >
            <X className='w-2 h-2' />
          </button>
          {material}
        </Badge>
      )}
    </DropdownMenu>
  )
}

export default ComboboxDropdownMenu
