import { axiosInstance } from '@/config/axios'
import { BlogResponse } from '@/interface/blog'

export const BlogService = {
  getAll: async (page: number = 1, limit: number = 10): Promise<BlogResponse> => {
    try {
      const response = await axiosInstance.get(`/blog?page=${page}&limit=${limit}`)

      return response.data
    } catch (error) {
      console.error('Error fetching blogs:', error)
      throw error
    }
  },

  getBlogNew: async (): Promise<BlogResponse> => {
    try {
      const response = await axiosInstance.get('/blog/new') // Đường dẫn `/blog/new` sẽ gọi đến API lấy bài viết mới nhất
      return response.data
    } catch (error) {
      console.error('Error fetching new blogs:', error)
      throw error
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/blog/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching blog by id:', error)
      throw error
    }
  },
  getRelatedPosts: async (id: string, limit: number = 3) => {
    const response = await axiosInstance.get(`/blogs/${id}/related?limit=${limit}`)
    return response.data
  }
}
