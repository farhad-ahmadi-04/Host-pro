import { getSettings } from "@/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

const useSettings = () => {
  const {
    data: settings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    settings,
    isLoading,
    isError,
  };
};
export default useSettings;
