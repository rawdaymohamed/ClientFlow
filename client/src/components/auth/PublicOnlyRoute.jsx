import { Navigate } from "react-router-dom";
import LoadingScreen from "../ui/LoadingScreen";
import useCurrentUser from "../../features/auth/hooks/useCurrentUser";

const PublicOnlyRoute = ({ children }) => {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (!isError && data?.data) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
