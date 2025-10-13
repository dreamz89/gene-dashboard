import { useQuery } from '@tanstack/react-query'
import Papa from 'papaparse'
import axios from 'axios'
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
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
