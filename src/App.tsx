import "./App.css";
import Cadastro from "./pages/cadastro/Cadastro";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utils/routes";
import Profile from "./pages/profile/Profile";
import HairCuts from "./pages/haircuts/HairCut";
import NewHairCut from "./pages/haircuts/new/NewHairCut";
import EditHairCut from "./pages/haircuts/EditHairCut";
import RegisterClient from "./pages/dashboard/new/RegisterClient";

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
    path: "/haircuts",
    element: (
      <ProtectedRoute>
        <HairCuts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/haircuts/new",
    element: (
      <ProtectedRoute>
        <NewHairCut />
      </ProtectedRoute>
    ),
  },
  {
    path: "/haircuts/:id",
    element: (
      <ProtectedRoute>
        <EditHairCut />
      </ProtectedRoute>
    ),
  },{
    path: "/new",
    element: (
      <ProtectedRoute>
        <RegisterClient />
      </ProtectedRoute>
    ),
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
