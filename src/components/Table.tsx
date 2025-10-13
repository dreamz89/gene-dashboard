import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table'

type Props<T extends object> = {
  columns: MRT_ColumnDef<T>[]
  data: T[]
  onRowClick: (tableRow: T) => void
}

const Table = <T extends object>({
  columns,
  data,
  onRowClick,
}: Props<T>) => {
  const table = useMantineReactTable({
    columns,
    data,
    mantineTableBodyRowProps: ({
      row,
    }) => ({
      onClick: () =>
        onRowClick(row.original),
      style: {
        cursor: 'pointer',
      },
    }),
  })

  return (
    <MantineReactTable table={table} />
  )
}

export default Table
