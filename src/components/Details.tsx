import { useQuery } from '@tanstack/react-query'

import {
  fetchGeneInfo,
  fetchGeneExpression,
} from '@/api/gene'
import Violin from '@/components/Violin'

type Tissue = {
  data: Number[]
  datasetId: string
  gencodeId: string
  geneSymbol: string
  ontologyId: string
  subsetGroup: null
  tissueSiteDetailId: string
  unit: string
}

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

  const expressionData =
    expressionQuery.data?.data.map(
      (tissue: Tissue) => ({
        type: 'violin',
        y: tissue.data,
        name: tissue.tissueSiteDetailId,
        box: { visible: true },
        meanline: { visible: true },
      }),
    )

  const layout = {
    title: {
      text: 'Gene Expression (TPM)',
    },
    yaxis: { title: { text: 'TPM' } },
    xaxis: {
      title: { text: 'Tissues' },
      
    },
    violingap: 0,
    violinmode: 'group',
    showlegend: false,
    margin: {
      l: 50,
      r: 30,
      t: 50,
      b: 150,
      pad: 0,
    },
  }

  return (
    <div>
      {expressionQuery.isPending ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h5>
            {
              geneInfoQuery.data
                ?.data[0].gencodeId
            }
          </h5>
          <Violin
            data={expressionData}
            layout={layout}
          />
        </div>
      )}
    </div>
  )
}

export default Details
