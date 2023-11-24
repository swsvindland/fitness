import { useQueryClient } from "@tanstack/react-query";

export const useUpdateFoodCache = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries(["UserFood"]);
    queryClient.invalidateQueries(["CurrentMacros"]);
  };
};
