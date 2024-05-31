import { api } from '~/trpc/react';

export const useUpdateFoodCache = () => {
    const utils = api.useUtils();

    return async () => {
        await utils.food.invalidate();
        await utils.macros.invalidate();
    };
};
