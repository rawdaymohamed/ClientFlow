import { Navigate } from "react-router-dom";
import useCurrentUser from "../../features/auth/hooks/useCurrentUser";
import LoadingScreen from "../ui/LoadingScreen";
const HomeRedirect = () => {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (!isError && data?.data) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default HomeRedirect;
