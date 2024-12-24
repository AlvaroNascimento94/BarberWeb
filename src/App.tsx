
import './App.css'
import Cadastro from './pages/cadastro/Cadastro';
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
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
