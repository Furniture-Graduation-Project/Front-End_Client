import { Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}></Routes>
    </AnimatePresence>
  )
}

export default App
