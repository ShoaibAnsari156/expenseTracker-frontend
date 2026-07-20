
import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, } from 'react-router-dom'
import Home from './pages/Home'
import RootLayout from './layout/RootLayout'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import { Provider } from 'react-redux'
import { store } from './store'
import { Toaster } from "@/components/ui/sonner"
import ErrorPage from './pages/ErrorPage'
import TransactionsPage from './pages/TransactionsPage'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/dashboard' element={<RootLayout />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path='/dashboard/transactions' element={<TransactionsPage />} />
        </Route>
      </>
    )
  )

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position='top-right' />
    </Provider>
  )
}

export default App
