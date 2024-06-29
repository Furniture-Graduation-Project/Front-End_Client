import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import routes from './routes'
const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, component: Component, layout: Layout }) => (
          <Route
            key={path}
            path={path}
            element={
              <Layout>
                <Component />
              </Layout>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  )
}

export default App
