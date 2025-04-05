import { updateSettingsApi } from "@/services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isSettings } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { updateSettings, isSettings };
};
export default useUpdateSettings;
