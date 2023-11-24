import { useQueryClient } from '@tanstack/react-query';
import { api } from '~/trpc/react';

export const useUpdateFoodCache = () => {
    const queryClient = useQueryClient();
    const utils = api.useUtils();

    return () => {
        queryClient.invalidateQueries(['UserFood']);
        queryClient.invalidateQueries(['CurrentMacros']);
        utils.food.invalidate();
        utils.macros.invalidate();
    };
};
