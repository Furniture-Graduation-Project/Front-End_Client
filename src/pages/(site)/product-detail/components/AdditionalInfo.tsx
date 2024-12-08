const AdditionalInfo = ({ data }: any) => {
  return (
    <>
      <h2 className='text-2xl font-semibold mb-4'>Additional Information</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='border-b pb-2'>
          {data?.data.materialDetail && (
            <div>
              <h3 className='font-medium'>Chi tiết chất liệu </h3> : {data?.data.materialDetail}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AdditionalInfo
