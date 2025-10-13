import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table'

type TableProps<T extends object> = {
  columns: MRT_ColumnDef<T>[]
  data: T[]
}

const Table = <T extends object>({
  columns,
  data,
}: TableProps<T>) => {
  const table = useMantineReactTable({
    columns,
    data,
  })

  return (
    <MantineReactTable table={table} />
  )
}

export default Table
