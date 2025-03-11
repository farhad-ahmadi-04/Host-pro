import { deleteCabinApi } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => console.error(error),
  });

  return { deleteCabin, isDeleting };
};

export default useDeleteCabin;
