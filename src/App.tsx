import {
  useMemo,
  useState,
} from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchCsv } from '@/api/gene'
import Table from '@/components/Table'
import Details from '@/components/Details'

export type TableRow = {
  Biotype: string
  Chromosome: string
  Ensembl: string
  'Gene symbol': string
  Name: string
  'Seq region end': string
  'Seq region start': string
}

function App() {
  const [ensemblId, setEnsemblId] =
    useState<string>('')

  const csvQuery = useQuery<TableRow[]>(
    {
      queryKey: ['genes'],
      queryFn: fetchCsv,
      staleTime: Infinity,
    },
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'Ensembl',
        header: 'Ensembl',
      },
      {
        accessorKey: 'Gene symbol',
        header: 'Gene Symbol',
      },
      {
        accessorKey: 'Name',
        header: 'Name',
      },
      {
        accessorKey: 'Biotype',
        header: 'Biotype',
      },
      {
        accessorKey: 'Chromosome',
        header: 'Chromosome',
      },
    ],
    [],
  )

  const onRowClick = ({
    Ensembl,
  }: TableRow) => {
    setEnsemblId(Ensembl)
  }

  return csvQuery.isError ? (
    <p>Error loading csv file</p>
  ) : (
    <div className="p-4 flex flex-col gap-8 lg:flex-row">
      <div className="lg:w-1/2">
        <Table
          columns={columns}
          data={csvQuery.data ?? []}
          onRowClick={onRowClick}
        />
      </div>
      <div className="lg:w-1/2">
        {ensemblId && (
          <Details
            ensemblId={ensemblId}
          />
        )}
      </div>
    </div>
  )
}

export default App
