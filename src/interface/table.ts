import { ColumnDef, Table } from '@tanstack/react-table'

export interface ITable<T> {
  table: Table<T>
}

export interface ITableCustom {
  table: Table<any>
  columns: ColumnDef<any>[]
  isLoading: boolean
  isError: boolean
  refetch: () => void
}
