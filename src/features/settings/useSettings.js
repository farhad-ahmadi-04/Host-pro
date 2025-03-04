import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
    const {
        isError,
        data: settings,
        isLoading,
    } = useQuery({
        queryKey: ["setting"],
        queryFn: getSettings,
    });

    return {
        isError,
        settings,
        isLoading,
    }
}