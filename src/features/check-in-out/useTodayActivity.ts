import { getStaysTodayActivity } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

const useTodayActivity = () => {
  const { data: activities, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoading };
};
export default useTodayActivity;
