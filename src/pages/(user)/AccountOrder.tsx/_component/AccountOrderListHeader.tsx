import { Input } from '@/components/ui/input'
import { useLanguage } from '@/context/LanguageContext'
import { useDebouncedCallback } from '@/hooks/useDebounceCallBack'
import { getOrderStatus } from '@/utils/getOrderStatus'
import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const AccountOrderListHeader = ({
  queryParams,
  setQueryParams
}: {
  queryParams: any
  setQueryParams: (params: any) => void
}) => {
  const { language } = useLanguage()
  const statusRef = useRef<(HTMLDivElement | null)[]>([])
  const [statusOrder, setStatus] = useState<string>('all')
  const debouncedSearch = useDebouncedCallback((key: string, value: string) => {
    setQueryParams((prev: any) => ({
      ...prev,
      [key]: value
    }))
  }, 700)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const name = event.target.name
    if (name === 'code' && ((value.length >= 16 && value.length <= 20) || value.length === 0)) {
      debouncedSearch(name, value)
    }
  }

  const handleSelectChange = (key: string) => (value: string) => {
    if (key == 'status') {
      setStatus(value)
    }
    debouncedSearch(key, value)
  }
  const orderStatus = [
    'all',
    'unpaid',
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'received',
    'cancelled',
    'return'
  ]
  useEffect(() => {
    const targetStatusIndex = orderStatus.findIndex((status) => status === statusOrder)
    if (targetStatusIndex !== -1 && statusRef.current[targetStatusIndex]) {
      setTimeout(() => {
        statusRef.current[targetStatusIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
      }, 100)
    }
  }, [statusOrder])
  return (
    <>
      <div className='w-full overflow-x-scroll whitespace-nowrap no-scrollbar mb-2'>
        {orderStatus.map((status) => (
          <div
            key={status}
            ref={(el) => (statusRef.current[orderStatus.indexOf(status)] = el)}
            onClick={() => handleSelectChange('status')(status)}
            className={`inline-block px-4 py-2 cursor-pointer hover:bg-gray-200 border-b-2 ${statusOrder == status ? 'border-red' : 'border-neutral-3'}`}
          >
            <h3 className={statusOrder == status ? 'text-red' : ''}>{getOrderStatus(status, language)}</h3>
          </div>
        ))}
      </div>

      <div className='relative grid grid-cols-1 sm:grid-cols-2 w-full'>
        <Search className='absolute top-1/2 left-3 -translate-y-1/2' />
        <Input
          onChange={handleChange}
          name='code'
          placeholder='Tìm kiếm theo mã đơn 16 - 20 ký tự...'
          minLength={16}
          maxLength={20}
          className='pl-12 '
        />
      </div>
    </>
  )
}

export default AccountOrderListHeader
