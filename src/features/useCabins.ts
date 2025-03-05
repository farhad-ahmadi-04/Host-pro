import { getCabins } from "@/services/apiCabins";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook for fetching cabin data.
 *
 * This hook uses the `useQuery` hook with the query key "cabins" and the query function
 * `getCabins` to retrieve cabin data asynchronously. It provides an object containing the
 * fetched cabins data, any error encountered during the request, and a boolean flag indicating
 * whether the data is still loading.
 *
 * @returns An object with the following properties:
 *   - cabins: The fetched cabin data.
 *   - error: An error object if the request fails, otherwise undefined.
 *   - isLoading: A boolean flag indicating whether the data is in the loading state.
 */
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
