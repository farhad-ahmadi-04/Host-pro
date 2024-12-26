import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
    const { bookingId } = useParams()

    const {
        isError,
        data: booking,
        isLoading,
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(bookingId),
    });

    return {
        isError,
        booking,
        isLoading,
        bookingId
    }
}