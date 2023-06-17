import { useQueryClient } from '@tanstack/react-query';

export const useUpdateFoodCache = () => {
    const queryClient = useQueryClient();

    return async () => {
        await queryClient.invalidateQueries(['UserFood']);
        await queryClient.invalidateQueries(['CurrentMacros']);
    };
};
