import Plot from 'react-plotly.js'

type Props = {
  data: Plotly.Data[]
  layout: Partial<Plotly.Layout>
}

const Violin = ({
  data,
  layout,
}: Props) => {
  return (
    <Plot data={data} layout={layout} style={{ width: '100%', height: '600px' }} />
  )
}

export default Violin
