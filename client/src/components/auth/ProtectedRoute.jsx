import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/authApi";
import LoadingScreen from "../ui/LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    retry: false,
  });

  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (isError || !data?.data) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
