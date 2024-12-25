
import './App.css'
import Cadastro from './pages/cadastro/Cadastro';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
  path: "/",
  element: <Login/>
  }, 
  {
  path: "/register",
  element: <Cadastro/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
