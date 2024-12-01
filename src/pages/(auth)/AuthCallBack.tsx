import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (token) {
      try {
        localStorage.setItem('accessToken', JSON.stringify(token))
        navigate('/')
      } catch (error) {
        console.error('Error saving token:', error)
        navigate('/signin')
      }
    } else {
      navigate('/')
      window.location.reload()
    }
  }, [navigate])

  return <div>Processing...</div>
}
