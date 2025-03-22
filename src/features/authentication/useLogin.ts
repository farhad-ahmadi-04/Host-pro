import { userLogin } from "@/services/apiAuth";
import { IUserLogin } from "@/types/authTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: ({ email, password }: IUserLogin) =>
      userLogin({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },

    onError: (error) => toast.error(error.message),
  });

  return { login, isLogin };
};

export default useLogin;
