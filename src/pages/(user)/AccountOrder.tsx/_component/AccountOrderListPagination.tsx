import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const AccountOrderListPagination = ({ table, setPagination }: any) => {
  return (
    <CardFooter className='flex flex-wrap items-center justify-center py-4 border-t'>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Trang {table.getState().pagination.pageIndex + 1} trên {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => setPagination({ pageIndex: 0 })}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => setPagination({ pageIndex: table.getState().pagination.pageIndex - 1 })}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => setPagination({ pageIndex: table.getState().pagination.pageIndex + 1 })}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => setPagination({ pageIndex: table.getPageCount() - 1 })}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </CardFooter>
  )
}

export default AccountOrderListPagination
