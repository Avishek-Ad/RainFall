import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { logout } from "../lib/api";

function useLogout() {
  const queryClient = useQueryClient();
  const logoutData = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { logoutMutation: logoutData.mutate };
}

export default useLogout;
