import DataTableCustom from '@/components/site/DataTable/DataTableCustom'
import { useMultipleOrderQuery } from '@/hooks/queries/useOrderQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import {  useState } from 'react'
import { columns } from './columns'
import AccountOrderListPagination from './AccountOrderListPagination'

const AccountOrderList = () => {
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
  return (
    <div>
      <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
      <AccountOrderListPagination setPagination={setPagination} table={table} />
    </div>
  )
}

export default AccountOrderList
