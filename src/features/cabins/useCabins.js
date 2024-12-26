import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
    const {
        isError,
        data: cabins,
        isLoading,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    return {
        isError,
        cabins,
        isLoading,
    }
}