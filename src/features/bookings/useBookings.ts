import { PAGE_SIZE } from "@/lib/utils";
import { getBookings } from "@/services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // page
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => getBookings({ page }),
  });

  // pre-fetching
  const pageCount = Math.ceil((count ?? 0) / PAGE_SIZE);

  if (pageCount > page)
    queryClient.prefetchQuery({
      queryKey: ["bookings", page + 1],
      queryFn: () => getBookings({ page: page + 1 }),
    });

  if (pageCount > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", page - 1],
      queryFn: () => getBookings({ page: page - 1 }),
    });

  return { bookings, isLoading, error, count };
};
