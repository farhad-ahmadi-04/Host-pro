import { UpdateBooking } from "@/services/apiBookings";
import { IBooking } from "@/types/bookingTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCheckOut = () => {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isPending: isCheckingOut } = useMutation<
    { data: IBooking[] },
    Error,
    number,
    unknown
  >({
    mutationFn: (bookingId: number) =>
      UpdateBooking(bookingId, {
        status: "checked-out",
        isPaid: true,
      }),

    onSuccess: ({ data }) => {
      toast.success(`booking ${data[0].id} successfully checked out`);

      queryClient.invalidateQueries({
        refetchType: "active",
      });
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkOut, isCheckingOut };
};
export default useCheckOut;
