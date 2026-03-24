
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import RootLayout from './layout/RootLayout'
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
