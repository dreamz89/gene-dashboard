import Papa from 'papaparse'
import axios from 'axios'

import { type TableRow } from '@/App'

export const fetchCsv = async () => {
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

export const fetchGeneInfo = async (
  ensemblId: string,
) => {
  const response = await axios.get(
    `https://gtexportal.org/api/v2/reference/gene?geneId=${ensemblId}`,
  )

  return response.data
}

export const fetchGeneExpression =
  async (gencodeId: string) => {
    const response = await axios.get(
      `https://gtexportal.org/api/v2/expression/geneExpression?gencodeId=${gencodeId}`,
    )

    return response.data
  }
