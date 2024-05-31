import { api } from '~/trpc/server';
import { FC } from 'react';
import { FoodGrid } from '~/app/_components/Food/FoodGrid';

export const Meals: FC = async () => {
    const settings = await api.settings.getUserSettings.query();
    const meals = Array.from(Array(settings?.MealQuantity ?? 3).keys());

    return (
        <div>
            {meals.map((meal) => (
                <FoodGrid meal={meal + 1} />
            ))}
        </div>
    );
};
