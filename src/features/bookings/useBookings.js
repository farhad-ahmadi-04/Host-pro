import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/consitants";

export function useBookings() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient()


    // FILTER
    const filterValue = searchParams.get("status")
    const filter = !filterValue || filterValue === "all" ? null :
        { field: "status", value: filterValue }
    // { field: "status", value: filterValue, method: "gte" }

    // SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
    const [field, direction] = sortByRaw.split("-")
    const sortBy = { field, direction }

    // pagination
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));


    const {
        isError,
        data: { data: bookings, count } = {},
        isLoading,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // pre-fetching
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (pageCount > page)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        })

    if (pageCount > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        })



    return {
        isError,
        bookings,
        isLoading,
        count
    }
}