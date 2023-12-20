import { BrowserRouter } from 'react-router-dom'
import { Styles } from './styles'
import { Routing } from './routes/Routing'
import { Contexts } from './contexts'
import { Providers } from './providers/Providers'

export function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Contexts>
          <Routing />

          <Styles />
        </Contexts>
      </Providers>
    </BrowserRouter>
  )
}
