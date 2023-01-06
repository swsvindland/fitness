import { FC, useState } from 'react';
import { FoodSearch } from './FoodSearch';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    getFood,
    getRecentUserFoods,
    quickAddFood,
    searchFood,
} from '../../api';
import { Loading } from '../Loading';
import { useShowBackButton } from '../Navigation/headerHooks';
import { AddFoodCard } from './AddFoodCard';

export const AddFood: FC = () => {
    useShowBackButton();
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<string | undefined>(undefined);

    const searchFoodQuery = useQuery(['SearchFood', selected], () => {
        if (!selected) return;
        return searchFood(selected, 0);
    });

    const recentlyEaten = useQuery(['RecentUserFoods'], () => {
        return getRecentUserFoods();
    });

    if (searchFoodQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="max-w-2xl w-full grid grid-cols-1">
            <div className="card p-4">
                <FoodSearch
                    query={query}
                    setQuery={setQuery}
                    setSelected={setSelected}
                    selected={selected}
                />
            </div>
            <div className="max-w-2xl w-full">
                {!searchFoodQuery.data?.data && selected ? (
                    <div className="flex justify-between items-center text-center">
                        <span className="text-ternary">No Results</span>
                    </div>
                ) : (
                    searchFoodQuery.data?.data.map((food, foodIdx) => (
                        <AddFoodCard
                            key={food.foodId}
                            foodId={food.foodId}
                            name={food.foodName}
                            servingSize={food.foodDescription}
                        />
                    ))
                )}
            </div>
            <div className="max-w-2xl w-full">
                {!recentlyEaten.data?.data ? null : (
                    <h2 className="mt-2 text-lg text-secondary">
                        Recently Eaten
                    </h2>
                )}
                {!recentlyEaten.data?.data ? (
                    <div className="flex justify-between items-center text-center" />
                ) : (
                    recentlyEaten.data?.data.map((food) => (
                        <AddFoodCard
                            key={food.foodV2Id}
                            foodId={food.foodV2Id}
                            name={food.foodV2?.name ?? ''}
                            servingSize={food.serving?.servingDescription ?? ''}
                            defaultServings={food.servingAmount}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
