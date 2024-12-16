import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { ProductService } from '@/services/product'
import { useQuery } from '@tanstack/react-query'

export const useProductListQuery = (categoryId?: string, isNewProduct?: boolean) => {
  const { data, ...rest } = useQuery({
    queryKey: ['PRODUCTS', categoryId, isNewProduct],
    queryFn: async () => {
      if (isNewProduct) {
        const response = await ProductService.getProductNew(categoryId)
        return response.data
      }
      const response = await ProductService.getAll(categoryId)
      return response.data
    }
  })
  return { data, ...rest }
}

export const useSingleProductQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['PRODUCT', id],
    queryFn: async () => {
      const response = await ProductService.getById(id)
      return response.data
    },
    enabled: !!id
  })

  return { data, ...rest }
}

export const useMultipleProductQuery = (
  pagination?: { pageIndex?: number; pageSize?: number },
  searchTerm: string = '',
  categoryId?: string,
  materialId?: string
) => {
  const { pageIndex = DEFAULT_PAGE_SIZE.pageIndex, pageSize = DEFAULT_PAGE_SIZE.pageSize } = pagination || {}

  const { data: response, ...rest } = useQuery({
    queryKey: ['PRODUCT', pageIndex, pageSize, searchTerm, categoryId, materialId],
    queryFn: async () => {
      const response = await ProductService.getLimited({
        pageIndex,
        pageSize,
        categoryId,
        materialId,
        searchName: searchTerm
      })
      return response
    }
  })

  return { data: response?.data, ...rest }
}

export const useProductWithPriceQuery = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['PRODUCT_PRICE', id],
    queryFn: async () => {
      const response = await ProductService.getProductWithPrice(id)
      return response.data
    }
  })

  return { data, ...rest }
}
