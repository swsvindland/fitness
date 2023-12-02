import { useQueryClient } from '@tanstack/react-query';
import { api } from '~/trpc/react';

export const useUpdateFoodCache = () => {
    const queryClient = useQueryClient();
    const utils = api.useUtils();

    return async () => {
        await queryClient.invalidateQueries(['UserFood']);
        await queryClient.invalidateQueries(['CurrentMacros']);
        await utils.food.invalidate();
        await utils.macros.invalidate();
    };
};
