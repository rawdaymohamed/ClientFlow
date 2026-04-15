import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../api/authApi";

const useCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    retry: false,
  });
};

export default useCurrentUser;
