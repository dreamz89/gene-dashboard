import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  MantineProvider,
  createTheme,
} from '@mantine/core'
import '@mantine/core/styles.css'
import 'mantine-react-table/styles.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient()

const theme = createTheme({
  /** Put your mantine theme override here */
})

createRoot(
  document.getElementById('root')!,
).render(
  <StrictMode>
    <QueryClientProvider
      client={queryClient}
    >
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
