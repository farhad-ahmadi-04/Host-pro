import { UpdateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useChecking = () => {
  const queryClient = useQueryClient();

  const { mutate: checkin, isPending: isChecking } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast: {
        hasBreakfast?: boolean;
        extrasPrice?: number;
        totalPrice?: number;
      };
    }) =>
      UpdateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      toast.success("Check-in successful");

      queryClient.invalidateQueries({
        refetchType: "active",
      });
    },
    onError: () => {
      toast.error("Failed to check-in");
    },
  });

  return { checkin, isChecking };
};
export default useChecking;
