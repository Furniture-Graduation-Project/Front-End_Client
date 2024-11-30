import { useState, useEffect } from 'react'
import ProductCard from '@/components/site/ProductCard'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils/classUtils'
import { useMultipleProductQuery } from '@/hooks/queries/useProductQuery'
import { Check, ChevronsUpDown, Grid3X3, LayoutGrid, Columns2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useTranslate } from '@/hooks/useTranslate'

const ProductGrid = ({ categoryId, materialId }: { categoryId?: string; materialId?: string }) => {
  const { t } = useTranslate('productGrid')

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [productNumber, setProductNumber] = useState(0)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 12 })
  const [searchQuery, setSearchQuery] = useState('')
  // const [showAllProducts, setShowAllProducts] = useState(false)

  const sortBy = [
    { value: 'price', label: 'Giá' },
    { value: 'a-z', label: 'A-Z' },
    { value: 'z-a', label: 'Z-A' },
    { value: 'newest', label: t('newest') },
    { value: 'oldest', label: t('oldest') }
  ]
  const {
    data: products,
    isLoading,
    isError,
    refetch
  } = useMultipleProductQuery(pagination, searchQuery, categoryId, materialId)
  const noProducts = products?.data?.length === 0
  const filteredProducts =
    products?.data
      ?.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (value === 'a-z') {
          return a.name.localeCompare(b.name)
        }
        if (value === 'z-a') {
          return b.name.localeCompare(a.name)
        }
        if (value === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        }
        if (value === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        if (value === 'price') {
          return b.price - a.price
        }
        return 0
      }) || []

  const noSearchResults = filteredProducts.length === 0 && searchQuery.length > 0

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  const visibleProducts = filteredProducts
  useEffect(() => {
    refetch()
  }, [pagination, refetch])

  const handleNextPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))
  }

  const handlePreviousPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: Math.max(prev.pageIndex - 1, 0) }))
  }

  const isLastPage = filteredProducts.length < pagination.pageSize
  useEffect(() => {
    window.scrollTo({ top: 250, behavior: 'smooth' })
  }, [pagination.pageIndex])
  return (
    <div className='md:pl-6 flex-col w-full flex-grow'>
      <div className='flex justify-between h-10'>
        <div className='flex items-center'>
          <Input
            type='text'
            value={searchQuery}
            onChange={handleSearch}
            placeholder={t('searchPlaceholder')}
            className='border dark:border-gray-600 p-2 rounded mb-5 ml-auto dark:bg-gray-700 dark:text-gray-100'
          />
        </div>
        <div className='flex space-x-6'>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant='ghost' role='combobox' aria-expanded={open}>
                {value ? t(`${value}`) : t('sortBy')}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder={t('sortBy')} />
                <CommandList>
                  <CommandEmpty>{t('noSearchResults')}</CommandEmpty>
                  <CommandGroup>
                    {sortBy.map((sort) => (
                      <CommandItem
                        key={sort.value}
                        value={sort.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', value === sort.value ? 'opacity-100' : 'opacity-0')} />
                        {sort.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className='pt-1 hidden md:block'>
            <button
              onClick={() => setProductNumber(4)}
              className='px-1.5 py-1 border rounded-s-sm hover:bg-[#E8ECEF] transform duration-200'
            >
              <Grid3X3 className='w-5 h-5' />
            </button>
            <button
              onClick={() => setProductNumber(3)}
              className='px-1.5 py-1 border border-l-0 hover:bg-[#E8ECEF] transform duration-200'
            >
              <LayoutGrid className='w-5 h-5' />
            </button>
            <button
              onClick={() => setProductNumber(2)}
              className='px-1.5 py-1 border border-l-0 hover:bg-[#E8ECEF] transform duration-200'
            >
              <Columns2 className='w-5 h-5' />
            </button>
            <button
              onClick={() => setProductNumber(1)}
              className='px-1.5 py-1 border rounded-e-sm border-l-0 hover:bg-[#E8ECEF] transform duration-200'
            >
              <Columns2 className='rotate-90 w-5 h-5' />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div>{t('loading')}</div>
      ) : isError ? (
        <div>{t('errorLoadingProducts')}</div>
      ) : noProducts ? (
        <div className='text-center text-lg mt-10'>
          <p>{t('noProductsAvailable')}</p>
        </div>
      ) : noSearchResults ? (
        <div className='text-center text-lg mt-10'>
          <p>{t('noSearchResults')}</p>
        </div>
      ) : (
        <div
          className={cn(
            'grid gap-6 mt-10',
            productNumber && `grid-cols-${productNumber}`,
            !productNumber && 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'
          )}
        >
          {visibleProducts?.map((product) => (
            <ProductCard height='349px' width='262px' product={product} key={product._id} />
          ))}
        </div>
      )}

      <div className='flex justify-center items-center space-x-4 mt-4 pt-12'>
        <button
          onClick={handlePreviousPage}
          className='px-10 border border-black rounded-full py-2 hover:bg-neutral-700 hover:text-white transform duration-200'
          disabled={pagination.pageIndex === 0}
        >
          {t('previous')}
        </button>
        <span className='text-lg font-semibold'>
          {t('page')} {pagination.pageIndex + 1}
        </span>
        <button
          onClick={handleNextPage}
          className='px-10 border border-black rounded-full py-2 hover:bg-neutral-700 hover:text-white transform duration-200'
          disabled={isLastPage}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}

export default ProductGrid
