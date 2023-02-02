import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Transactions } from './pages/Transactions/indes'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/defatult'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      
      <Transactions />
    </ThemeProvider>
  )
}