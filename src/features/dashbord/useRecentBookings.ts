import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getBookingAfterDate } from "@/services/apiBookings";

const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDays = subDays(new Date(), numDays).toISOString();
  console.log(queryDays);

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingAfterDate(queryDays),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { bookings, isLoading };
};
export default useRecentBookings;
