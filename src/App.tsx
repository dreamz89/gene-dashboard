import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Papa from 'papaparse'
import axios from 'axios'

import Table from '@/components/Table'

export type TableRow = {
  Biotype: string
  Chromosome: string
  Ensembl: string
  'Gene symbol': string
  Name: string
  'Seq region end': string
  'Seq region start': string
}

async function fetchCsv(): Promise<
  TableRow[]
> {
  const response = await axios.get(
    '/data/genes_human.csv',
    {
      responseType: 'text',
    },
  )
  const parsed = Papa.parse<TableRow>(
    response.data,
    {
      header: true,
      skipEmptyLines: true,
    },
  )

  return parsed.data
}

function App() {
  const { data = [], isError } =
    useQuery<TableRow[]>({
      queryKey: ['genes'],
      queryFn: fetchCsv,
      staleTime: Infinity,
    })

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

  return isError ? (
    <p>Error loading csv file</p>
  ) : (
    <div className="p-4">
      <div className="lg:w-1/2">
        <Table
          columns={columns}
          data={data ?? []}
        />
      </div>
    </div>
  )
}

export default App
