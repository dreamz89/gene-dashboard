import { useQuery } from '@tanstack/react-query'

import {
  fetchGeneInfo,
  fetchGeneExpression,
} from '@/api/gene'

type Props = {
  ensemblId: string
}

const Details = ({
  ensemblId,
}: Props) => {
  const geneInfoQuery = useQuery({
    queryKey: ['geneInfo', ensemblId],
    queryFn: () =>
      fetchGeneInfo(ensemblId),
    enabled: !!ensemblId,
  })
  console.log(
    'geneInfoQuery',
    geneInfoQuery.data?.data[0],
  )
  const expressionQuery = useQuery({
    queryKey: [
      'expression',
      geneInfoQuery.data?.data[0]
        .gencodeId,
    ],
    queryFn: () =>
      fetchGeneExpression(
        geneInfoQuery.data?.data[0]
          .gencodeId,
      ),
    enabled: !!geneInfoQuery.data,
  })
  console.log('expressionQuery', expressionQuery.data?.data)
  return <div>xxx</div>
}

export default Details
