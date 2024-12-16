import DataTableCustom from '@/components/site/DataTable/DataTableCustom'
import { useMultipleOrderQuery } from '@/hooks/queries/useOrderQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'
import { columns } from './columns'
import AccountOrderListPagination from './AccountOrderListPagination'
import { useTranslate } from '@/hooks/useTranslate'
import AccountOrderListHeader from './AccountOrderListHeader'

const AccountOrderList = () => {
  const { t } = useTranslate('account.order')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [queryParams, setQueryParams] = useState({
    status: 'all'
  })
  const { data, isLoading, isError, refetch } = useMultipleOrderQuery(pagination, queryParams)

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columns,
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })
  return (
    <>
      <h3 className=' text-xl font-semibold'>{t('title')}</h3>
      <div className='mt-2'>
        <AccountOrderListHeader queryParams={queryParams} setQueryParams={setQueryParams} />
        <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
        <AccountOrderListPagination setPagination={setPagination} table={table} />
      </div>
    </>
  )
}

export default AccountOrderList
