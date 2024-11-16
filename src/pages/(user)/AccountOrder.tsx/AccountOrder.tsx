import DataTableCustom from '@/components/site/DataTable/DataTableCustom'
import { useMultipleOrderQuery } from '@/hooks/queries/useOrderQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { columns } from './_component/columns'
import { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'

const AccountOrder = () => {
  const { data, isLoading, isError, refetch } = useMultipleOrderQuery()
  console.log(data)

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columns,
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })
  return (
    <div>
      <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
    </div>
  )
}

export default AccountOrder
