import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table'
import { useState } from 'react'

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
  const [activeRowId, setActiveRowId] = useState<string>('')

  const table = useMantineReactTable({
    columns,
    data,
    mantineTableBodyRowProps: ({
      row,
    }) => ({
      onClick: () => {
        setActiveRowId(row.id)
        onRowClick(row.original)
      },
      style: {
        cursor: 'pointer',
        backgroundColor:
          row.id === activeRowId
            ? 'var(--mantine-color-blue-light)'
            : 'transparent',
      },
    }),
  })

  return (
    <MantineReactTable table={table} />
  )
}

export default Table
