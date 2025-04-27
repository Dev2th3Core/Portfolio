import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Page404 from './pages/Page404';
import routes from './routes';

function App() {

  const router = createBrowserRouter([
    {
      element: <Layout/>,
      errorElement: <Page404/>,
      children: routes
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
