import React, { FC, useState } from 'react';
import { FoodSearch } from './FoodSearch';
import { useQuery } from '@tanstack/react-query';
import { getRecentUserFoods, searchFood } from '../../api';
import { useShowBackButton } from '../Navigation/headerHooks';
import { AddFoodCard } from './AddFoodCard';
import { LoadingListOfCards } from '../Loading/LoadingListOfCards';

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

    return (
        <div className="container grid grid-cols-1">
            <div className="card p-4">
                <FoodSearch
                    query={query}
                    setQuery={setQuery}
                    setSelected={setSelected}
                    selected={selected}
                />
            </div>
            <div className="w-full">
                <LoadingListOfCards isLoading={searchFoodQuery.isLoading} />
                {!searchFoodQuery.data?.data && selected ? (
                    <div className="flex items-center justify-between text-center">
                        <span className="text-ternary">No Results</span>
                    </div>
                ) : (
                    searchFoodQuery.data?.data.map((food, foodIdx) => (
                        <AddFoodCard
                            key={food.foodId}
                            foodId={food.foodId}
                            name={food.foodName}
                            brandName={food.brandName ?? 'generic'}
                            servingSize={food.foodDescription}
                        />
                    ))
                )}
            </div>
            <LoadingListOfCards isLoading={recentlyEaten.isLoading} />
            <div className="w-full">
                {!recentlyEaten.data?.data ? null : (
                    <h2 className="mt-2 text-lg text-secondary">
                        Recently Eaten
                    </h2>
                )}
                {!recentlyEaten.data?.data ? (
                    <div className="flex items-center justify-between text-center" />
                ) : (
                    recentlyEaten.data?.data.map((food, index) => (
                        <AddFoodCard
                            key={food.id}
                            userFoodId={food.id}
                            foodId={food.foodV2Id}
                            name={food.foodV2?.name ?? ''}
                            brandName={food.foodV2?.brand ?? 'generic'}
                            servingSize={food.serving?.servingDescription ?? ''}
                            defaultServings={food.servingAmount}
                        />
                    ))
                )}
            </div>
        </div>
    );
};