import { getBooking } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useBooking = () => {
  const { bookingId } = useParams();

  const {
    data: booking,
    isPending: loadingBooking,
    error: errorBooking,
  } = useQuery({
    queryFn: () => getBooking(Number(bookingId)),
    queryKey: ["bookings", bookingId],
  });

  return { booking, loadingBooking, errorBooking };
};
export default useBooking;
