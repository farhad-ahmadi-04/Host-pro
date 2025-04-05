import { getCurrentUser } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    currentUser,
    isLoading,
    isAuthenticated: currentUser?.role === "authenticated",
  };
};
export default useUser;
