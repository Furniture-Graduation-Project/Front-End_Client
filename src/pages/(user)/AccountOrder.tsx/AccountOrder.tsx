import DataTableCustom from '@/components/site/DataTable/DataTableCustom'
import { useMultipleOrderQuery } from '@/hooks/queries/useOrderQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { columns } from './_component/columns'
import { PaginationState } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

const AccountOrder = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const { data, isLoading, isError, refetch } = useMultipleOrderQuery(pagination)

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columns,
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })

  useEffect(() => {
    setPagination(pagination)
  }, [pagination])

  return (
    <div>
      <DataTableCustom 
        columns={columns} 
        isError={isError} 
        isLoading={isLoading} 
        refetch={refetch} 
        table={table} 
      />
    </div>
  )
}

export default AccountOrder
