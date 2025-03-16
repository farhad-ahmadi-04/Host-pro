import { deleteBookingApi } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { deleteBooking, isDeleting };
};
export default useDeleteBooking;
