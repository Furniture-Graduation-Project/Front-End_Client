import axios from 'axios'
import Cookies from 'js-cookie'

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH // Đảm bảo API endpoint của bạn đúng
})

// Hàm lấy accessToken từ cookie
const getAccessToken = () => {
  return Cookies.get('accessToken')
}

// Hàm lấy refreshToken từ cookie
const getRefreshToken = () => {
  return Cookies.get('refreshToken')
}

// Hàm để lấy accessToken mới bằng refreshToken
const fetchNewAccessToken = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  const { data } = await axiosAuth.post('/refreshToken', { refreshToken })
  const newAccessToken = data.accessToken
  Cookies.set('accessToken', newAccessToken, { expires: 1 / 24 / 60 / 2 }) // Lưu token mới vào cookie
  return newAccessToken
}

// Interceptor cho mỗi request để đính kèm accessToken vào header
axiosAuth.interceptors.request.use(
  async (config) => {
    let accessToken = getAccessToken()
    if (!accessToken) {
      accessToken = await fetchNewAccessToken() // Lấy accessToken mới nếu không có
    }
    config.headers['Authorization'] = `Bearer ${accessToken}` // Gắn token vào header Authorization
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor cho response để xử lý khi gặp lỗi 401 (Unauthorized)
axiosAuth.interceptors.response.use(
  (response) => response, // Nếu response thành công, return như bình thường
  async (error) => {
    const originalRequest = error.config // Lấy request ban đầu để retry sau khi refresh token

    // Kiểm tra nếu lỗi là 401 và request chưa được retry
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // Đánh dấu request đã được retry

      try {
        const newAccessToken = await fetchNewAccessToken() // Lấy accessToken mới
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}` // Cập nhật header Authorization với token mới

        // Retry lại request với accessToken mới
        return axiosAuth(originalRequest)
      } catch (refreshError) {
        // Xóa cookies nếu refresh token không hợp lệ hoặc bị lỗi
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        return Promise.reject(refreshError) // Trả về lỗi nếu không refresh được token
      }
    }

    return Promise.reject(error) // Trả về lỗi nếu không phải lỗi 401 hoặc đã retry
  }
)

export default axiosAuth
