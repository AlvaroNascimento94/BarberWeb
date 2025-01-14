import "./App.css";
import Cadastro from "./pages/cadastro/Cadastro";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utils/routes";
import Profile from "./pages/profile/Profile";
import HairCuts from './pages/haircuts/HairCut';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Cadastro />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path:"/haircuts",
    element: (
      <ProtectedRoute>
        <HairCuts/>
      </ProtectedRoute>
    ),
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
