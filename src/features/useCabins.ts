import { getCabins } from "@/services/apiCabins";
import { useQuery } from "@tanstack/react-query";

const useCabins = () => {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { cabins, error, isLoading };
};

export default useCabins;
