import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { BlogService } from '@/services/blog'
import { IBlog } from '@/interface/blog'

export const useBlogQuery = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading, error } = useQuery<{ data: IBlog[] }>({
    queryKey: ['blogs', page, limit],
    queryFn: () => BlogService.getAll(page, limit)
  })

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
  }

  return {
    blogs: data?.data,
    isLoading,
    error,
    page,
    limit,
    handlePageChange,
    handleLimitChange
  }
}
export const useBlogDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => BlogService.getById(id),
    enabled: !!id
  })
}
