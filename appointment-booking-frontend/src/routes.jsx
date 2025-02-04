import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterChoice from "./pages/RegisterChoice";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const OwnerRoute = ({ children }) => {
  const { isOwner } = useAuth();
  return isOwner ? children : <Navigate to="/" />;
};

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterChoice />,
  },
  {
    path: "/register/:type",
    element: <Register />,
  },
  {
    path: "/appointments",
    element: (
      <PrivateRoute>
        <Appointments />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <OwnerRoute>
        <Dashboard />
      </OwnerRoute>
    ),
  },
];

export default routes;
