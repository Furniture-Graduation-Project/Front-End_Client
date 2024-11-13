import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import routes from '@/routes'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import { Toaster } from '@/components/ui/toaster'
import { IRoute } from './interface/route'
const renderRoutes = (routes: IRoute[]) =>
  routes.map(({ path, component: Component, layout: Layout, children }: IRoute) => (
    <Route
      key={path}
      path={path}
      element={
        Layout ? (
          <Layout>
            <Component />
          </Layout>
        ) : (
          <Component />
        )
      }
    >
      {children && renderRoutes(children)}
    </Route>
  ))
const App = () => {
  const location = useLocation()
  return (
    <>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          {renderRoutes(routes)}
        </Routes>
      </AnimatePresence>
      <Toaster />
      <ScrollToTopButton />
    </>
  )
}

export default App
