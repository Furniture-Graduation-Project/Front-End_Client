import { useProductItemQueryById } from '@/hooks/queries/useProductItemQuery'
import { IProductItem } from '@/interface/productItem'
import { useEffect, useState } from 'react'

const AdditionalInfo = ({ productId }: { productId: IProductItem }) => {
  const { data, isLoading, isError, error } = useProductItemQueryById(productId)
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    if (data?.data) {
      setDescription(data.data.productId.description || 'No description available')
    }
  }, [data])

  if (isLoading) return <p>Loading...</p>
  if (isError)
    return <p>Error loading product description: {error instanceof Error ? error.message : 'Unknown error'}</p>

  return (
    <>
      <h2 className='text-2xl font-semibold mb-4'>Additional Information</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='border-b pb-2'>
          <h3 className='font-medium'>Description</h3>
          <p className='text-muted-foreground'>{description}</p>
        </div>
      </div>
    </>
  )
}

export default AdditionalInfo
