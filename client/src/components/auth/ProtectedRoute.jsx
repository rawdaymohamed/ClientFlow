import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/authApi";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    retry: false,
  });
  if (isLoading) {
    return <div>Checking authentication... </div>;
  }
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
