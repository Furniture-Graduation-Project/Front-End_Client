const AdditionalInfo = () => {
  const additionalInfo = [
    { id: 1, title: 'Product Dimensions', content: '10 x 5 x 2 inches' },
    { id: 2, title: 'Item Weight', content: '1.5 pounds' },
    { id: 3, title: 'Manufacturer', content: 'TechGadgets Inc.' },
    { id: 4, title: 'ASIN', content: 'B01ABCDEFG' },
    { id: 5, title: 'Item model number', content: 'TG2023' }
  ]
  return (
    <>
      <h2 className='text-2xl font-semibold mb-4'>Additional Information</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {additionalInfo.map((item) => (
          <div key={item.id} className='border-b pb-2'>
            <h3 className='font-medium'>{item.title}</h3>
            <p className='text-muted-foreground'>{item.content}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdditionalInfo
