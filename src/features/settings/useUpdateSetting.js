import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
    const queryClient = useQueryClient()

    const { mutate: updateSetting, isPending: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("setting successfully updated")

            queryClient.invalidateQueries({
                queryKey: ["setting"]
            })
        },
        onError: (err) => {
            console.log(err);
            toast.error(err.message)

        }
    })

    return { updateSetting, isUpdating }
}