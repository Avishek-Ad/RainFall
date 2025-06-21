import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api.js";

function useSignup() {
  const queryClient = useQueryClient();
  const signupData = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return {
    signupMutation: signupData.mutate,
    isPending: signupData.isPending,
    error: signupData.error,
  };
}

export default useSignup;
