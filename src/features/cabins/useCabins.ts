import { PAGE_SIZE } from "@/lib/utils";
import { getCabins } from "@/services/apiCabins";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // page
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: cabins, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins", page],
    queryFn: () => getCabins({ page }),
  });

  // pre-fetching
  const pageCount = Math.ceil((count ?? 0) / PAGE_SIZE);

  if (pageCount > page)
    queryClient.prefetchQuery({
      queryKey: ["cabins", page + 1],
      queryFn: () => getCabins({ page: page + 1 }),
    });

  if (pageCount > 1)
    queryClient.prefetchQuery({
      queryKey: ["cabins", page - 1],
      queryFn: () => getCabins({ page: page - 1 }),
    });

  return { cabins, error, isLoading, count };
};

export default useCabins;
