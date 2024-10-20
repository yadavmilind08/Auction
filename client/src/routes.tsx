import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signedup from "./pages/Signedup";
import { useAuth } from "./hooks/useAuth";
import Landing from "./pages/Landing";
import BidDetail from "./pages/BidDetail";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  // Fallback to checking localStorage directly
  const token = localStorage.getItem("token");
  const isUserAuthenticated = isAuthenticated || !!token;

  return isUserAuthenticated ? children : <Navigate to="/auth/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/bid/detail/:id"
            element={
              <PrivateRoute>
                <BidDetail />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Auth Layout Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signedup" element={<Signedup />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
