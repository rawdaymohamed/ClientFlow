import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicOnlyRoute from "../components/auth/PublicOnlyRoute";
import HomeRedirect from "../components/auth/HomeRedirect";
import Contacts from "../pages/Contacts";
import AddContact from "../pages/AddContact";
import EditContact from "../pages/EditContact";
import NotFound from "../pages/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRedirect />,
  },
  {
    path: "/login",
    element: (
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicOnlyRoute>
        <Register />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/contacts",
    element: (
      <ProtectedRoute>
        <Contacts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contacts/new",
    element: (
      <ProtectedRoute>
        <AddContact />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contacts/:id/edit",
    element: (
      <ProtectedRoute>
        <EditContact />
      </ProtectedRoute>
    ),
  },

  // 👇 ADD THIS
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
