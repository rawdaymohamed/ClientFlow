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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-sm">Checking authentication...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
