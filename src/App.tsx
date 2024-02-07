import { BrowserRouter } from 'react-router-dom'
import { Styles } from './styles'
import { Routing } from './routes/Routing'
import { Contexts } from './contexts'
import { Providers } from './providers'
import { Layout } from './components/Layout/Layout'

export function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Contexts>
          <Layout>
            <Routing />

            <Styles />
          </Layout>
        </Contexts>
      </Providers>
    </BrowserRouter>
  )
}
