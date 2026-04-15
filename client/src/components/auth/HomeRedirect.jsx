import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/authApi";
import LoadingScreen from "../ui/LoadingScreen";

const HomeRedirect = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    retry: false,
  });

  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (!isError && data?.data) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default HomeRedirect;
