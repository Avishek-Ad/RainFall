import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api.js';

function useLogin() {
    const queryClient = useQueryClient();

    const loginData = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { loginMutation:loginData.mutate, isPending:loginData.isPending, error:loginData.error }
}

export default useLogin
