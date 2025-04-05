import { signupApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useSignup = () => {
  const { mutate: signup, isPending: isSignup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isSignup };
};
export default useSignup;
